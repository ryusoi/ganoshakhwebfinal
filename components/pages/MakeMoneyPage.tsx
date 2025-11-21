
import React, { useEffect, useState } from 'react';
import type { Language } from '../../translations';
import WhatsappIcon from '../icons/WhatsappIcon';

interface MakeMoneyPageProps {
  t: any;
  language: Language;
}

const MakeMoneyPage: React.FC<MakeMoneyPageProps> = ({ t, language }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = language === 'fa';
  // Updated to the specific Make Money video URL with correct encoding
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/MAke%20Money.mp4"; 

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 ${isRtl ? 'font-reishi-body text-right' : 'text-left'}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .btn-vivid {
                background-color: #25D366; /* WhatsApp Green */
                color: #fff;
                box-shadow: 0 0 15px rgba(37, 211, 102, 0.4);
                transition: all 0.3s ease;
            }
            .btn-vivid:hover {
                background-color: #128C7E;
                box-shadow: 0 0 25px rgba(37, 211, 102, 0.6);
                transform: translateY(-2px);
            }
        `}</style>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-stone-950">
         {/* Parallax Container: Increased height and negative top to prevent gaps during scroll */}
         <div 
          className="absolute top-[-30%] left-0 w-full h-[160%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.4}px)` }}
        >
             <video 
                src={heroVideoUrl} 
                className="w-full h-full object-cover opacity-60"
                autoPlay 
                loop 
                muted 
                playsInline 
                onError={(e) => e.currentTarget.style.display = 'none'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-stone-950/90 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 drop-shadow-lg mb-6">
                {t.mm_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-200 font-light tracking-wide drop-shadow-md">
                {t.mm_hero_subtitle}
            </p>
             <a 
                href="https://wa.me/989196214129"
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 btn-vivid font-bold py-4 px-10 rounded-full text-lg transition-all"
            >
                <WhatsappIcon className="w-6 h-6" />
                {t.mm_cta}
            </a>
        </div>
      </section>

      {/* Opportunity & Calculation */}
      <section className="py-20 bg-stone-900">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">{t.mm_opp_title}</h2>
                  <p className="text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed">
                      {t.mm_opp_desc}
                  </p>
              </div>

              {/* Calculation Card */}
              <div className="bg-stone-800 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-center mb-10 text-white">{t.mm_calc_title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                      <div className="text-center p-6 bg-stone-900/50 rounded-xl border border-stone-700">
                          <div className="text-stone-400 text-sm uppercase tracking-widest mb-2">{t.mm_calc_cost_label}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-white">{t.mm_calc_cost_val}</div>
                      </div>
                      
                      <div className="hidden md:flex justify-center text-stone-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-10 h-10 ${isRtl ? 'rotate-180' : ''}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                      </div>

                       <div className="text-center p-6 bg-stone-900/50 rounded-xl border border-stone-700">
                          <div className="text-stone-400 text-sm uppercase tracking-widest mb-2">{t.mm_calc_rev_label}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-blue-300">{t.mm_calc_rev_val}</div>
                      </div>
                  </div>

                  <div className="mt-10 p-6 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-500/30 text-center relative z-10">
                       <div className="text-green-400 text-sm uppercase tracking-widest mb-2">{t.mm_calc_profit_label}</div>
                       <div className="text-4xl sm:text-5xl font-bold text-green-400 drop-shadow-lg">{t.mm_calc_profit_val}</div>
                  </div>
              </div>
          </div>
      </section>

      {/* Exclusive Member Benefits Section */}
      <section className="py-20 bg-stone-950 relative overflow-hidden border-t border-stone-800">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-transparent pointer-events-none"></div>
            <div className="absolute -left-20 top-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-800 border border-amber-500/50 mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
                    <span className="text-4xl">🏆</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200 mb-6 drop-shadow-sm">
                    {t.mm_exclusive_title}
                </h2>
                <p className="text-xl text-stone-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t.mm_exclusive_desc}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-700 hover:border-amber-500 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
                        <div className="text-5xl mb-6 drop-shadow-md">💎</div>
                        <h3 className="text-lg font-bold text-white">{t.mm_benefit_1}</h3>
                    </div>
                    <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-700 hover:border-amber-500 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
                        <div className="text-5xl mb-6 drop-shadow-md">💰</div>
                        <h3 className="text-lg font-bold text-white">{t.mm_benefit_2}</h3>
                    </div>
                    <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-700 hover:border-amber-500 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
                        <div className="text-5xl mb-6 drop-shadow-md">🚀</div>
                        <h3 className="text-lg font-bold text-white">{t.mm_benefit_3}</h3>
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-stone-900 to-emerald-900/40 border border-emerald-500/30 shadow-lg">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
                        {t.mm_exclusive_fortune}
                    </h3>
                </div>
            </div>
      </section>

      {/* Features / Benefits Grid */}
      <section className="py-20 bg-stone-950">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                  <div className={`p-8 rounded-2xl bg-stone-800 border border-stone-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div className="text-4xl mb-4">📦</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{t.mm_flex_title}</h3>
                      <p className="text-stone-400 leading-relaxed">{t.mm_flex_desc}</p>
                  </div>
                   <div className={`p-8 rounded-2xl bg-stone-800 border border-stone-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div className="text-4xl mb-4">🔓</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{t.mm_disc_title}</h3>
                      <p className="text-stone-400 leading-relaxed">{t.mm_disc_desc}</p>
                  </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-12 text-white">{t.mm_why_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="p-6 rounded-xl bg-stone-900/50 border border-stone-800 flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                              {num}
                          </div>
                          <span className="text-lg font-medium text-stone-200">{t[`mm_why_${num}`]}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-black to-stone-900 text-center border-t border-stone-800">
          <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">{t.mm_final_title}</h2>
              <p className="text-xl text-stone-400 mb-10 leading-relaxed">{t.mm_final_text}</p>
               <a 
                href="https://wa.me/989196214129"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 btn-vivid font-bold py-5 px-12 rounded-full text-xl transition-all shadow-2xl"
            >
                <WhatsappIcon className="w-8 h-8" />
                {t.mm_cta}
            </a>
          </div>
      </section>

    </div>
  );
};

export default MakeMoneyPage;
