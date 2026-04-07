from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import sys
import numpy as np

target_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "processing")
if os.getcwd() != target_dir:
    os.chdir(target_dir)
sys.path.append(target_dir)

from pipeline import run_pipeline

app = FastAPI(title="DeepScan AI Framework")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze_sequence(file: UploadFile = File(...)):
    temp_path = "temp_api.fasta"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    result = run_pipeline(temp_path)
    
    # Sanitize dictionary formats for JSON string mapping gracefully natively
    clean_result = {}
    for key, value in result.items():
        if isinstance(value, np.ndarray):
            clean_result[key] = value.tolist()
        elif isinstance(value, list) and len(value) > 0 and type(value[0]).__module__ == np.__name__:
            clean_result[key] = [v.item() if hasattr(v, "item") else v for v in value]
        else:
            clean_result[key] = value
            
    if "labels" in clean_result:
        clean_result["labels"] = [int(v) for v in clean_result["labels"]]
        
    return {"status": "success", "data": clean_result}
