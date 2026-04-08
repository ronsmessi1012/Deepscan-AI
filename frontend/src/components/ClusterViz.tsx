import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { AnalysisResult } from "@/lib/fastaParser";

const CLUSTER_COLORS = [
    'hsl(172, 66%, 50%)', 'hsl(210, 70%, 55%)', 'hsl(45, 93%, 58%)',
    'hsl(340, 65%, 55%)', 'hsl(280, 55%, 60%)', 'hsl(100, 50%, 50%)',
    'hsl(20, 80%, 55%)', 'hsl(200, 60%, 45%)',
];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="glass rounded-xl p-3 text-xs shadow-card border border-border/50">
            <p className="font-mono text-foreground font-medium mb-1">{d.sequenceId}</p>
            <p className="text-muted-foreground">Cluster {d.clusterId} · {d.category}</p>
            <p className="text-muted-foreground">Novelty: {d.noveltyScore} · {d.predictedKingdom}</p>
        </div>
    );
};

export default function ClusterViz({ results }: { results: AnalysisResult[] }) {
    const data = useMemo(() => results.map(r => ({ ...r })), [results]);

    return (
        <div className="glass rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-1">Cluster Visualization</h3>
            <p className="text-xs text-muted-foreground mb-6">UMAP-style 2D embedding · colored by cluster</p>
            <ResponsiveContainer width="100%" height={360}>
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <XAxis dataKey="x" type="number" tick={{ fontSize: 10, fill: 'hsl(200, 8%, 55%)' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="y" type="number" tick={{ fontSize: 10, fill: 'hsl(200, 8%, 55%)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter data={data} fillOpacity={0.8}>
                        {data.map((entry, i) => (
                            <Cell key={i} fill={CLUSTER_COLORS[entry.clusterId % CLUSTER_COLORS.length]} r={5} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
