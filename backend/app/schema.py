from uuid import UUID
from pydantic import BaseModel, EmailStr
from enum import Enum
from app.models import Leads
from datetime import date


class LeadCreateRequest(BaseModel):
    name: str
    email: EmailStr
    company: str
    engaged: bool = False
    stage: int = 0


class LeadSchema(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    company: str
    engaged: int
    stage: int
    lastContacted: date | None

    class Config:
        from_attributes = True


class SortOrder(Enum):
    ASC = "ASC"
    DESC = "DESC"


class GetLeadsRequest(BaseModel):
    searchQuery: str | None = None
    start: int = 0  # start for pagination
    limit: int = 10  # page size
    engaged: bool | None = None
    sortBy: str | None = None
    sortOrder: SortOrder = SortOrder.ASC

    @property
    def sort_column(self):
        if self.sortBy:
            return getattr(Leads, self.sortBy)
        return None


class GetLeadsResponse(BaseModel):
    data: list[LeadSchema]
    start: int
    end: int
    totalCount: int


class UpdateLeadRequest(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    company: str | None = None
    stage: int | None = None
    lastContacted: date | None = None
    engaged: bool | None = None
