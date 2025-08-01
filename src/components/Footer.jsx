import kanaraWhite from "../assets/Kanara-white.png";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white px-6 md:px-20 py-12 text-sm md:text-base">
      {/* Top Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Need Help */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Need Help</h3>
          <ul className="space-y-2 text-zinc-300">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-zinc-300">
            <li>About Us</li>
            <li>Collaboration</li>
            <li>Media</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* More Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">More Info</h3>
          <ul className="space-y-2 text-zinc-300">
            <li>Term and Conditions</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <p className="text-zinc-300">
            Surabaya <br />
            Indonesia - 62062
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-700 my-8" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Logo & Contact */}
        <div className="flex items-center gap-4">
          <img src={kanaraWhite} alt="Kanara Logo" className="w-32 md:w-40" />
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-4 text-zinc-300 text-lg">
          <FaInstagram className="cursor-pointer hover:text-white" />
          <FaFacebookF className="cursor-pointer hover:text-white" />
          <BsTwitterX className="cursor-pointer hover:text-white" />
          <FaLinkedinIn className="cursor-pointer hover:text-white" />
        </div>

        {/* App Info */}
        <div className="text-zinc-400 text-sm text-center md:text-right">
          <p>Download The App</p>
          <p>Available on the Google Play & App Store</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-zinc-500 text-xs">
        Copyright © 2025 Ika Nuraisma Folks Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
