import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
        <Header />
      </div>
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 mt-2">
        <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">Cancellation and Refund Policy</h1>
          <section className="space-y-6 text-xs md:text-sm font-montserrat text-gray-700">
            <p className="italic text-center">We appreciate your trust in our products/services. Please read this cancellation and refund policy carefully before making a purchase. By making a purchase or using our services, you agree to abide by the terms outlined below.</p>
            <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Refund Policy:</h2>
            <ol className="list-decimal list-inside space-y-3 mb-6">
              <li>
                <span className="font-semibold">No Refunds:</span> We do not offer refunds or returns for any products or services purchased through our website. This includes but is not limited to digital products, memberships, subscriptions, or any other services provided by Sally's Soul Therapy.
              </li>
              <li>
                <span className="font-semibold">Non-Refundable Items:</span> All sales are final. We do not accept returns or provide refunds for any reason, including but not limited to dissatisfaction with the product/service, change of mind, or technical issues.
              </li>
            </ol>
            <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Policy Updates:</h2>
            <p>We reserve the right to modify, amend, or update this cancellation and refund policy at any time without prior notice. Any changes will be effective immediately upon posting on this page. It is your responsibility to review this policy periodically for updates.</p>
            <p className="text-center">By using our website and purchasing our products/services, you acknowledge that you have read, understood, and agreed to abide by the terms of this cancellation and refund policy.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationAndRefund; 