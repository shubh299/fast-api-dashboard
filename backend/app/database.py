from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import MetaData
from app.config import settings

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
BaseDBModel = declarative_base(metadata=MetaData(schema=SCHEMA))


def create_tables():
    """
    Create all tables on app startup. Can be added in a migration script.
    """
    BaseDBModel.metadata.create_all(bind=engine)
