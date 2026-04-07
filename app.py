import os
import sys
import pandas as pd

target_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend", "processing")
if os.getcwd() != target_dir:
    os.chdir(target_dir)
sys.path.append(target_dir)

import streamlit as st
from pipeline import run_pipeline

st.set_page_config(page_title="DeepScan AI Dashboard", page_icon="🧬", layout="wide")

# Lovable-tier Glassmorphism & Aesthetics via Custom CSS
st.markdown("""
    <style>
    body {
        background-color: #0d1117;
    }
    .stApp {
        background: radial-gradient(circle at top right, #1a2035, #0d1117 70%);
        color: #c9d1d9;
    }
    h1 {
        background: -webkit-linear-gradient(45deg, #FF6B6B, #4ECDC4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        text-align: center;
        padding-bottom: 0.5rem;
    }
    .metric-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    .metric-card:hover {
        transform: translateY(-5px);
        border-color: rgba(78, 205, 196, 0.5);
    }
    .metric-title { font-size: 0.9rem; color: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .metric-value { font-size: 3rem; font-weight: 700; background: -webkit-linear-gradient(45deg, #58a6ff, #bc8cff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
""", unsafe_allow_html=True)

st.markdown("<h1>🧬 DeepScan AI Global Pipeline</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #8b949e; font-size: 1.2rem; margin-bottom: 3rem;'>Unsupervised Biological Novelty Clustering & Classification Dashboard</p>", unsafe_allow_html=True)

col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    uploaded_file = st.file_uploader("Drop biological FASTA sequence stream here", type=["fasta", "txt"])

if uploaded_file:
    st.write("---")
    with st.spinner("Extracting k-mers, isolating models, and mapping topologies..."):
        # Save temp file
        with open("temp.fasta", "wb") as f:
            f.write(uploaded_file.read())

        # Execute ML core
        result = run_pipeline("temp.fasta")
        
        # Isolate metrics
        num_seqs = len(result["sequences"])
        high_novel = sum(1 for n in result["novelty"] if n >= 0.98)
        domains_detected = len(set(result.get("kingdoms", [])))
        
        # Lovable Metric Cards
        m1, m2, m3 = st.columns(3)
        with m1:
            st.markdown(f"<div class='metric-card'><div class='metric-title'>Sequence Matrix</div><div class='metric-value'>{num_seqs}</div></div>", unsafe_allow_html=True)
        with m2:
            st.markdown(f"<div class='metric-card'><div class='metric-title'>Extreme Outliers</div><div class='metric-value'>{high_novel}</div></div>", unsafe_allow_html=True)
        with m3:
            st.markdown(f"<div class='metric-card'><div class='metric-title'>Kingdom Alignments</div><div class='metric-value'>{domains_detected}</div></div>", unsafe_allow_html=True)
            
        st.markdown("<br><br>", unsafe_allow_html=True)
        
        c1, c2 = st.columns(2)
        with c1:
            st.subheader("🧬 Functional Demographics")
            df_functions = pd.Series(result["functions"]).value_counts().reset_index()
            df_functions.columns = ["Function", "Frequency"]
            st.bar_chart(df_functions.set_index("Function"), color="#FF6B6B")
            
        with c2:
            st.subheader("🌍 Domain Classifications")
            if "kingdoms" in result:
                df_kingdoms = pd.Series(result["kingdoms"]).value_counts().reset_index()
                df_kingdoms.columns = ["Domain", "Frequency"]
                st.bar_chart(df_kingdoms.set_index("Domain"), color="#4ECDC4")
                
        st.markdown("---")
        st.subheader("📋 Comprehensive Data Trace")
        
        df = pd.DataFrame({
            "Cluster ID": result["labels"],
            "Novelty": result["novelty"],
            "Confidence": result["confidence"],
            "Category": result["categories"],
            "Biological Type": result["functions"]
        })
        if "kingdoms" in result:
            df["Kingdom Domain"] = result["kingdoms"]
            
        # Conditionally format extreme outliers
        def highlight_novel(row):
            if row['Novelty'] >= 0.95:
                return ['background-color: rgba(255, 107, 107, 0.15); color: #FF6B6B'] * len(row)
            return [''] * len(row)
            
        st.dataframe(df.style.apply(highlight_novel, axis=1), use_container_width=True, hide_index=True)