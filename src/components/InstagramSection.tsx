import React from 'react';

const instaImages = [
  {
    id: 1,
    src: "https://sallyssoultherapy.com/wp-content/uploads/sb-instagram-feed-images/491895563_18479599900065734_9127693262256984270_nfull.webp",
    link: "https://www.instagram.com/p/DJEmF4XtMFm/"
  },
  {
    id: 2,
    src: "https://sallyssoultherapy.com/wp-content/uploads/sb-instagram-feed-images/494070386_1729749701225449_1861053981224676630_nfull.webp",
    link: "https://www.instagram.com/reel/DJB6X7zzOj7/"
  },
  {
    id: 3,
    src: "https://sallyssoultherapy.com/wp-content/uploads/sb-instagram-feed-images/491464489_18478751584065734_4641213403074745429_nfull.webp",
    link: "https://www.instagram.com/reel/DI3efz-Tqoy/"
  },
  {
    id: 4,
    src: "https://sallyssoultherapy.com/wp-content/uploads/sb-instagram-feed-images/491464319_956473659710795_7467351849625804911_nfull.webp",
    link: "https://www.instagram.com/reel/DI032v1tyIr/"
  },
  {
    id: 5,
    src: "https://sallyssoultherapy.com/wp-content/uploads/sb-instagram-feed-images/491415209_539744705582849_7349401875757291958_nfull.webp",
    link: "https://www.instagram.com/reel/DIybI5fzhUq/"
  }
];

const InstagramSection = () => {
  return (
    <section id="instagram" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="text-accent-foreground font-medium mb-2">Stay Connected</h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Follow On Instagram</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          
          <a href="https://www.instagram.com/sallyssoultherapy/" target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
            <img 
              src="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo.png" 
              alt="SallysSoulTherapy Instagram" 
              className="mx-auto h-16" 
            />
          </a>
          
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Book your Appointment, Shop our Curated Skincare Products, and Join the #SallysSoulTribe for Glowing Transformation!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {instaImages.map((image) => (
            <a 
              key={image.id}
              href={image.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={`Instagram Post ${image.id}`} 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01M16 12h.01M20 12h.01M4 12h.01M8 12h.01" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://www.instagram.com/sallyssoultherapy/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent-foreground hover:underline font-medium"
          >
            @sallyssoultherapy
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
