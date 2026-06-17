from processing.preprocess import load_sequences, sequence_to_vector
def load_kingdom_data(files):
    X = []
    y = []

    for label, file in files.items():
        sequences = load_sequences(file)  # reuse your preprocess
        for seq in sequences:
            vec, _ = sequence_to_vector(seq)
            X.append(vec)
            y.append(label)

    return X, y

from sklearn.ensemble import RandomForestClassifier

def train_model(X, y):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

def predict_kingdom(model, sequence):
    vec, _ = sequence_to_vector(sequence)
    return model.predict([vec])[0]