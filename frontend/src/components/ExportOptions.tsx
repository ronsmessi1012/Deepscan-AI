import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/fastaParser";

export default function ExportOptions({ results }: { results: AnalysisResult[] }) {
    const downloadCSV = () => {
        const headers = ['Sequence ID', 'Cluster ID', 'Distance', 'Novelty Score', 'Confidence Score', 'Category', 'Predicted Kingdom'];
        const rows = results.map(r => [r.sequenceId, r.clusterId, r.distance, r.noveltyScore, r.confidenceScore, r.category, r.predictedKingdom]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'deepscan_results.csv';
        a.click();
    };

    return (
        <div className="flex flex-wrap gap-3">
            <Button onClick={downloadCSV} variant="outline" className="gap-2 rounded-xl border-border/50 text-foreground hover:bg-secondary">
                <Download className="w-4 h-4" /> Export CSV
            </Button>
        </div>
    );
}
