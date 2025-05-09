import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <footer className="bg-white border-t-0 py-12 px-4 font-[400]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', height: 1, margin: '0 2rem 2rem 2rem' }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 items-start gap-8 md:gap-0" style={{ position: 'relative' }}>
          {/* Column 1: Logo and description */}
          <div className="flex flex-col items-center text-center md:pr-8 mb-8 md:mb-0 py-6">
            <a href="/">
            <img 
              src="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png" 
              alt="Sally's Soul Therapy Logo" 
                className="mb-6" 
                style={{ width: '130px', maxWidth: '100%', marginTop: '12px', marginBottom: '24px' }}
            />
            </a>
            <p className="text-neutral-500 max-w-xs" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 400 }}>
              Dedicated to enhancing your natural beauty through expert skincare treatments and premium products.
            </p>
          </div>
          {/* Column 2: Policy Links */}
          <div className="flex flex-col items-start md:px-8 space-y-2 text-neutral-700 h-full justify-center my-auto">
            <a href="/privacy-policy" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Privacy Policy</a>
            <a href="/cancellation-and-refund" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Cancellation and Refund</a>
            <a href="/return-policy" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Return Policy</a>
            <a href="/shipping-policy" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Shipping Policy</a>
          </div>
          {/* Column 3: Social Links 1 */}
          <div className="flex flex-col items-start md:px-8 space-y-2 text-neutral-700 py-6">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="mb-3">Follow Our Story</span>
            <a href="https://www.instagram.com/sallyssoultherapy/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Instagram</a>
            <a href="https://www.facebook.com/SallysSoulTherapy?mibextid=2JQ9oc" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Facebook</a>
            <a href="https://www.youtube.com/channel/UCdDi21hV-A_xubFwi1Quyyg" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Youtube</a>
            <a href="https://in.pinterest.com/sallyssoultherapy/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Pinterest</a>
          </div>
          {/* Column 4: Social Links 2 */}
          <div className="flex flex-col items-start md:pl-8 space-y-2 text-neutral-700 py-6">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }} className="mb-3">Available At</span>
            <a href="https://www.amazon.in/s?me=A2IPQ0BT5CGS61&marketplaceID=A21TJRUUN4KGV" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Amazon</a>
            <a href="https://www.flipkart.com/search?q=sally%27s+soul+therapy&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off&as-pos=1&as-type=HISTORY" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Flipkart</a>
            <a href="https://www.nykaa.com/brands/sally-s-soul-therapy/c/68582" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>Nykaa</a>
          </div>
          {/* Vertical dividers for columns (desktop only) */}
          <div className="hidden md:block absolute top-[10%] left-1/4 h-[80%] w-px bg-[#e0e0e0]" style={{ zIndex: 1 }} />
          <div className="hidden md:block absolute top-[10%] left-2/4 h-[80%] w-px bg-[#e0e0e0]" style={{ zIndex: 1 }} />
          <div className="hidden md:block absolute top-[10%] left-3/4 h-[80%] w-px bg-[#e0e0e0]" style={{ zIndex: 1 }} />
        </div>
        <div className="mt-12 pt-8 text-center">
          <p className="text-neutral-400" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 300 }}>&copy; {currentYear} Sally's Soul Therapy. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
