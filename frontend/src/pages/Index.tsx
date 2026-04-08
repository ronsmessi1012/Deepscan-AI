import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroLanding from "@/components/HeroLanding";
import FileUpload from "@/components/FileUpload";
import ProcessingState from "@/components/ProcessingState";
import SummaryCards from "@/components/SummaryCards";
import SequenceTable from "@/components/SequenceTable";
import ClusterViz from "@/components/ClusterViz";
import NoveltyHistogram from "@/components/NoveltyHistogram";
import InsightsPanel from "@/components/InsightsPanel";
import ExportOptions from "@/components/ExportOptions";
import ModelDetails from "@/components/ModelDetails";
import { analyzeSequences, type AnalysisSummary } from "@/lib/fastaParser";

type AppState = 'idle' | 'processing' | 'results';

const Index = () => {
    const [state, setState] = useState<AppState>('idle');
    const [fileName, setFileName] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState<AnalysisSummary | null>(null);

    const handleFileAccepted = useCallback((f: File) => {
        setFile(f);
        setFileName(f.name);
    }, []);

    const handleClear = useCallback(() => {
        setFileName(null);
        setFile(null);
        setSummary(null);
        setState('idle');
    }, []);

    const handleRunAnalysis = useCallback(async () => {
        if (!file) return;
        setState('processing');
        try {
            const result = await analyzeSequences(file);
            setSummary(result);
            setState('results');
        } catch (error) {
            console.error("Analysis failed:", error);
            setState('idle');
        }
    }, [file]);

    return (
        <div className="min-h-screen bg-background">
            <HeroLanding />

            <FileUpload
                onFileAccepted={handleFileAccepted}
                isAnalyzing={state === 'processing'}
                onRunAnalysis={handleRunAnalysis}
                fileName={fileName}
                onClear={handleClear}
            />

            <AnimatePresence mode="wait">
                {state === 'processing' && <ProcessingState key="processing" />}

                {state === 'results' && summary && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-7xl mx-auto px-6 pb-24"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {summary.totalSequences} sequences analyzed from {fileName}
                                </p>
                            </div>
                            <ExportOptions results={summary.results} />
                        </div>

                        <SummaryCards summary={summary} />

                        <div className="grid lg:grid-cols-2 gap-6 mb-8">
                            <ClusterViz results={summary.results} />
                            <NoveltyHistogram results={summary.results} />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6 mb-8">
                            <div className="lg:col-span-2">
                                <SequenceTable results={summary.results} />
                            </div>
                            <InsightsPanel insights={summary.insights} />
                        </div>

                        <ModelDetails />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Index;
