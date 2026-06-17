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
            
    if "X" in clean_result and len(clean_result["X"]) > 0:
        from sklearn.decomposition import PCA
        n_samples = len(clean_result["X"])
        n_components = min(2, n_samples)
        pca = PCA(n_components=n_components)
        embeddings_2d = pca.fit_transform(clean_result["X"]).tolist()
        
        # Ensure 2D for each point
        for row in embeddings_2d:
            while len(row) < 2:
                row.append(0.0)
                
        clean_result["embeddings_2d"] = embeddings_2d
        del clean_result["X"]
            
    if "labels" in clean_result:
        clean_result["labels"] = [int(v) for v in clean_result["labels"]]
        
    return {"status": "success", "data": clean_result}
