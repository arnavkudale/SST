import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Facewash3D = () => {
  const bottleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottleRef.current && containerRef.current) {
      // Enhanced 3D rotation with smoother easing
      gsap.fromTo(
        bottleRef.current,
        { 
          rotationY: 0,
          opacity: 0.8,
          scale: 0.95
        },
        {
          rotationY: 50,
          opacity: 1,
          scale: 1,
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1.5,
            toggleActions: 'play none none reverse'
          },
          ease: 'power2.inOut'
        }
      );

      // Subtle floating animation
      gsap.to(bottleRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div
        ref={bottleRef}
        style={{ perspective: '1000px', width: 260, height: 400 }}
        className="mx-auto relative z-10"
      >
        <img
          src="/facewash-bottle.png"
          alt="Facewash Bottle"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500"
          style={{ zIndex: 2, position: 'relative' }}
        />
      </div>
    </div>
  );
};

export default Facewash3D; 