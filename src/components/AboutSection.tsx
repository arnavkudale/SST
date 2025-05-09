import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 fade-in">
              <img 
                src="https://sallyssoultherapy.com/wp-content/uploads/2024/07/IMG_7521-e1721389626640-469x1024.jpg" 
                alt="Ms. Saliemaa Lalani" 
                className="shadow-xl max-w-full mx-auto md:mx-0 h-auto max-h-[500px] object-cover" 
              />
            </div>
            <div className="md:w-1/2 fade-in text-center md:text-left">
              <h4 className="text-accent-foreground font-medium mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>About Founder</h4>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '0.01em' }}>Ms. Saliemaa Lalani</h2>
              <div className="w-16 h-1 bg-accent mb-4 mx-auto md:mx-0"></div>
              <h3 className="font-playfair text-lg font-normal italic mb-6" style={{ color: '#b91c1c' }}>
                – The Skin Magician, the heart and soul behind Sally's Soul Therapy!
              </h3>
              <p className="font-montserrat text-base text-gray-700 leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                With over 15 years of experience in skincare and aesthetics, Saliemaa Lalani has established herself as a trusted name in the beauty industry. Her holistic approach to skin health combines traditional wisdom with modern techniques, delivering transformative results that have earned her a devoted following.
              </p>
              <p className="font-montserrat text-base text-gray-700 leading-relaxed" style={{ fontWeight: 300 }}>
                At Sally's Soul Therapy, we believe in treating not just your skin but nurturing your soul as well. Our personalized approach ensures that every client receives care that addresses their unique needs, helping them achieve their best skin and boosted confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
