import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 mt-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <section className="space-y-6 text-xs md:text-sm font-montserrat text-gray-700">
          <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from sallyssoultherapy.com (the "Site").</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Personal information we collect</h2>
          <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".</p>
          <p>We collect Device Information using the following technologies:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">allaboutcookies.org</a>.</li>
            <li>"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
            <li>"Web beacons", "tags", and "pixels" are electronic files used to record information about how you browse the Site.</li>
          </ul>
          <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit/debit card numbers, UPI, Paytm, email address, and phone number. We refer to this information as "Order Information".</p>
          <p>When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">How do we use your personal information?</h2>
          <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Communicate with you;</li>
            <li>Screen our orders for potential risk or fraud; and</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
          </ul>
          <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Sharing your personal Information</h2>
          <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use WordPress to power our online store- We also use Google Analytics to help us understand how our customers use the Site - you can read more about how Google uses your Personal Information <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">here</a>. You can also opt-out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">here</a>.</p>
          <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Behavioural advertising</h2>
          <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative's ("NAI") educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">networkadvertising.org</a>.</p>
          <p>You can opt out of targeted advertising by using the links below:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">Facebook</a></li>
            <li><a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">Google</a></li>
            <li><a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">Bing</a></li>
          </ul>
          <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance's opt-out portal at: <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-700 transition-colors">optout.aboutads.info</a>.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Do not track</h2>
          <p>Please note that we do not alter our Site's data collection and use practices when we see a Do Not Track signal from your browser.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Data retention</h2>
          <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
          <h2 className="font-playfair text-lg font-semibold text-gray-800 mt-8 mb-2">Changes</h2>
          <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy; 