
import React from 'react';
import type { Language } from '../../translations';
import BioactiveChart from '../charts/BioactiveChart';
import StudySnippet from '../StudySnippet';

interface SciencePageProps {
  t: any;
  language: Language;
}

const SciencePage: React.FC<SciencePageProps> = ({ t, language }) => {
  const studies = [
    {
      title: "Cochrane Database Syst Rev. 2016",
      snippet: t.science_trials_jin_desc,
      source: "Jin X et al.",
      url: "https://pubmed.ncbi.nlm.nih.gov/27071929/"
    },
    {
      title: "Frontiers in Nutrition 2024",
      snippet: t.science_log_evidence_text,
      source: "Frontiers in Nutrition",
      url: "https://www.frontiersin.org/journals/nutrition"
    }
  ];

  return (
    <div className="animate-fade-in py-16 sm:py-24 text-slate-800 dark:text-slate-100">
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 dark:from-amber-200 dark:to-amber-500">
          {t.science_title}
        </h1>
        
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto whitespace-pre-wrap">
          {t.science_text}
        </p>

        {/* Chart Section */}
        <div className="mt-16 mb-24">
            <h2 className="text-2xl font-bold mb-8 dark:text-amber-100">{t.science_chart_title}</h2>
            <BioactiveChart />
        </div>

        {/* Clinical Trials Section */}
        <div className="mt-16 mb-24 text-left">
             <h2 className="text-2xl font-bold mb-8 text-center dark:text-amber-100">{t.science_trials_title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studies.map((study, index) => (
                    <StudySnippet 
                        key={index} 
                        title={study.title} 
                        snippet={study.snippet} 
                        source={study.source} 
                        url={study.url} 
                        t={t} 
                    />
                ))}
             </div>
        </div>

        {/* Log vs Sawdust Comparison Section */}
        <div id="log-vs-sawdust" className="mt-24 text-left animate-fade-in">
             <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 max-w-4xl mx-auto">
                <img 
                    src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shalkh%20Antler.jpg" 
                    alt="Gano Shakh Antler Reishi" 
                    className="w-full h-auto object-cover"
                />
             </div>

             <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8 text-center border-b border-stone-800 pb-6">
                {t.science_log_title}
             </h3>
             
             <div className="bg-stone-900/60 border border-stone-700 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
                <p className="text-lg text-stone-300 leading-relaxed mb-6">
                    {t.science_log_intro}
                </p>
                <ul className="list-disc pl-6 space-y-4 text-stone-300">
                    <li><strong className="text-amber-400">{t.science_log_diff_title}:</strong></li>
                    <li>{t.science_log_diff_1}</li>
                    <li>{t.science_log_diff_2}</li>
                    <li>{t.science_log_diff_3}</li>
                </ul>
             </div>

             {/* Detailed Comparison Table */}
             <div className="overflow-x-auto rounded-xl border border-stone-700 shadow-2xl">
                 <table className="w-full text-left border-collapse bg-stone-900/80 backdrop-blur">
                     <thead>
                         <tr className="bg-stone-800 text-amber-400">
                             <th className="p-4 border-b border-stone-700">{t.science_table_header_1}</th>
                             <th className="p-4 border-b border-stone-700">{t.science_table_header_2}</th>
                             <th className="p-4 border-b border-stone-700">{t.science_table_header_3}</th>
                             <th className="p-4 border-b border-stone-700">{t.science_table_header_4}</th>
                         </tr>
                     </thead>
                     <tbody>
                         {t.science_table_rows && t.science_table_rows.map((row: any, index: number) => (
                             <tr key={index} className="border-b border-stone-700/50 hover:bg-stone-800/50 transition-colors">
                                 <td className="p-4 font-bold text-stone-200">{row.c1}</td>
                                 <td className="p-4 text-stone-400 text-sm">{row.c2}</td>
                                 <td className="p-4 text-emerald-400 text-sm font-mono">{row.c3}</td>
                                 <td className="p-4 text-stone-500 text-xs italic">{row.c4}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </div>

      </div>
    </div>
  );
};

export default SciencePage;
