import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 flex flex-col">
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <Header />
    </div>
    <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 mt-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 400 }}>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">Shipping Policy</h1>
        <section className="space-y-6 text-xs md:text-sm text-gray-700">
          <p>We ship all over India.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">DELIVERY PROCESS</h2>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>Once our system processes your order, your products are inspected thoroughly to ensure they are in a perfect condition.</li>
            <li>After they pass through the final round of quality check, they are packed and handed over to our trusted delivery partner.</li>
            <li>Our delivery partners then bring the package to you at the earliest possible. In case, they are unable to reach your provided address or at a suitable time, they will contact you to resolve the issue.</li>
          </ul>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">DISPATCHING ORDERS:</h2>
          <p>We ensure your orders are dispatched within 3-4 working days and delivered between 5-7 working days.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">ORDER NON-DELIVERY:</h2>
          <p>In case your order is not delivered and the courier company marks it as delivered, please get in touch with us within 24hrs of them marking it as delivered. We will then take it up with the courier company for you.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPolicy; 