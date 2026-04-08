import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu } from "lucide-react";

export default function ModelDetails() {
    const [open, setOpen] = useState(false);

    const details = [
        { label: "Clustering Method", value: "K-means on k-mer frequency vectors" },
        { label: "Dimensionality Reduction", value: "UMAP (2D embedding)" },
        { label: "Classification Model", value: "Random Forest + GC-content features" },
        { label: "Feature Space", value: "4-mer frequency vectors (256 features)" },
        { label: "Novelty Detection", value: "Distance-based scoring with adaptive threshold" },
    ];

    return (
        <div className="glass rounded-2xl shadow-card overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">Model Details</span>
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-3">
                            {details.map(d => (
                                <div key={d.label} className="flex items-start justify-between p-3 rounded-xl bg-secondary/40">
                                    <span className="text-sm text-muted-foreground">{d.label}</span>
                                    <span className="text-sm text-foreground font-medium text-right">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
