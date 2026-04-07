import React, { useState } from 'react';
import axios from 'axios';
import { Activity, ShieldAlert, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/analyze', formData);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent pb-2">
          DeepScan AI Web Array
        </h1>
        <p className="text-gray-400 text-lg">Lovable-tier Biological Topologies & Classifications</p>
      </div>

      <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          className="block w-full max-w-sm text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-all cursor-pointer" 
        />
        <button 
          onClick={handleUpload}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold text-white shadow-lg hover:shadow-pink-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          disabled={!file || loading}
        >
          {loading ? "Analyzing Matrix Topology..." : "Launch Advanced Sequence Run"}
        </button>
      </div>

      {data && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-2xl flex items-center space-x-6">
              <Activity className="w-12 h-12 text-cyan-400" />
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Sequence Matrix</p>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mt-1">{data.sequences?.length || 0}</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl flex items-center space-x-6">
              <ShieldAlert className="w-12 h-12 text-pink-500" />
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Extreme Outliers</p>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mt-1">{data.novelty?.filter((n: number) => n > 0.95).length || 0}</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl flex items-center space-x-6">
              <Cpu className="w-12 h-12 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Kingdom Arrays</p>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mt-1">{new Set(data.kingdoms || []).size}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8">Functional Demographics Matrix</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(
                  data.functions.reduce((acc: any, val: any) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {})
                ).map(([name, count]) => ({ name, count }))}>
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                  <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: '#1f2937', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="url(#colorUv)" radius={[6,6,0,0]} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#556270" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
