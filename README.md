# DeepScan AI 🚀

DeepScan AI is an automated pipeline and visualization suite designed for clustering, functional prediction, and biological novelty detection of DNA sequences. Powered by unsupervised machine learning natively, it processes raw biological DNA data into k-mer vectors, classifies their structural attributes, and plots dimensionality-reduced biological topologies cleanly.

## 📂 Project Structure (Full-Stack Monorepo)

```text
Deepscan-AI/
├── README.md                  # Comprehensive Documentation
├── requirements.txt           # Python dependency locks
├── app.py                     # Legacy Streamlit unified dashboard (Standalone UI)
├── frontend/                  # React + Vite + Tailwind Frontend GUI
└── backend/                   # Python FastAPI & Extracted ML Logic
    ├── api.py                 # Headless FastAPI asynchronous execution controller
    ├── data/
    │   └── synthetic.fasta    # Raw sequence data streams mapped by the test
    ├── models/                # Joblib cached trained Random Forest kingdom classifiers
    ├── outputs/               # Generated deliverables, logs, topologies & CSVs
    └── processing/            # Core AI Neural Engines & Scripts
        ├── pipeline.py        # Central runtime looping sequence workflows
        ├── preprocess.py      # Standardized ingestion mapping L2 vectorization components via HashMaps
        ├── clustering.py      # Core KMeans logic assigning spatial Euclidean distances
        ├── scoring.py         # Assigns specific scalar variables mathematically identifying statistical anomalies
        ├── function.py        # Structural sequence archetypes natively defined based on frequency weights
        └── visualize.py       # Plotting engine for PCA, t-SNE, UMAP mappings
```

## ⚙️ Core Modules & Logic

The internal backend logic relies primarily on the `pipeline.py` script orchestration routing logic inside the `processing` directory.

- **K-mer Vectorization**: Rapidly computes K-mer configurations across global definitions, executing lookup matches exclusively utilizing optimized `O(1)` dictionary hashes mapping back perfectly normalized outputs strictly formatting features out globally down into 256 structural dimensions!
- **Unsupervised KMeans**: Determines distance layouts identifying spatial coordinates across boundaries effectively discovering 3 mathematically tight sequence populations grouping biological sequences without raw annotations natively.
- **Classification Modeling**: Natively detects data clusters and parses specific DNA arrays feeding predictive matrices mapping directly via explicitly trained Random Forest algorithms determining organism Kingdoms intelligently!
- **Spatial Reductions**: Integrates heavy data arrays seamlessly using `UMAP` topology tracking sequences locally projecting multidimensional bounds flatly back for human readability!

## 🚀 Getting Started

Ensure the latest Python configuration dependencies are fully loaded by explicitly running:
```bash
pip install -r requirements.txt
```

### 1. Launch the API Backend

Navigate to your isolated backend layer and launch the headless Uvicorn process asynchronously feeding the pipeline execution payloads globally through port `8000`:
```bash
cd backend
../venv/bin/python -m uvicorn api:app --reload
```

### 2. Boot your Lovable Web Frontend

Separately execute your fully-installed React instance interacting directly connecting the UI seamlessly:
```bash
cd frontend
npm run dev
```

### 3. Alternative: Streamlit Native Dashboard

If tracking backend operations outside external environments natively without NPM, simply boot your existing legacy pipeline interface right at the root repository mapping!
```bash
streamlit run app.py
```