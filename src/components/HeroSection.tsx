import * as React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [scrollIndicator, setScrollIndicator] = React.useState({ y: 0, opacity: 1 });

  React.useEffect(() => {
    // Fade in the video smoothly after it's loaded
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('loadeddata', () => {
        video.classList.add('opacity-100');
      });
    }
  }, []);

  // Animate scroll indicator
  React.useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 0.5; // fade out over first half viewport
      const y = Math.min(window.scrollY, maxScroll);
      const opacity = 1 - y / maxScroll;
      setScrollIndicator({
        y: y * 0.6, // move up a bit slower than scroll
        opacity: Math.max(0, opacity)
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle play/pause
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video container from navbar to bottom of viewport */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full min-w-full min-h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-1500"
          poster="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png"
        >
          <source src="/sst-hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content over the video, scrolls normally */}
      <div className="relative z-10 h-full flex items-end">
        <div className="flex items-center gap-3 mb-10 ml-4 sm:ml-10 animate-slide-in-left">
          {/* Smaller Pause/Play button */}
          <button
            onClick={handlePlayPause}
            className="bg-white bg-opacity-80 rounded-full border border-black w-9 h-9 flex items-center justify-center shadow-lg transition hover:scale-105"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            style={{ pointerEvents: 'auto' }}
          >
            {isPlaying ? (
              // Pause icon
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="7" width="4" height="18" rx="1.5" fill="#111" />
                <rect x="20" y="7" width="4" height="18" rx="1.5" fill="#111" />
              </svg>
            ) : (
              // Play icon
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15" stroke="#111" strokeWidth="2" fill="white" />
                <polygon points="13,10 24,16 13,22" fill="#111" />
              </svg>
            )}
          </button>
          <Button size="sm" className="hero-btn-primary px-6 py-2 text-sm font-medium" asChild>
            <a href="https://forms.gle/it7xbW6cCuSpFR498" target="_blank" rel="noopener noreferrer">
              BOOK NOW
            </a>
          </Button>
        </div>
      </div>
      {/* Scroll Down Indicator */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center select-none"
        style={{
          bottom: '32px',
          opacity: scrollIndicator.opacity,
          transform: `translate(-50%, -${scrollIndicator.y}px)`,
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: scrollIndicator.opacity === 0 ? 'none' : 'auto',
          zIndex: 20
        }}
      >
        <span
          className="text-white text-xs font-thin tracking-widest mb-1"
          style={{
            fontFamily: 'Montserrat, Lato, Arial, sans-serif',
            letterSpacing: '0.18em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            fontWeight: 100
          }}
        >
          SCROLL DOWN
        </span>
        <svg className="scroll-arrow" width="38" height="18" viewBox="0 0 38 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="4,4 19,15 34,4" stroke="white" strokeWidth="1.5" fill="none" />
          <polyline points="10,8 19,15 28,8" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      {/* White section that slides up */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform rotate-2 scale-110 -z-10"></div>
    </section>
  );
};

export default HeroSection;
