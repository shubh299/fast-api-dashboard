from pydantic import BaseModel, EmailStr, Field
from uuid import UUID

class LeadCreateRequest(BaseModel):
    name: str 
    email: EmailStr
    company: str
    engagementStage: int = Field(default=0)

class LeadCreateResponse(BaseModel):
    name: str
    email: EmailStr
    company: str
    id: UUID
    engagementStage: int

    class Config:
        from_attributes = True