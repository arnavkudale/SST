import React from 'react';

interface TestimonialCardProps {
  image: string;
  name: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, testimonial }) => {
  return (
    <div className="testimonial-card bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 flex flex-col md:flex-row gap-8 transition-all duration-500 group">
      <div className="md:w-1/4 flex justify-center md:justify-start">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
          <img 
            src={image} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white relative z-10 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      <div className="md:w-3/4">
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-6xl text-accent/10 font-playfair">"</div>
          <p className="font-playfair text-lg font-normal italic text-gray-700 mb-4 relative z-10 group-hover:text-gray-900 transition-colors duration-300">"{testimonial}"</p>
        </div>
        <p className="font-montserrat text-sm font-medium tracking-wide uppercase text-gray-900 group-hover:text-accent-foreground transition-colors duration-300">{name}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
