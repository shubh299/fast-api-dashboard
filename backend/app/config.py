import os

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "development":
    # Loading from .env only for development
    # For all other environments, the values will be set in environment variables
    from dotenv import load_dotenv

    load_dotenv(".env")


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "")


settings = Settings()
