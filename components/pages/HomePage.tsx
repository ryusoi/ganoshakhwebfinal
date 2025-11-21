
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../Hero';
import ChatWindow from '../ChatWindow';
import ChatInput from '../ChatInput';
import type { ChatMessage, Page } from '../../types';
import type { Language } from '../../translations';

interface HomePageProps {
  t: any;
  language: Language;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  navigate: (page: Page, anchor?: string) => void;
  isAiReady: boolean;
}

// --- Personalized Dashboard Component ---
const PersonalizedDashboard = ({ t }: { t: any }) => {
    const [greeting, setGreeting] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('Tehran (Est.)');
    const [isReturning, setIsReturning] = useState(false);

    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();
        if (hour < 12) setGreeting(t.dash_greeting_morning);
        else if (hour < 18) setGreeting(t.dash_greeting_afternoon);
        else setGreeting(t.dash_greeting_evening);

        setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Simulate checking returning user
        const visited = localStorage.getItem('visited_before');
        if (visited) setIsReturning(true);
        else localStorage.setItem('visited_before', 'true');

        // Mock Geo
        try {
           const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
           if(tz) setLocation(tz.split('/')[1]?.replace('_', ' ') || 'Global');
        } catch(e) {}

    }, [t]);

    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-[90%] max-w-3xl">
            <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-2xl animate-fade-in-up">
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                        {isReturning ? 'R' : 'G'}
                    </div>
                    <div className="text-left">
                        <p className="text-stone-300 text-xs uppercase tracking-widest">{isReturning ? t.dash_welcome_back : t.dash_new_visitor}</p>
                        <h3 className="text-white font-bold text-lg">{greeting}, User.</h3>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-stone-300 font-mono">
                     <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                         {t.dash_status_active}
                     </div>
                     <div>{time}</div>
                     <div className="hidden sm:block text-amber-400/80">{t.dash_location_detect}: {location}</div>
                </div>
            </div>
        </div>
    );
};

// --- Real Time Activity Feed ---
const ActivityFeed = ({ t, language }: { t: any, language: Language }) => {
    const [activity, setActivity] = useState('');
    const [visible, setVisible] = useState(true);
    const cities = ['Tehran', 'London', 'Shiraz', 'Dubai', 'Toronto', 'Isfahan'];
    const products = ['Reishi Extract', 'Gano Tea', 'Night Cream'];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                const city = cities[Math.floor(Math.random() * cities.length)];
                const prod = products[Math.floor(Math.random() * products.length)];
                const action = Math.random() > 0.5 ? t.activity_purchased : t.activity_viewing;
                setActivity(`User in ${city} ${action} ${prod}`);
                setVisible(true);
            }, 500);
        }, 8000);
        return () => clearInterval(interval);
    }, [t]);

    return (
        <div className={`fixed bottom-4 left-4 z-40 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-stone-900/90 backdrop-blur border border-stone-700 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
                <div className="relative">
                    <img src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/1.png" className="w-6 h-6 rounded-full object-cover" alt="Activity" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-stone-900"></span>
                </div>
                <span className="text-xs font-medium text-stone-200 whitespace-nowrap">{activity || "Loading live activity..."}</span>
            </div>
        </div>
    );
};


const FeatureCard: React.FC<{
    title: string, 
    text: string, 
    imageUrl?: string, 
    videoUrl?: string,
    cta: string, 
    onClick: () => void,
    highlight?: boolean
}> = ({ title, text, imageUrl, videoUrl, cta, onClick, highlight }) => (
    <div className="rounded-2xl overflow-hidden border flex flex-col shadow-md dark:shadow-lg dark:shadow-black/30 h-full transform transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 group" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)'}}>
        <div className="relative overflow-hidden h-56 w-full">
             {videoUrl ? (
                <video 
                    src={videoUrl} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
            ) : (
                <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow text-center items-center relative">
            <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">{title}</h3>
            <p className="mt-2 text-sm flex-grow leading-relaxed" style={{color: 'var(--text-secondary)'}}>{text}</p>
            <button 
              onClick={onClick} 
              className={`mt-4 font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 ${highlight ? 'shadow-lg shadow-yellow-500/50' : 'border'}`}
              style={highlight ? {
                backgroundColor: '#FFD700', // Vivid Yellow
                color: '#000000',
                border: 'none'
              } : {
                borderColor: 'var(--text-secondary)',
                color: 'var(--text-secondary)',
              }}
            >
                {cta}
            </button>
        </div>
    </div>
)

const HomePage: React.FC<HomePageProps> = ({ t, language, messages, onSendMessage, isLoading, error, navigate, isAiReady }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (window.innerWidth / 2 - clientX) / 40;
        const y = (window.innerHeight / 2 - clientY) / 40;
        setTilt({ x, y });
    };

  return (
    <>
      {/* Interactive 3D Hero Container */}
      <div className="relative perspective-1000 overflow-hidden" onMouseMove={handleMouseMove}>
          <div 
            className="transition-transform duration-100 ease-out" 
            style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)` }}
          >
             <Hero t={t} />
          </div>
          <PersonalizedDashboard t={t} />
      </div>

      <ActivityFeed t={t} language={language} />
      
      <section id="introduction" className="py-16 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ background: 'linear-gradient(to right, var(--text-heading-from), var(--text-heading-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.home_intro_title}</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg" style={{color: 'var(--text-secondary)'}}>{t.home_intro_subtitle}</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <FeatureCard 
                    title={t.home_feature1_title}
                    text={t.home_feature1_text}
                    imageUrl="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-16-43-725.jpg"
                    cta={t.home_feature1_cta}
                    highlight={true}
                    onClick={() => navigate('cultivation', 'farm-tour')}
                />
                <FeatureCard 
                    title={t.home_feature2_title}
                    text={t.home_feature2_text}
                    videoUrl="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/grok-video-865e3b65-2807-4e1f-bd65-00fe7f8bc82c.mp4"
                    cta={t.home_feature2_cta}
                    highlight={true}
                    onClick={() => navigate('products')}
                />
                 <FeatureCard 
                    title={t.home_feature3_title}
                    text={t.home_feature3_text}
                    videoUrl="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Immunity%20Optimize.mp4"
                    cta={t.home_feature3_cta}
                    highlight={true}
                    onClick={() => navigate('science', 'science-tour')}
                />
            </div>
        </div>
      </section>

      <section id="chat" className="py-16 sm:py-24 relative overflow-hidden">
         {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center" style={{ background: 'linear-gradient(to right, var(--text-heading-from), var(--text-heading-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.chat_title}</h2>
          <p className="text-center mt-2" style={{color: 'var(--text-secondary)'}}>{t.chat_subtitle}</p>
          <div className="mt-8 h-[60vh] max-h-[700px] flex flex-col rounded-2xl border shadow-xl dark:shadow-2xl dark:shadow-black/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', borderColor: 'var(--border-primary)'}}>
            <ChatWindow messages={messages} t={t} />
            <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} t={t} isAiReady={isAiReady} />
            {error && <p className="text-center text-red-500 dark:text-red-400 text-sm pb-2 px-4">{error}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
