import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { AnalysisResult } from "@/lib/fastaParser";

export default function NoveltyHistogram({ results }: { results: AnalysisResult[] }) {
    const data = useMemo(() => {
        const bins = Array.from({ length: 10 }, (_, i) => ({
            range: `${(i * 0.1).toFixed(1)}-${((i + 1) * 0.1).toFixed(1)}`,
            count: 0,
            binIdx: i,
        }));
        results.forEach(r => {
            const idx = Math.min(9, Math.floor(r.noveltyScore * 10));
            bins[idx].count++;
        });
        return bins;
    }, [results]);

    const getColor = (idx: number) => {
        if (idx < 3) return 'hsl(172, 66%, 50%)';
        if (idx < 6) return 'hsl(210, 70%, 55%)';
        return 'hsl(45, 93%, 58%)';
    };

    return (
        <div className="glass rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-1">Novelty Distribution</h3>
            <p className="text-xs text-muted-foreground mb-6">Score ranges: Known-like (0-0.3) · Similar (0.3-0.6) · Novel (0.6-1.0)</p>
            <ResponsiveContainer width="100%" height={360}>
                <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis dataKey="range" tick={{ fontSize: 10, fill: 'hsl(200, 8%, 55%)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(200, 8%, 55%)' }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ background: 'hsl(200, 18%, 8%)', border: '1px solid hsl(200, 12%, 16%)', borderRadius: '12px', fontSize: '12px', color: 'hsl(180, 10%, 92%)' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {data.map((entry) => (
                            <Cell key={entry.range} fill={getColor(entry.binIdx)} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
