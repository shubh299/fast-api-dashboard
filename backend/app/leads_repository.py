from fastapi import Depends
from sqlalchemy import asc, desc, and_, or_
from app.database import get_db_session
from app.schema import (
    LeadCreateRequest,
    LeadSchema,
    GetLeadsRequest,
    SortOrder,
    UpdateLeadRequest,
)
from app.models import Leads
from uuid import UUID


class LeadsRepository:
    """
    A repository to act as interface between APIs and database.
    This abstracts out the database specific code.
    """

    def __init__(self, db_session=Depends(get_db_session)):
        self.__db_session = db_session

    def create_lead(self, lead_params: LeadCreateRequest) -> LeadSchema:
        new_lead = Leads(**lead_params.model_dump())
        self.__db_session.add(new_lead)
        self.__db_session.commit()
        return LeadSchema.model_validate(new_lead)

    def get_lead_by_email(self, email: str) -> LeadSchema | None:
        lead = self.__db_session.query(Leads).filter(Leads.email == email).first()
        if not lead:
            return None
        return LeadSchema.model_validate(lead)

    def get_lead_by_id(self, lead_id: UUID) -> LeadSchema | None:
        lead = self.__db_session.query(Leads).filter(Leads.id == lead_id).first()
        if not lead:
            return None
        return LeadSchema.model_validate(lead)

    def delete_lead_by_id(self, lead_id: UUID) -> int:
        result = self.__db_session.query(Leads).filter(Leads.id == lead_id).delete()
        self.__db_session.commit()
        return result

    def get_leads(self, params: GetLeadsRequest) -> list[LeadSchema]:
        db_query = self.__db_session.query(Leads)
        if params.searchQuery:
            db_query = db_query.filter(
                or_(
                    Leads.name.ilike(f"%{params.searchQuery}%"),
                    Leads.email.ilike(f"%{params.searchQuery}%"),
                    Leads.email.ilike(f"%{params.searchQuery}%"),
                )
            )
        if params.engaged is not None:
            db_query = db_query.filter(Leads.engaged == params.engaged)

        if params.sort_column:
            db_query = db_query.order_by(
                asc(params.sort_column)
                if params.sortOrder == SortOrder.ASC
                else desc(params.sort_column)
            )
        else:
            db_query = db_query.order_by(
                asc("id") if params.sortOrder == SortOrder.ASC else desc("id")
            )

        leads = db_query.offset(params.start).limit(params.limit).all()
        return [LeadSchema.model_validate(lead) for lead in leads]

    def update_lead(
        self, lead_id: UUID, update_params: UpdateLeadRequest
    ) -> LeadSchema | None:
        lead = self.get_lead_by_id(lead_id)
        if not lead:
            return None

        if update_params.email:
            # if email is being updated, check if email is already used elsewhere
            email_exists = (
                self.__db_session.query(Leads)
                .filter(and_(Leads.email == update_params.email, Leads.id != lead_id))
                .first()
            )
            if email_exists:
                raise Exception("email already exists")

        update_data = update_params.model_dump(exclude_unset=True)
        self.__db_session.query(Leads).filter(Leads.id == lead_id).update(update_data)
        self.__db_session.commit()
        return self.get_lead_by_id(lead_id)
