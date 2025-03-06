from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from enum import Enum
from models import Leads


class LeadCreateRequest(BaseModel):
    name: str
    email: EmailStr
    company: str
    engagementStage: int = Field(default=0)


class LeadsSchema(BaseModel):
    name: str
    email: EmailStr
    company: str
    id: UUID
    engagementStage: int

    class Config:
        from_attributes = True


class SortOrder(Enum):
    ASC = "ASC"
    DESC = "DESC"


class GetLeadsRequest(BaseModel):
    searchQuery: str | None = None
    start: int = 0  # start for pagination
    limit: int = 10  # page size
    isEngaged: bool | None = None
    sortBy: str | None = None
    sortOrder: SortOrder = SortOrder.ASC

    @property
    def sort_column(self):
        if self.sortBy:
            return getattr(Leads, self.sortBy)
        return None
