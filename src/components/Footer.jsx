import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Column 1 - Get to Know Us */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li className="hover:scale-110 transition-transform cursor-pointer">
              About
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Careers
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Blog
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Press Releases
            </li>
          </ul>
        </div>

        {/* Column 2 - Make Money with Us */}
        <div>
          <h3 className="text-white font-semibold mb-3">Make Money with Us</h3>
          <ul className="space-y-2">
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Sell on Our Store
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Affiliate Program
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Advertise Your Products
            </li>
          </ul>
        </div>

        {/* Column 3 - Amazon Payment Products */}
        <div>
          <h3 className="text-white font-semibold mb-3">Payment & Security</h3>
          <ul className="space-y-2">
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Credit & Debit Cards
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Gift Cards
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              EMI Payment Options
            </li>
          </ul>
        </div>

        {/* Column 4 - Let Us Help You */}
        <div>
          <h3 className="text-white font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Customer Support
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Returns & Replacements
            </li>
            <li className="hover:scale-110 transition-transform cursor-pointer">
              Order Tracking
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
        <p>&copy; 2025 YourEcommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
