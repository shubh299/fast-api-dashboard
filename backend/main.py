from fastapi import FastAPI, Depends
from database import get_db_session, create_tables
from models import Leads
from schema import LeadCreateRequest, LeadsSchema, GetLeadsRequest, SortOrder
from fastapi.responses import JSONResponse
from sqlalchemy import asc, desc

app = FastAPI()

create_tables()


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
    email_exists = db_session.query(Leads).filter(Leads.email == lead.email).first()
    if email_exists:
        return JSONResponse(
            status_code=400, content={"error": "A lead with email already exists"}
        )
    new_lead = Leads(**lead.model_dump())
    db_session.add(new_lead)
    db_session.commit()
    return new_lead
