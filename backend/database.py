from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SCHEMA = "backend"

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Base class for models
BaseModel = declarative_base()

def create_tables():
    BaseModel.metadata.create_all(bind=engine)
