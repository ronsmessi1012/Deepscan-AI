import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ProcessingState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24"
        >
            <div className="relative mb-8">
                <motion.div
                    className="w-20 h-20 rounded-full border-2 border-primary/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Analyzing sequences using AI models...</p>
            <p className="text-sm text-muted-foreground">Clustering · Novelty detection · Kingdom prediction</p>
        </motion.div>
    );
}
