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
        """
        Initializes the LeadsRepository with a database session.

        :param db_session: Database session dependency.
        """

        self.__db_session = db_session

    def create_lead(self, lead_params: LeadCreateRequest) -> LeadSchema:
        """
        Creates a new lead entry in the database.

        :param lead_params: Data required to create a new lead.
        :return: The created lead in schema format.
        """

        new_lead = Leads(**lead_params.model_dump())
        self.__db_session.add(new_lead)
        self.__db_session.commit()
        return LeadSchema.model_validate(new_lead)

    def get_lead_by_email(self, email: str) -> LeadSchema | None:
        """
        Retrieves a lead by email.

        :param email: Email address of the lead.
        :return: The lead in schema format if found, otherwise None.
        """

        lead = self.__db_session.query(Leads).filter(Leads.email == email).first()
        if not lead:
            return None
        return LeadSchema.model_validate(lead)

    def get_lead_by_id(self, lead_id: UUID) -> LeadSchema | None:
        """
        Retrieves a lead by its unique identifier.

        :param lead_id: UUID of the lead.
        :return: The lead in schema format if found, otherwise None.
        """

        lead = self.__db_session.query(Leads).filter(Leads.id == lead_id).first()
        if not lead:
            return None
        return LeadSchema.model_validate(lead)

    def delete_lead_by_id(self, lead_id: UUID) -> int:
        """
        Deletes a lead by its unique identifier.

        :param lead_id: UUID of the lead to delete.
        :return: Number of deleted rows (1 if deleted, 0 if not found).
        """

        result = self.__db_session.query(Leads).filter(Leads.id == lead_id).delete()
        self.__db_session.commit()
        return result

    def get_leads(self, params: GetLeadsRequest) -> tuple[list[LeadSchema], int]:
        """
        Retrieves a filtered and paginated list of leads along with the total count.

        :param params: Parameters for filtering, sorting, and pagination.
        :return: A tuple containing a list of leads and the total count.
        """

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
        leads_count = db_query.count()
        return [LeadSchema.model_validate(lead) for lead in leads], leads_count

    def update_lead(
        self, lead_id: UUID, update_params: UpdateLeadRequest
    ) -> LeadSchema | None:
        """
        Updates an existing lead with new details.

        :param lead_id: UUID of the lead to update.
        :param update_params: Data containing updates for the lead.
        :return: The updated lead in schema format, or None if not found.
        """

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

    def get_all_leads(self) -> list[LeadSchema]:
        """
        Retrieves all leads from the database.

        :return: A list of all leads in schema format.
        """

        return [
            LeadSchema.model_validate(lead)
            for lead in self.__db_session.query(Leads).all()
        ]
