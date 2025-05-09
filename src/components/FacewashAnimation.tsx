import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FacewashAnimation = () => {
  const bottleRef = useRef(null);
  const foamRef = useRef(null);
  const bubblesRef = useRef(null);

  useEffect(() => {
    const bottle = bottleRef.current;
    const foam = foamRef.current;
    const bubbles = bubblesRef.current;

    // Create bubbles
    const createBubbles = () => {
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubbles.appendChild(bubble);
      }
    };

    createBubbles();

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bottle,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    });

    // Bottle pump animation
    tl.to(bottle, {
      y: -20,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to(foam, {
      scaleY: 1.2,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(bubbles, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(bottle, {
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to(foam, {
      scaleY: 1,
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(bubbles, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    // Animate individual bubbles
    gsap.utils.toArray('.bubble').forEach((bubble: any) => {
      gsap.to(bubble, {
        y: -100,
        x: gsap.utils.random(-50, 50),
        opacity: 0,
        duration: gsap.utils.random(1, 2),
        repeat: -1,
        ease: 'power1.out',
        delay: gsap.utils.random(0, 1)
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <div ref={bottleRef} className="relative w-32 h-64">
        {/* Bottle */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300">
          {/* Bottle cap */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-300 rounded-t-lg" />
          {/* Pump */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-blue-400 rounded-t-lg" />
        </div>
        
        {/* Foam */}
        <div 
          ref={foamRef} 
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full opacity-0"
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Bubbles container */}
        <div 
          ref={bubblesRef} 
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 opacity-0"
        />
      </div>
    </div>
  );
};

export default FacewashAnimation; 