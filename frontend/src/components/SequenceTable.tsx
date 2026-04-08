import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { AnalysisResult } from "@/lib/fastaParser";

const PAGE_SIZE = 10;

const categoryStyles: Record<string, string> = {
    'Known-like': 'bg-known/15 text-known',
    'Similar': 'bg-similar/15 text-similar',
    'Potentially Novel': 'bg-novel/15 text-novel',
};

export default function SequenceTable({ results }: { results: AnalysisResult[] }) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [sortKey, setSortKey] = useState<keyof AnalysisResult>('noveltyScore');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return results.filter(r =>
            r.sequenceId.toLowerCase().includes(q) ||
            r.predictedKingdom.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q)
        );
    }, [results, search]);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });
    }, [filtered, sortKey, sortDir]);

    const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
    const pageData = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const toggleSort = (key: keyof AnalysisResult) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
        setPage(0);
    };

    const SortIcon = ({ col }: { col: keyof AnalysisResult }) => {
        if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-muted-foreground/50" />;
        return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />;
    };

    const columns: { key: keyof AnalysisResult; label: string }[] = [
        { key: 'sequenceId', label: 'Sequence ID' },
        { key: 'clusterId', label: 'Cluster' },
        { key: 'distance', label: 'Distance' },
        { key: 'noveltyScore', label: 'Novelty' },
        { key: 'confidenceScore', label: 'Confidence' },
        { key: 'category', label: 'Category' },
        { key: 'predictedKingdom', label: 'Kingdom' },
    ];

    return (
        <div className="glass rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(0); }}
                        placeholder="Search sequences, kingdoms, categories..."
                        className="pl-10 bg-secondary/50 border-border/50"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50">
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    onClick={() => toggleSort(col.key)}
                                    className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                                >
                                    <span className="flex items-center gap-1">{col.label} <SortIcon col={col.key} /></span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.map((r, i) => (
                            <tr key={r.sequenceId + i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                                <td className="px-4 py-3 font-mono text-xs text-foreground">{r.sequenceId}</td>
                                <td className="px-4 py-3 text-foreground">{r.clusterId}</td>
                                <td className="px-4 py-3 text-foreground">{r.distance}</td>
                                <td className="px-4 py-3 text-foreground">{r.noveltyScore}</td>
                                <td className="px-4 py-3 text-foreground">{r.confidenceScore}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyles[r.category] || ''}`}>
                                        {r.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-foreground">{r.predictedKingdom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-sm text-muted-foreground">
                    <span>{sorted.length} results</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-lg bg-secondary/50 hover:bg-secondary disabled:opacity-40 transition-colors">Prev</button>
                        <span>{page + 1} / {totalPages}</span>
                        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-lg bg-secondary/50 hover:bg-secondary disabled:opacity-40 transition-colors">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}
