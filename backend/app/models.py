from app.database import BaseDBModel
from sqlalchemy import UUID, Column, Boolean, Integer, String, Date, DateTime, func
import uuid


class Leads(BaseDBModel):
    __tablename__ = "leads"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
    name = Column(String)
    email = Column(String, unique=True, index=True)
    company = Column(String)
    engaged = Column(Boolean)
    stage = Column(Integer, default=0)
    lastContacted = Column(Date, nullable=True)
