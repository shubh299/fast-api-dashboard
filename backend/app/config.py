import os

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "development":
    from dotenv import load_dotenv

    load_dotenv(".env")


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///:memory:")


settings = Settings()
