def gc_content(seq):
    if len(seq) == 0:
        return 0
    return (seq.count('G') + seq.count('C')) / len(seq)


def kmer_diversity(kmers):
    if len(kmers) == 0:
        return 0
    return len(set(kmers)) / len(kmers)


def predict_function(sequences, kmers_list):

    function_labels = []

    for i in range(len(sequences)):

        seq = sequences[i]
        kmers = kmers_list[i]

        gc = gc_content(seq)
        diversity = kmer_diversity(kmers)

        # ------------------------------
        # Heuristic Functional Logic
        # ------------------------------

        if gc > 0.6 and diversity > 0.7:
            function_labels.append("Enzyme-like")

        elif diversity > 0.8:
            function_labels.append("Bioactive-like")

        elif gc < 0.4:
            function_labels.append("AT-rich (structural)")

        else:
            function_labels.append("Unknown/General")

    return function_labels