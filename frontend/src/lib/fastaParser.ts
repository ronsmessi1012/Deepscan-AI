export interface AnalysisResult {
    sequenceId: string;
    clusterId: number;
    distance: number;
    noveltyScore: number;
    confidenceScore: number;
    category: 'Known-like' | 'Similar' | 'Potentially Novel';
    predictedKingdom: string;
    x: number;
    y: number;
}

export interface AnalysisSummary {
    totalSequences: number;
    numClusters: number;
    percentNovel: number;
    dominantKingdom: string;
    results: AnalysisResult[];
    insights: string[];
}

export async function analyzeSequences(file: File): Promise<AnalysisSummary> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to analyze sequence");
    }

    const { data } = await response.json();
    const sequencesCount = data.sequences ? data.sequences.length : 0;
    
    const results: AnalysisResult[] = [];
    const kingdomCounts: Record<string, number> = {};

    for (let i = 0; i < sequencesCount; i++) {
        const seqId = data.sequences[i].id || `seq_${i + 1}`;
        const clusterId = data.labels[i];
        const noveltyScore = data.novelty[i];
        const confidenceScore = data.confidence[i];
        const category = data.categories[i];
        const predictedKingdom = data.kingdoms ? data.kingdoms[i] : 'Unknown';
        
        const x = data.embeddings_2d && data.embeddings_2d[i] ? data.embeddings_2d[i][0] : 0;
        const y = data.embeddings_2d && data.embeddings_2d[i] ? data.embeddings_2d[i][1] : 0;

        kingdomCounts[predictedKingdom] = (kingdomCounts[predictedKingdom] || 0) + 1;

        results.push({
            sequenceId: seqId,
            clusterId,
            distance: 0, // distance can be calculated if needed, mocked to 0 for now as pipeline doesn't explicitly return per-sequence distance easily without `X`
            noveltyScore,
            confidenceScore,
            category,
            predictedKingdom,
            x: Math.round(x * 100) / 100,
            y: Math.round(y * 100) / 100,
        });
    }

    const dominantKingdom = Object.entries(kingdomCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
    const novelCount = results.filter(r => r.category === 'Potentially Novel' || r.noveltyScore > 0.6).length;
    const percentNovel = sequencesCount > 0 ? Math.round((novelCount / sequencesCount) * 100) : 0;
    const numClusters = new Set(data.labels).size;

    const insights: string[] = [];
    insights.push(`Majority of sequences (${kingdomCounts[dominantKingdom] || 0}/${sequencesCount}) are predicted as ${dominantKingdom}`);
    if (novelCount > 0) {
        insights.push(`${novelCount} sequence${novelCount > 1 ? 's' : ''} flagged as potentially novel — may represent undiscovered species`);
    }
    if (numClusters >= 4) {
        insights.push(`Sequences form ${numClusters} distinct clusters, suggesting diverse biological origins`);
    }

    return {
        totalSequences: sequencesCount,
        numClusters,
        percentNovel,
        dominantKingdom,
        results,
        insights
    };
}
