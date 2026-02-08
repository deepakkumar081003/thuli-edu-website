'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import LogoutButton from '@/components/LogoutButton'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#2c1a4b] text-white px-6 md:px-10 py-4 flex justify-between items-center shadow-md z-50">
      
      {/* Logo */}
      <h1 className="text-3xl font-serif font-bold tracking-wide">
        THULI <span className="text-yellow-400 text-sm font-normal">- That's How U Learn It</span>
      </h1>

      {/* Hamburger Icon - mobile only */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={toggleMenu}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Links */}
      <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 md:text-lg md:font-medium md:tracking-wide absolute md:static top-full left-0 w-full md:w-auto bg-[#2c1a4b] md:bg-transparent transition-all duration-300 overflow-hidden md:overflow-visible
        ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0'}`}
      >
        <Link href="/" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Home</Link>
        <Link href="/about" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">About</Link>
        <Link href="/products" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Courses</Link>
        <Link href="/solutions" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Solutions</Link>
        <Link href="/tuitions" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Tuitions</Link>
        <Link href="/blogs" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Blogs</Link>
        <Link href="/contact" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Contact</Link>

        {!user && (
          <>
            <Link href="/register" className="block md:inline-block px-4 py-2 text-yellow-400 font-semibold hover:text-white transition-colors">
              Register
            </Link>
            <Link href="/login" className="block md:inline-block px-4 py-2 hover:text-yellow-400 transition-colors">Login</Link>
          </>
        )}

        {user && <LogoutButton />}
      </div>
    </nav>
  )
}
