import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#2c1a4b] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-yellow-400 transition">Courses</Link>
            </li>
            <li>
              <Link href="/tuitions" className="hover:text-yellow-400 transition">Tuitions</Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-yellow-400 transition">Blogs</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">THULI – That’s How U Learn It</p>
          <p className="text-gray-300 mb-1">📍 123 Learning Street, Bengaluru, India</p>
          <p className="text-gray-300 mb-1">✉️ info@thuli.com</p>
          <p className="text-gray-300 mb-1">📞 +91 98765 43210</p>

          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 bg-green-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-green-600 transition"
          >
            <FaWhatsapp className="mr-2" /> Chat with us
          </a>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-white text-lg">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-[#421c75] pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} THULI – That’s How U Learn It. All rights reserved.
      </div>
    </footer>
  )
}
