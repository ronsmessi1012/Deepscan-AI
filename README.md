# DeepScan AI 🚀

DeepScan AI is an automated pipeline and visualization suite designed for clustering, functional prediction, and biological novelty detection of DNA sequences. Powered by unsupervised machine learning, it processes raw biological DNA data into k-mer vectors, classifies their structural attributes, and plots dimensionality-reduced topological maps cleanly.

## 📂 Project Structure

```text
Deepscan-AI/
├── app.py                     # Streamlit frontend dashboard
├── requirements.txt           # Python dependency locks
├── data/
│   └── synthetic.fasta        # Raw DNA sequence data stream
├── outputs/                   # Generated pipeline deliverables
│   ├── pipeline_results.csv   # Comprehensive scoring metrics CSV
│   ├── clusters_pca.png       # Linear Principal Component Analysis render
│   ├── clusters_tsne.png      # t-SNE distribution render
│   ├── clusters_umap.png      # High-fidelity UMAP topological map
│   └── novelty.png            # Frequency histogram mapping sequence outliers
└── processing/                # Core AI Pipeline Engine
    ├── pipeline.py            # Master runtime loop orchestrating execution sequences
    ├── preprocess.py          # Data ingestion and L2 vectorization components
    ├── clustering.py          # Core unsupervised AI algorithm loops (KMeans)
    ├── scoring.py             # Distance, standard deviation, and confidence metrics
    ├── function.py            # Functional sequence archetype mapping
    ├── feature_extract.py     # Sandbox feature/vector extraction testing limits
    ├── output.py              # I/O handler managing terminal and CSV prints
    └── visualize.py           # Matplotlib plotting configuration algorithms
```

## ⚙️ Detailed Execution Sequence

The `pipeline.py` script serves as the primary orchestration router for the processing architecture. Whether deploying through `python3.10 pipeline.py` inside the terminal alongside absolute directory bounds or operating via the `app.py` UI frame asynchronously, the code steps structurally through these fundamental data cycles:

1. **Phase 1: Ingestion & Filtering (`preprocess.py`):**
   - Discards short, fragmentary sequences (length variables < 30).
   - Converts raw textual strings (`A T C G` formats) into sanitized configurations properly nested.

2. **Phase 2: K-mer Vectorization (`preprocess.py`):**
   - Slices sequences intelligently into successive rolling structural blocks governed dynamically (default k=4).
   - Counts overlaps across vocabulary lists operating via heavily optimized **O(1) hash tables (Dictionaries)** protecting process throughput constraints.
   - The final vector distributions are strictly normalized globally (L2 Matrix Standardization) wrapping vectors uniformly into 256 unique dimensions.

3. **Phase 3: Unsupervised Classification (`clustering.py`):**
   - Bootstraps statistical algorithm pipelines testing silhouette metrics evaluating structural clusters dynamically (Testing shapes between k=2 and k=4).
   - Identifies the highest-performing geographical topology separating groups properly.
   - Generates and locks final Euclidean `Cluster ID` classification centroids mathematically grouping sequences via unsupervised predictions.

4. **Phase 4: Calculations & Scoring (`scoring.py`):** 
   - Establishes detailed arithmetic distances verifying exact sequences relative absolute mathematical displacement against known active cluster center coordinates.
   - Computes standard relative deviation to generate mathematically isolated **Novelty Scores** locking elements between `0.0` to `1.0`. Distributions landing statically beyond standard averages trigger categorization as securely `Potentially novel`.
   - Populates internal inverse **Confidence Scores** mapping density rigidities algorithmically tracking sequences holding steady boundaries.

5. **Phase 5: Functional Prediction (`function.py`):**
   - Evaluates sub-compositional weights matching globally unique genetic indicators natively to label DNA definitions into understandable archetypes (Scanning sequences specifically resolving signatures mapping strictly to tags like `Bioactive-like`, `Enzyme-like`, and `AT-rich structural` limits).

6. **Phase 6: I/O Serialization (`output.py`):**
   - Ingests algorithmically calculated predictions and constructs a human-readable CSV.
   - Serializes data payload arrays synchronously dispatch reporting outputs down securely into `./outputs/pipeline_results.csv`.
   - Iterates natively across global distribution parameters tracking arrays to output precise categorization counts directly into the terminal stream natively highlighting unique metrics.

7. **Phase 7: Spatial Rendering (`visualize.py`):**
   - Passes array distributions natively through deep mathematical structural flatteners deploying non-linear topographical mapping integrations (UMAP, t-SNE) paired linearly alongside simpler projections (PCA) formatting 256 dimensions straight downwards onto flat 2D diagnostic visual arrays!
   - Compiles bar frequency grids tracing histogram parameters defining visual representation metrics highlighting exactly the density of sequence novelties structurally. 

## 🚀 Getting Started

### 1. Installation Environment
Install all essential core mathematical frameworks configuring UMAP maps correctly alongside base execution requirements natively:
```bash
pip install -r requirements.txt
```

### 2. Command Line Analytics Mode
To initialize testing analysis bounds automatically launching full cluster generation and visualization windows globally run:
```bash
cd processing
python3.10 pipeline.py
```

### 3. Application Execution Mode 
Alternatively, to boot exactly matching features onto an interactive web environment processing dynamic raw `.fasta` stream uploads locally:
```bash
streamlit run app.py
```