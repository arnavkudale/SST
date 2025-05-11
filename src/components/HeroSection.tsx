import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const HeroSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [scrollIndicator, setScrollIndicator] = React.useState({ y: 0, opacity: 1 });
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadVideo = async () => {
      try {
        if (!videoRef.current) return;

        const video = videoRef.current;
        
        // Set loading state
        if (isMounted) setIsLoading(true);

        // Wait for video to be loaded
        await new Promise((resolve, reject) => {
          video.addEventListener('loadeddata', resolve, { once: true });
          video.addEventListener('error', reject, { once: true });
        });

        // Fade in video
        if (isMounted) {
          video.classList.add('opacity-100');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading video:', error);
        if (isMounted) {
          setVideoError(true);
          setIsLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  // Animate scroll indicator
  React.useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 0.5;
      const y = Math.min(window.scrollY, maxScroll);
      const opacity = 1 - y / maxScroll;
      setScrollIndicator({
        y: y * 0.6,
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
    <section className="relative h-screen overflow-hidden" aria-label="Hero section with background video">
      {/* Video container from navbar to bottom of viewport */}
      <div className="absolute inset-0 w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <Loader2 className="w-12 h-12 text-white animate-spin" aria-label="Loading video" />
          </div>
        )}
        {videoError ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png)`
            }}
            aria-label="Fallback background image"
          />
        ) : (
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className="w-full h-full min-w-full min-h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-1500"
            poster="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png"
            aria-label="Background video"
          >
            <source 
              src="https://res.cloudinary.com/dqcsmhanc/video/upload/v1746808773/sst-hero-bg-optimized_dvdgnl.mp4" 
              type="video/mp4"
            />
            <source 
              src="https://res.cloudinary.com/dqcsmhanc/video/upload/v1746808773/sst-hero-bg-optimized_dvdgnl.webm" 
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        )}
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
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="8" y="7" width="4" height="18" rx="1.5" fill="#111" />
                <rect x="20" y="7" width="4" height="18" rx="1.5" fill="#111" />
              </svg>
            ) : (
              // Play icon
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
        role="navigation"
        aria-label="Scroll down indicator"
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
        <svg className="scroll-arrow" width="38" height="18" viewBox="0 0 38 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
