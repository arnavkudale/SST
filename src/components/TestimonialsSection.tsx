import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: "Kanika Batra",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/07/1-Kanika-Batra-1.jpg",
    testimonial: "Saliemaa, the true guardian of my skin, knows it better than I do. With her miracle night cream and expert care, she's transformed my tired face into something radiant. Sally's Soul Therapy heals both my skin and soul, and I trust her completely."
  },
  {
    id: 2,
    name: "Ranchi Sanghvi",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/07/2-Ranchi-Sanghvi-1.jpg",
    testimonial: "The results were incredible, and the service was highly professional. The team's expertise truly stood out. I highly recommend them for anyone seeking skincare."
  },
  {
    id: 4,
    name: "Ankita Jain",
    image: "https://sallyssoultherapy.com/wp-content/uploads/2024/07/4-Ankita-Jain-1.jpg",
    testimonial: "I had an urgent skincare need before my wedding, and Sally from Soul Therapy provided the perfect treatment for my acne and tanning. Her professionalism and expertise impressed me, and I highly recommend her for all pre-bridal care."
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-accent-foreground font-medium mb-2">Client Stories</h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              image={testimonial.image}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
