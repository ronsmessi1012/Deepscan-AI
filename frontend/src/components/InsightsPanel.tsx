import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function InsightsPanel({ insights }: { insights: string[] }) {
    return (
        <div className="glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-5">
                <Lightbulb className="w-5 h-5 text-novel" />
                <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            </div>
            <div className="space-y-3">
                {insights.map((insight, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-sm text-secondary-foreground leading-relaxed">{insight}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
