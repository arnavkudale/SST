import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Updated with proper before-after image pairs
const transformationPairs = [
  { 
    id: 1, 
    before: "/images/before-after/skin-glow-before.jpg", 
    after: "/images/before-after/skin-glow-after.jpg",
    caption: "Tan Removal"
  },
  { 
    id: 2, 
    before: "/images/before-after/acne-peel-before.jpg", 
    after: "/images/before-after/acne-peel-after.jpg",
    caption: "Acne Peel" 
  },
  { 
    id: 3, 
    before: "/images/before-after/acne-treatment-before.jpg", 
    after: "/images/before-after/acne-treatment-after.jpg",
    caption: "De-pigmentation treatment for the underarm" 
  },
  { 
    id: 4, 
    before: "/images/before-after/lightening-before.jpg", 
    after: "/images/before-after/lightening-after.jpg",
    caption: "Microneedling for pits, acne scars" 
  }
];

const GallerySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        sectionRef.current.querySelector('.section-title'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Animate gallery items
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.gallery-item'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-xl mx-auto text-center mb-12 section-title">
          <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-accent-foreground font-medium mb-2">Before & After</h4>
          <h2 className="font-playfair text-4xl font-semibold text-gray-900 mb-4">Transformation Gallery</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 font-montserrat text-base font-normal text-gray-600">Real transformations from our satisfied clients</p>
        </div>
        
        {/* Gallery Section */}
        <div className="relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-2 right-2 pointer-events-none z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto hover:bg-white transition-all duration-300"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto hover:bg-white transition-all duration-300"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto gallery-scrollbar hide-scrollbar pb-8 px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {transformationPairs.map((pair) => (
              <div key={pair.id} className="flex-shrink-0 gallery-item group">
                <div className="flex gap-3 w-[500px] bg-white p-4 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500">
                  <div className="w-1/2">
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-center mb-2">Before</p>
                    <div className="relative rounded-md overflow-hidden">
                      <AspectRatio ratio={3/4} className="bg-muted">
                        <img 
                          src={pair.before}
                          alt={`Before ${pair.caption}`}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/300x400/pink/white?text=Before";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-center mb-2">After</p>
                    <div className="relative rounded-md overflow-hidden">
                      <AspectRatio ratio={3/4} className="bg-muted">
                        <img 
                          src={pair.after}
                          alt={`After ${pair.caption}`}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/300x400/pink/white?text=After";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="mt-3 text-center group-hover:text-accent-foreground transition-colors duration-300">{pair.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
