import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
    onFileAccepted: (file: File) => void;
    isAnalyzing: boolean;
    onRunAnalysis: () => void;
    fileName: string | null;
    onClear: () => void;
}

export default function FileUpload({ onFileAccepted, isAnalyzing, onRunAnalysis, fileName, onClear }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback((file: File) => {
        if (!file.name.endsWith('.fasta') && !file.name.endsWith('.fa') && !file.name.endsWith('.fna')) {
            return;
        }
        onFileAccepted(file);
    }, [onFileAccepted]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    return (
        <section className="max-w-2xl mx-auto px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">Upload Sequences</h2>

                <AnimatePresence mode="wait">
                    {!fileName ? (
                        <motion.div
                            key="dropzone"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onDragLeave={() => setIsDragging(false)}
                            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}
                            onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = '.fasta,.fa,.fna';
                                input.onchange = (e) => {
                                    const f = (e.target as HTMLInputElement).files?.[0];
                                    if (f) handleFile(f);
                                };
                                input.click();
                            }}
                        >
                            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                            <p className="text-foreground font-medium mb-1">Drop your FASTA file here</p>
                            <p className="text-sm text-muted-foreground">or click to browse · .fasta, .fa, .fna</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-info"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass rounded-2xl p-6 shadow-card"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary/10">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-foreground font-medium">{fileName}</p>
                                        <p className="text-xs text-muted-foreground">Ready for analysis</p>
                                    </div>
                                </div>
                                <button onClick={onClear} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <Button
                                onClick={onRunAnalysis}
                                disabled={isAnalyzing}
                                className="w-full bg-gradient-primary text-primary-foreground font-semibold h-12 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
                            >
                                <Play className="w-4 h-4 mr-2" />
                                Run Analysis
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
