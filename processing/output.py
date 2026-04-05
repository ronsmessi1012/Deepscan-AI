import csv

def save_results(result, output_path):

    with open(output_path, "w", newline="") as f:
        writer = csv.writer(f)

        writer.writerow([
            "Sequence_ID",
            "Cluster",
            "Novelty",
            "Confidence",
            "Category",
            "Function"
        ])

        for i in range(len(result["sequences"])):
            writer.writerow([
                f"Sequence_{i}",
                result["labels"][i],
                round(result["novelty"][i], 4),
                round(result["confidence"][i], 4),
                result["categories"][i],
                result["functions"][i]
            ])

from collections import Counter

def generate_summary(result):

    print("\n===== SUMMARY =====")

    print("Clusters:", Counter(result["labels"]))
    print("Categories:", Counter(result["categories"]))
    print("Functions:", Counter(result["functions"]))

    high_novel = sum(1 for n in result["novelty"] if n > 0.98)
    print("High-confidence novel:", high_novel)