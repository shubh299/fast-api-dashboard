from app.database import BaseDBModel, SCHEMA
from sqlalchemy import Column, Boolean, Integer, String, Date, DateTime, func


class Leads(BaseDBModel):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
    name = Column(String)
    email = Column(String, unique=True, index=True)
    company = Column(String)
    engaged = Column(Boolean)
    stage = Column(Integer, default=0)
    lastContacted = Column(Date, nullable=True)
