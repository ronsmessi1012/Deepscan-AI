import { motion } from "framer-motion";
import { Layers, GitBranch, Sparkles, Crown } from "lucide-react";
import type { AnalysisSummary } from "@/lib/fastaParser";

export default function SummaryCards({ summary }: { summary: AnalysisSummary }) {
    const cards = [
        { icon: Layers, label: "Total Sequences", value: summary.totalSequences.toLocaleString(), color: "text-primary" },
        { icon: GitBranch, label: "Clusters", value: summary.numClusters, color: "text-accent" },
        { icon: Sparkles, label: "% Potentially Novel", value: `${summary.percentNovel}%`, color: "text-novel" },
        { icon: Crown, label: "Dominant Kingdom", value: summary.dominantKingdom, color: "text-similar" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map(({ icon: Icon, label, value, color }, i) => (
                <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-5 shadow-card"
                >
                    <Icon className={`w-5 h-5 ${color} mb-3`} />
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </motion.div>
            ))}
        </div>
    );
}
