import { motion } from "framer-motion";
import { Dna, Sparkles, Microscope } from "lucide-react";

export default function HeroLanding() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero dna-grid">
            {/* Floating orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ top: '10%', left: '15%' }}
                />
                <motion.div
                    className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl"
                    animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    style={{ bottom: '10%', right: '10%' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                        <Dna className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        Bioinformatics AI Platform
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="text-gradient-primary">DeepScan</span>{" "}
                    <span className="text-foreground">AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl text-muted-foreground font-light mb-4"
                >
                    DNA Intelligence Engine
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="text-base text-muted-foreground/80 max-w-2xl mx-auto mb-12"
                >
                    Discover hidden biological patterns from raw DNA sequences. Cluster, classify, and detect novelty with AI-driven analysis.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
                >
                    {[
                        { icon: Sparkles, label: "Novelty Detection" },
                        { icon: Microscope, label: "Kingdom Prediction" },
                        { icon: Dna, label: "Sequence Clustering" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <span>{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
