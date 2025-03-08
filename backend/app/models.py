from app.database import BaseDBModel
from sqlalchemy import UUID, Column, Boolean, Integer, String, Date, DateTime, func
import uuid


class Leads(BaseDBModel):
    """
    Represents the 'leads' table in the database.

    Attributes:
        id (UUID): Primary key, unique identifier for each lead.
        createdAt (DateTime): Timestamp when the lead was created.
        updatedAt (DateTime): Timestamp when the lead was last updated.
        name (String): Name of the lead.
        email (String): Unique email address of the lead.
        company (String): Company name associated with the lead.
        engaged (Boolean): Indicates if the lead is engaged.
        stage (Integer): Represents the current stage in the lead pipeline.
        lastContacted (Date): The date when the lead was last contacted.
    """

    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    createdAt = Column("createdat", DateTime, default=func.now())
    updatedAt = Column("updatedat", DateTime, default=func.now(), onupdate=func.now())
    name = Column(String)
    email = Column(String, unique=True, index=True)
    company = Column(String)
    engaged = Column(Boolean)
    stage = Column(Integer, default=0)
    lastContacted = Column("lastcontacted", Date, nullable=True)
