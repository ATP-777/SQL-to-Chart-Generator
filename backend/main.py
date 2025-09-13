from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Backend running"}

@app.post("/generate-chart")
async def generate_chart(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    columns = list(df.columns)
    sample_data = df.head(10).to_dict(orient="records")
    return {"columns": columns, "data": sample_data}
