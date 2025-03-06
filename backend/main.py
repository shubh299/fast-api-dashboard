from fastapi import FastAPI, Depends
from database import get_db_session, create_tables
from models import Leads
from schema import LeadCreateRequest, LeadCreateResponse
from fastapi.responses import JSONResponse

app = FastAPI()

create_tables()

@app.get("/leads")
def get_leads(start: int=0, limit: int=10, db_session=Depends(get_db_session)):
    # TODO: Add validation, filtering and use pagination
    return db_session.query(Leads).all()

@app.post("/lead", response_model=LeadCreateResponse)
def add_lead(lead: LeadCreateRequest, db_session=Depends(get_db_session)):
    # checking if lead with email already exists
    email_exists = db_session.query(Leads).filter(Leads.email==lead.email).first()
    if email_exists:
        return JSONResponse(status_code=400, content={"error": "A lead with email already exists"})
    new_lead = Leads(**lead.model_dump())
    db_session.add(new_lead)
    db_session.commit()
    return new_lead
