from sqlalchemy.dialects.postgresql import UUID
from database import BaseModel, SCHEMA
from sqlalchemy import Column, Integer, String, Date, DateTime, func
import uuid


class Leads(BaseModel):
    __tablename__ = "leads"
    __table_args__ = {"schema": SCHEMA}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
    name = Column(String)
    email = Column(String, unique=True, index=True)
    company = Column(String)
    engagementStage = Column(Integer, default=0)
    lastContacted = Column(Date, nullable=True)
