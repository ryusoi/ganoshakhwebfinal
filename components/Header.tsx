
import React, { useState, useEffect } from 'react';
import type { Language } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import type { User } from '@supabase/supabase-js';
import type { Page, Theme } from '../types';
import InstagramIcon from './icons/InstagramIcon';
import WhatsappIcon from './icons/WhatsappIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import CloseIcon from './icons/CloseIcon';
import MailIcon from './icons/MailIcon';
import TelegramIcon from './icons/TelegramIcon';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: any; // translations object
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isSupabaseReady: boolean;
  navigate: (page: Page, anchor?: string) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, setTheme, t, user, onLogin, onLogout, isSupabaseReady, navigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleBannerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage === 'home') {
        const chatSection = document.getElementById('chat');
        if (chatSection) {
            chatSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate('home', 'chat');
    }
  };

  const navLinksRow1 = [
    { pageId: 'home', label: t.nav_home },
    { pageId: 'about', label: t.nav_about },
    { pageId: 'cultivation', label: t.nav_cultivation },
    { pageId: 'science', label: t.nav_science },
    { pageId: 'products', label: t.nav_products },
    { pageId: 'reishi-decor', label: t.nav_reishi_decor },
    { pageId: 'reishi-biome', label: t.nav_reishi_biome },
  ];
  
  const navLinksRow2 = [
    { pageId: 'reishi-cream', label: t.nav_reishi_cream },
    { pageId: 'reishi-extract', label: t.nav_reishi_extract },
    { pageId: 'investment', label: t.nav_investment },
    { pageId: 'sales', label: t.nav_sales },
    { pageId: 'make-money', label: t.nav_make_money },
    { pageId: 'health-tips', label: t.nav_health_tips },
    { pageId: 'myco-news', label: t.nav_myco_news },
    { pageId: 'blogs', label: t.nav_blogs },
    { pageId: 'contact', label: t.nav_contact },
  ];

  const getDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.display_name || user.email?.split('@')[0] || '';
  }

  const isCurrent = (pageId: Page) => currentPage === pageId;

  const logoWords = t.hero_headline.split(' ');
  
  // High Definition Chrome Gold Text with Word-by-Word Shine - Increased Font Size
  const AnimatedLogo = () => (
    <div className="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest">
        {logoWords.length > 1 ? (
            <>
              <span className="chrome-gold-text" style={{ animationDelay: '0s' }}>{logoWords[0]}</span>
              <span className="chrome-gold-text" style={{ animationDelay: '1.5s' }}>{logoWords[1]}</span>
            </>
        ) : (
          <span className="chrome-gold-text">{logoWords[0]}</span>
        )}
      </div>
  );

  // High Definition Scan Effect Logo - Significantly Increased Size (h-32 / 128px)
  // Updated to blend edges seamlessly using CSS masks instead of borders/shadows
  const LogoImage = ({ className }: { className?: string }) => (
      <div 
        className={`scan-effect flex-shrink-0 ${className || 'h-32 w-32'}`}
        style={{
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
        }}
      >
          <img 
            src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20150940.png" 
            alt="Gano Shakh Emblem" 
            className="h-full w-full object-cover" 
          />
      </div>
  );

  const renderNavButtons = (links: {pageId: string, label: string}[]) => (
    <div className="flex items-center justify-center gap-2 nav-row flex-wrap">
        {links.map(link => (
          <div key={link.pageId} className="relative group">
             <button
                onClick={() => navigate(link.pageId as Page)}
                className={`nav-button ${isCurrent(link.pageId as Page) ? 'active' : ''}`}
                aria-current={isCurrent(link.pageId as Page) ? 'page' : undefined}
              >
                {link.label}
              </button>
              {/* Mega Menu Preview */}
              {['products', 'reishi-decor', 'reishi-biome'].includes(link.pageId) && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-4 w-64">
                      <div className="bg-stone-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 shadow-2xl overflow-hidden text-center">
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">{t.mega_menu_featured}</div>
                          <div className="h-24 bg-stone-800 rounded-lg mb-2 overflow-hidden relative">
                               <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
                               <img 
                                 src={link.pageId === 'products' ? "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20193006.png" : 
                                      link.pageId === 'reishi-decor' ? "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Natural%20Sculpture.mp4" :
                                      "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Nutripet.mp4"
                                     }
                                 className="w-full h-full object-cover opacity-80"
                                 alt="Preview"
                               />
                          </div>
                          <div className="text-[10px] text-stone-400">Explore the premium collection.</div>
                      </div>
                  </div>
              )}
          </div>
      ))}
    </div>
  );
  
  const allNavLinks = [...navLinksRow1, ...navLinksRow2];

  return (
    <>
    <header className="sticky top-0 z-30 px-4 py-2" style={{ backgroundColor: 'var(--bg-primary-translucent, var(--bg-primary))', backdropFilter: 'blur(15px)', borderBottom: '1px solid var(--border-primary)' }}>
       <style>{`
        html.light { --bg-primary-translucent: rgba(255,255,255,0.85); }
        html:not(.light) { --bg-primary-translucent: rgba(10, 25, 47, 0.9); }
      `}</style>
      
      {/* --- Desktop Header --- */}
      <nav className="max-w-7xl mx-auto hidden md:flex items-center justify-between relative min-h-[160px]">
        {/* Left: Large Logo & Text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-start gap-5">
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center gap-6 group">
            <LogoImage />
            <AnimatedLogo />
          </a>
        </div>

        {/* Center: Navigation (Pushed right to accommodate larger logo) */}
        <div className={`flex flex-col items-center justify-center gap-2 nav-container flex-1 px-4 ml-80 lg:ml-96 mr-20 ${language === 'en' || language === 'es' ? 'lang-compact' : ''}`}>
            <a href="#chat" onClick={handleBannerClick} className="cursor-pointer mb-2 transition-transform hover:scale-105">
              <div className="p-1 rounded-lg border" style={{backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-secondary)'}}>
                <img 
                  src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoshakh%20Banner.gif" 
                  alt="Gano Shakh Animated Logo" 
                  className="h-16 w-auto rounded-md" 
                />
              </div>
            </a>
            {renderNavButtons(navLinksRow1)}
            {renderNavButtons(navLinksRow2)}
        </div>

        {/* Right: Actions */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end gap-3">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Voice Search">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>

          <div className="flex items-center gap-3 border-l border-r border-white/10 px-4 mx-2">
            <a href="mailto:ganoshakh@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:opacity-75 transition-opacity"><MailIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://www.instagram.com/ganoshakh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity"><InstagramIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://wa.me/989363797018" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-75 transition-opacity"><WhatsappIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://t.me/+8ETRinn0OhdiNDZk" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:opacity-75 transition-opacity"><TelegramIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)'}} /></a>
          </div>
          <LanguageSwitcher selectedLang={language} onSelectLang={setLanguage} />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <div className="w-px h-6 bg-white/10"></div>
          {user ? (
            <div className="flex items-center gap-2"><span className="text-sm font-medium text-amber-200">{getDisplayName()}</span><button onClick={onLogout} className="text-sm font-medium hover:opacity-80 transition-colors">{t.nav_logout}</button></div>
          ) : ( isSupabaseReady ? ( <button onClick={onLogin} className="text-sm font-medium hover:opacity-80 transition-colors">{t.nav_login}</button> ) : <div className="h-5 w-12 bg-gray-600 animate-pulse rounded"></div> )}
        </div>
      </nav>

      {/* --- Mobile Header --- */}
      <div className="md:hidden flex items-center justify-between h-24">
        <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center gap-3 group">
          <LogoImage className="h-20 w-20" />
          <AnimatedLogo />
        </a>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2" aria-label="Open menu">
          {isMobileMenuOpen ? <CloseIcon className="w-8 h-8" /> : <HamburgerIcon className="w-8 h-8" />}
        </button>
      </div>
    </header>

    {/* --- Mobile Menu (kept as drawer for UX) --- */}
    <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} >
        {/* ... (Styles same as previous) ... */}
         <style>{`
            .mobile-menu-sidebar {
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            [dir="ltr"] .mobile-menu-sidebar { right: 0; transform: translateX(100%); }
            [dir="ltr"] .mobile-menu-sidebar.open { transform: translateX(0); }
            [dir="rtl"] .mobile-menu-sidebar { left: 0; transform: translateX(-100%); }
            [dir="rtl"] .mobile-menu-sidebar.open { transform: translateX(0); }

            .mobile-nav-button {
                position: relative;
                transition: all 0.2s ease-in-out;
            }
            html[dir="ltr"] .mobile-nav-button { text-align: left; }
            html[dir="rtl"] .mobile-nav-button { text-align: right; }

            .mobile-nav-button:hover {
                background-color: var(--bg-card);
                color: var(--text-primary);
            }
            html[dir="ltr"] .mobile-nav-button:hover { transform: translateX(8px); }
            html[dir="rtl"] .mobile-nav-button:hover { transform: translateX(-8px); }

            .mobile-nav-button.active {
                font-weight: 700;
                color: var(--text-primary);
            }
            .mobile-nav-button.active::before {
                content: '';
                position: absolute;
                top: 25%;
                bottom: 25%;
                width: 4px;
                background: linear-gradient(to bottom, var(--text-heading-from), var(--text-heading-to));
                border-radius: 2px;
            }
            [dir="ltr"] .mobile-nav-button.active::before {
                left: 4px; /* Explicitly position indicator on the left for LTR languages */
            }
            [dir="rtl"] .mobile-nav-button.active::before {
                right: 4px; /* Explicitly position indicator on the right for RTL languages */
            }
        `}</style>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
        {/* Sidebar */}
        <div
            className={`mobile-menu-sidebar absolute top-0 h-full w-4/5 max-w-xs shadow-xl flex flex-col ${isMobileMenuOpen ? 'open' : ''}`}
            style={{ backgroundColor: 'var(--bg-primary)' }}
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-primary)'}}>
            <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 group">
                <LogoImage className="h-16 w-16" />
                <AnimatedLogo/>
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2" aria-label="Close menu"><CloseIcon className="w-6 h-6" /></button>
          </div>
          
          <nav className="flex-grow p-4 overflow-y-auto">
              <div className="flex flex-col">
              {allNavLinks.map(link => (
                 <button
                    key={link.pageId}
                    onClick={() => { navigate(link.pageId as Page); setIsMobileMenuOpen(false); }}
                    className={`mobile-nav-button py-3 px-4 rounded-md text-lg ${isCurrent(link.pageId as Page) ? 'active' : ''}`}
                    style={{ color: isCurrent(link.pageId as Page) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    aria-current={isCurrent(link.pageId as Page) ? 'page' : undefined}
                >
                    {link.label}
                </button>
              ))}
              </div>
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'var(--border-primary)'}}>
             <div className="p-2 border rounded-lg" style={{backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-secondary)'}}>
                <div className="flex items-center justify-around">
                    <LanguageSwitcher selectedLang={language} onSelectLang={setLanguage} />
                    <div className="w-px h-8 bg-[var(--border-secondary)]"></div>
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </div>
            </div>
            <div className="mt-4">
                {user ? (
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-lg truncate">{getDisplayName()}</span>
                        <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="font-medium hover:opacity-80 transition-colors p-2">{t.nav_logout}</button>
                    </div>
                ) : (
                    isSupabaseReady ? (
                        <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-3 px-4 rounded-md text-lg transition-colors font-semibold" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)'}}>{t.nav_login}</button>
                    ) : <div className="h-12 w-full bg-gray-600 animate-pulse rounded-md"></div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
