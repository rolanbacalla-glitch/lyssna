import React from 'react';

interface BiasMetric {
  id: string;
  text: string;
  status: 'Neutral' | 'Leading' | 'Biased';
  score: number;
}

const BiasPanel: React.FC = () => {
  const [appliedDetections, setAppliedDetections] = React.useState<string[]>([]);

  const handleApply = (id: string) => {
    setAppliedDetections([...appliedDetections, id]);
  };

  const metrics: BiasMetric[] = [
    { id: '1', text: "How much do you love this feature?", status: 'Leading', score: 28 },
    { id: '2', text: "Describe your frustration with the checkout.", status: 'Biased', score: 42 },
    { id: '3', text: "Walk me through your thought process when...", status: 'Neutral', score: 96 }
  ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium p-8 space-y-8 animate-fade-in group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">Observer Bias Detector</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time script auditing</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-sm transition-transform group-hover:rotate-12 duration-500">
          <span className="material-symbols-rounded">shield_with_heart</span>
        </div>
      </div>

      {/* Global Neutrality Meter */}
      <div className="space-y-3">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <span>Overall Neutrality</span>
          <span className="text-rose-500">{appliedDetections.length > 0 ? '88% RESONANCE' : '62% RESONANCE'}</span>
        </div>
        <div className="h-2 bg-slate-50 rounded-full border border-slate-100 overflow-hidden p-0.5">
          <div className={`h-full bg-rose-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,114,182,0.4)] ${appliedDetections.length > 0 ? 'w-[88%]' : 'w-[62%]'}`} />
        </div>
      </div>

      {/* Real-time Detections */}
      <div className="space-y-4">
         {metrics.map((metric) => {
           const isApplied = appliedDetections.includes(metric.id);
           return (
             <div key={metric.id} className={`p-6 rounded-[24px] border transition-all duration-500 ${
               metric.status === 'Neutral' || isApplied
               ? 'bg-emerald-50/20 border-emerald-100/30' 
               : 'bg-rose-50/20 border-rose-100/30'
             }`}>
               <div className="flex items-start justify-between gap-6">
                 <div className="flex-1 space-y-2">
                   <div className="flex items-center gap-2">
                     <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                       metric.status === 'Neutral' || isApplied ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                     }`}>
                       {isApplied ? 'NEUTRALISED' : metric.status}
                     </span>
                     {metric.status !== 'Neutral' && !isApplied && (
                       <span className="text-[10px] font-bold text-rose-400">High Bias Risk</span>
                     )}
                   </div>
                   <p className={`text-sm font-bold leading-snug transition-all duration-500 ${isApplied ? 'text-emerald-700' : 'text-slate-800'}`}>
                     {isApplied ? `Refined: "What are your first impressions of this feature?"` : metric.text}
                   </p>
                 </div>
                 
                 {!isApplied && metric.status !== 'Neutral' && (
                   <button 
                    onClick={() => handleApply(metric.id)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-rose-100 hover:border-brand-500 hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/10 transition-all text-[10px] font-black uppercase tracking-widest text-rose-500 group/btn"
                   >
                     <span className="material-symbols-rounded text-sm group-hover/btn:rotate-12 transition-transform">magic_button</span>
                     Apply
                   </button>
                 )}
                 {(isApplied || metric.status === 'Neutral') && (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-rounded text-xl">check_circle</span>
                    </div>
                 )}
               </div>
             </div>
           );
         })}
      </div>

      <button className="w-full py-4 rounded-2xl text-slate-900 font-bold bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-100 transition-all text-xs uppercase tracking-widest shadow-sm">
        Recalibrate Model
      </button>
    </div>
  );
};

export default BiasPanel;
