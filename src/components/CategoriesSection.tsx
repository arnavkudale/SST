import React from 'react';

const categories = [
  {
    id: 1,
    name: "DULLNESS",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/dull-and-tired-skin-qvy6rrh4lxe4mvgztozp8oxlbdc1zlgwf8e2vmgx2o.png",
    link: "https://sallyssoultherapy.com/index.php/dullness-treatment-products/"
  },
  {
    id: 2,
    name: "ACNE",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/Acne-Acne-Scars-qvxrnqfx1wnozppckj943z5byys6y5poajh3i93ucw.jpg",
    link: "https://sallyssoultherapy.com/index.php/acne-and-acne-scars-products/"
  },
  {
    id: 3,
    name: "PIGMENTATION",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/Pigmentation-qvxrnzu7aon9dsuhswpvgo8ussuz3v3u0g8futa8jc.jpg",
    link: "https://sallyssoultherapy.com/index.php/pigmentation-products/"
  },
  {
    id: 4,
    name: "DRYNESS",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/Dryness-qvxro98ouldffwy1irdnhuejuo7j83sb14it3sbywg.jpg",
    link: "https://sallyssoultherapy.com/index.php/dryness-products/"
  },
  {
    id: 5,
    name: "ANTI-AGING",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/Anti-Aging-e1719835916868-qvxrohp8k3p0celr5d1ama9p751u5dpw2ae6f9zfcg.jpg",
    link: "https://sallyssoultherapy.com/index.php/anti-aging/"
  },
  {
    id: 6,
    name: "DARK CIRCLES",
    image: "https://sallyssoultherapy.com/wp-content/uploads/elementor/thumbs/Dark-Circles-qvy6rg72bwyorjxdnk46ers26qvnf884dok94axn5c.png",
    link: "https://sallyssoultherapy.com/index.php/dark-circles-products/"
  }
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-accent-foreground font-medium mb-2">Personalized Skincare Diagnosis</h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tell Us Your Main Concern</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-full min-w-[120px] w-40 bg-white border-2 border-gray-300 hover:border-black hover:shadow-md transition-all duration-200"
            >
              <img src={category.image} alt={category.name} className="w-7 h-7 rounded-full object-cover" />
              <span className="font-light text-xs">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
