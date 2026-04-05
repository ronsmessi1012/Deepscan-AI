import os
import sys

target_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "processing")
if os.getcwd() != target_dir:
    os.chdir(target_dir)
sys.path.append(target_dir)

import streamlit as st
from pipeline import run_pipeline

st.title("DeepScan AI 🚀")

uploaded_file = st.file_uploader("Upload DNA file")

if uploaded_file:
    with open("temp.txt", "wb") as f:
        f.write(uploaded_file.read())

    result = run_pipeline("temp.txt")

    st.write("Results:")
    st.write(result)