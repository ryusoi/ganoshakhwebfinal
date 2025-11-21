
import React, { useState, useEffect, useRef } from 'react';
import type { Language } from '../../translations';

interface CultivationPageProps {
  t: any;
  language: Language;
}

// Intersection Observer hook for scroll reveal
const useOnScreen = (options: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        }, options);
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if(ref.current) observer.unobserve(ref.current);
        }
    }, [ref, options]);
    return [ref, visible] as const;
}

const ScrollRevealSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const [ref, visible] = useOnScreen({ threshold: 0.2 });
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
        >
            {children}
        </div>
    );
}

const ImageGallery: React.FC<{ images: {url: string, position?: string}[], altPrefix: string }> = ({ images, altPrefix }) => (
    <div className="grid grid-cols-2 gap-4 my-8">
        {images.map(({url, position}, index) => (
            <div key={index} className={`rounded-2xl shadow-md dark:shadow-lg dark:shadow-black/30 overflow-hidden transition-transform duration-500 hover:scale-[1.02] ${images.length === 3 && index === 0 ? 'col-span-2' : ''}`}>
                <img 
                    src={url} 
                    alt={`${altPrefix} - image ${index + 1}`}
                    className="w-full h-64 object-cover"
                    style={{ objectPosition: position || 'center' }}
                />
            </div>
        ))}
    </div>
);

const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

const SpeakerXMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

const CultivationPage: React.FC<CultivationPageProps> = ({ t, language }) => {
  const farmTourVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoshakh%20NEW.mp4";
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Medicinal%20Mushroom%206.mp4";
  const [isMuted, setIsMuted] = useState(true);
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
  
  const logImages = [
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-16-43-725.jpg", position: 'top' },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-23-11-22-38-847.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-23-11-24-01-235.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-28-59-698.jpg" },
  ];

  const containerImages = [
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/a7995ca7-478c-4360-a8cc-56da83d558b6.webp" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/reishi-logs-2__62576.jpg" },
  ];

  const outdoorImages = [
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Grow%20room.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Outdoor%20Cultivation.png" }
  ];

  return (
    <div className="pb-24">
        {/* Hero Section with Sharp Parallax */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-stone-950 mb-12">
            <div 
            className="absolute top-[-10%] left-0 w-full h-[120%] pointer-events-none will-change-transform"
            style={{ transform: `translateY(${offset * 0.5}px)` }}
            >
                <video 
                    src={heroVideoUrl} 
                    className="w-full h-full object-cover opacity-90"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-950/90 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    {t.cultivation_title}
                </h1>
            </div>
        </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-24 mt-12 text-center">
            {/* Log Cultivation Section - Storytelling */}
            <ScrollRevealSection>
                <div className="relative pl-4 border-l-4 border-amber-500/50">
                    <h2 className="text-2xl sm:text-4xl font-bold dark:text-amber-300 text-left mb-6" style={{ color: 'var(--text-primary)'}}>{t.cultivation_log_title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-left mb-8" style={{ color: 'var(--text-secondary)'}}>{t.cultivation_log_text}</p>
                    <ImageGallery images={logImages} altPrefix="Log cultivation" />
                </div>
            </ScrollRevealSection>

            {/* Container Cultivation Section */}
            <ScrollRevealSection>
                 <div className="relative pl-4 border-l-4 border-yellow-500/30">
                    <h2 className="text-2xl sm:text-4xl font-bold text-left mb-6" style={{ color: '#facc15' }}>{t.cultivation_container_title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-left mb-8" style={{ color: 'var(--text-secondary)'}}>{t.cultivation_container_text}</p>
                    <ImageGallery images={containerImages} altPrefix="Container cultivation" />
                 </div>
            </ScrollRevealSection>

            {/* Outdoor Cultivation Section */}
            <ScrollRevealSection>
                 <div className="relative pl-4 border-l-4 border-stone-500/30">
                    <h2 className="text-2xl sm:text-4xl font-bold dark:text-amber-300 text-left mb-6" style={{ color: 'var(--text-primary)'}}>{t.cultivation_outdoor_title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-left mb-8" style={{ color: 'var(--text-secondary)'}}>{t.cultivation_outdoor_text}</p>
                    <ImageGallery images={outdoorImages} altPrefix="Outdoor cultivation" />
                 </div>
            </ScrollRevealSection>
        </div>

        <ScrollRevealSection className="mt-24 sm:mt-32 text-center">
            <div id="farm-tour">
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ background: 'linear-gradient(to right, var(--text-heading-from), var(--text-heading-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  {t.farm_tour_title}
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  {t.farm_tour_text}
                </p>
                <div className="mt-8 aspect-[9/16] w-full max-w-sm mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-800/50 transform hover:scale-105 transition-transform duration-500">
                  <video
                    src={farmTourVideoUrl}
                    aria-label={t.farm_tour_title}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                 <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-stone-200/50 dark:bg-stone-800/50 hover:bg-stone-300 dark:hover:bg-stone-700 backdrop-blur-sm transition-all text-sm font-medium shadow-sm"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <SpeakerXMarkIcon className="w-4 h-4" /> : <SpeakerWaveIcon className="w-4 h-4" />}
                    <span>{isMuted ? "Unmute" : "Mute"}</span>
                  </button>
            </div>
        </ScrollRevealSection>
      </div>
    </div>
  );
};

export default CultivationPage;
