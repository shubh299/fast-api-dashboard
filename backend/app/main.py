from fastapi import FastAPI, Depends
from app.database import get_db_session, create_tables
from app.models import Leads
from fastapi import HTTPException
from app.schema import (
    LeadCreateRequest,
    LeadsSchema,
    GetLeadsRequest,
    SortOrder,
    UpdateLeadRequest,
)
from sqlalchemy import asc, desc
from uuid import UUID

app = FastAPI()


@app.get("/leads", response_model=list[LeadsSchema])
def get_leads(
    params: GetLeadsRequest = Depends(),
    db_session=Depends(get_db_session),
):
    db_query = db_session.query(Leads)

    if params.searchQuery:
        db_query.filter(
            [
                Leads.name.ilike(f"%{params.searchQuery}%"),
                Leads.email.ilike(f"%{params.searchQuery}%"),
                Leads.email.ilike(f"%{params.searchQuery}%"),
            ]
        )
    if params.isEngaged is not None:
        if params.isEngaged:
            db_query.filter(Leads.engagementStage >= 0)
        else:
            db_query.filter(Leads.engagementStage == 0)

    if params.sort_column:
        db_query.order_by(
            asc(params.sort_column)
            if params.sortOrder == SortOrder.ASC
            else desc(params.sort_column)
        )
    else:
        db_query.order_by(
            asc("id") if params.sortOrder == SortOrder.ASC else desc("id")
        )

    return db_query.offset(params.start).limit(params.limit).all()


@app.post("/lead", response_model=LeadsSchema)
def add_lead(lead: LeadCreateRequest, db_session=Depends(get_db_session)):
    # checking if lead with email already exists
    print(db_session)
    email_exists = db_session.query(Leads).filter(Leads.email == lead.email).first()
    if email_exists:
        raise HTTPException(status_code=400, detail="email already exists")
    new_lead = Leads(**lead.model_dump())
    db_session.add(new_lead)
    db_session.commit()
    return new_lead


@app.patch("/update_lead/{lead_id}", response_model=LeadsSchema)
def update_lead(
    lead_id: UUID, update_params: UpdateLeadRequest, db_session=Depends(get_db_session)
):
    lead = db_session.query(Leads).filter(Leads.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="lead not found")

    if update_params.email:
        email_exists = db_session.query(Leads).filter(Leads.email == lead.email).first()
        if email_exists:
            raise HTTPException(status_code=400, detail="email already exists")

    update_data = update_params.model_dump(exclude_unset=True)
    db_session.query(Leads).filter(Leads.id == lead_id).update(update_data)
    db_session.commit()

    return db_session.query(Leads).filter(Leads.id == lead_id).first()
