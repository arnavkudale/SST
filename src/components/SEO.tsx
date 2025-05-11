import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Sally's Soul Therapy - Holistic Wellness & Beauty",
  description = "Experience holistic wellness and beauty treatments at Sally's Soul Therapy. Professional services for mind, body, and soul.",
  image = "https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png",
  url = "https://sst-63bzwpi69-arnavs-projects-6df1e318.vercel.app",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Sally's Soul Therapy",
    "image": image,
    "description": description,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Su 09:00-18:00",
    "telephone": "+1-XXX-XXX-XXXX"
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Open Graph Meta Tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 