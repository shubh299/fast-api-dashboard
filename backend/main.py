from fastapi import FastAPI

app = FastAPI()

@app.get("/leads")
def get_leads(start: int=0, limit: int=10):
    return {}