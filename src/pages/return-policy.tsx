import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReturnPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 flex flex-col">
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <Header />
    </div>
    <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 mt-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 400 }}>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">Return Policy</h1>
        <section className="space-y-6 text-xs md:text-sm text-gray-700">
          <p>Thank you for shopping with Sally's Soul Therapy. We strive to provide the best products and services to our customers. To maintain the quality and integrity of our offerings, we have established a <span className="font-semibold">No Exchange and No Return Policy</span>. Please read this policy carefully before making a purchase.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Policy Details</h2>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>
              <span className="font-semibold">No Exchanges:</span> We do not offer exchanges for any products purchased through our website. Please make your selections carefully and review your order before completing your purchase.
            </li>
            <li>
              <span className="font-semibold">No Returns:</span> All sales are final. We do not accept returns for any products once they have been shipped. This policy helps us maintain the highest standards of quality control and ensures that all customers receive new, unused products.
            </li>
            <li>
              <span className="font-semibold">Order Cancellations:</span> Orders cannot be cancelled once they have been processed and shipped. If you need to cancel an order, please contact our Customer Service immediately after placing your order. We will do our best to accommodate your request, but cannot guarantee cancellation.
            </li>
          </ul>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Contact Information</h2>
          <p>For any inquiries regarding this policy, please contact our Customer Service team at <a href="mailto:sallyssoultherap@gmail.com" className="text-red-500 hover:text-red-700 underline">sallyssoultherap@gmail.com</a> or call us at <a href="tel:+919820282429" className="text-red-500 hover:text-red-700 underline">+91 98202 82429</a>.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Changes to This Policy</h2>
          <p>We reserve the right to update or modify this No Exchange and No Return Policy at any time without prior notice. Any changes will be posted on this page, and it is your responsibility to review this policy periodically.</p>
          <p className="text-center">By completing your purchase, you acknowledge that you have read, understood, and agreed to this No Exchange and No Return Policy.</p>
          <p className="text-center mt-8">Thank you for your understanding and cooperation.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy; 