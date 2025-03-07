from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from app.leads_repository import LeadsRepository
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schema import (
    LeadCreateRequest,
    LeadSchema,
    GetLeadsResponse,
    GetLeadsRequest,
    UpdateLeadRequest,
)
from app.config import settings
import io
import csv
from uuid import UUID

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],  # Allow frontend, configured from URL
    allow_credentials=True,  # Allow cookies
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/health")
def health_check():
    return JSONResponse(status_code=200, content={"status": "ok"})


@app.get("/leads", response_model=GetLeadsResponse)
def get_leads_paginated(
    params: GetLeadsRequest = Depends(),
    leads_repository: LeadsRepository = Depends(LeadsRepository),
):
    leads, count = leads_repository.get_leads(params)
    response = GetLeadsResponse(
        data=leads, totalCount=count, start=params.start, end=params.start + len(leads)
    )
    return response


@app.post("/lead", response_model=LeadSchema)
def add_lead(
    lead: LeadCreateRequest,
    leads_repository: LeadsRepository = Depends(LeadsRepository),
):
    # checking if lead with email already exists, then return 404
    email_exists = leads_repository.get_lead_by_email(lead.email)
    if email_exists:
        raise HTTPException(status_code=400, detail="email already exists")
    new_lead = leads_repository.create_lead(lead)
    return new_lead


@app.patch("/update_lead/{lead_id}")
def update_lead(
    lead_id: UUID,
    update_params: UpdateLeadRequest,
    leads_repository: LeadsRepository = Depends(LeadsRepository),
):
    lead = leads_repository.get_lead_by_id(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="lead not found")

    if update_params.email:
        lead = leads_repository.get_lead_by_email(update_params.email)
        if lead and lead.id != lead_id:
            return HTTPException(status_code=400, detail={"email already exists"})

    return leads_repository.update_lead(lead_id, update_params)


@app.delete("/delete_lead/{lead_id}")
def delete_lead(
    lead_id: UUID, leads_repository: LeadsRepository = Depends(LeadsRepository)
):
    delete_result = leads_repository.delete_lead_by_id(lead_id)
    if delete_result:
        return JSONResponse(content="lead deleted successfully", status_code=200)
    else:
        return HTTPException(status_code=404, detail={"lead not found"})


@app.get("/export_leads/")
def export_leads(leads_repository: LeadsRepository = Depends(LeadsRepository)):
    leads = leads_repository.get_all_leads()

    output = io.StringIO()
    writer = csv.DictWriter(
        output,
        fieldnames=["name", "email", "company", "engaged", "stage", "lastContacted"],
    )

    writer.writeheader()
    writer.writerows([lead.model_dump(exclude={"id"}) for lead in leads])

    output.seek(0)
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=leads.csv"},
    )
