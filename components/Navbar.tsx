'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import LogoutButton from '@/components/LogoutButton'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from 'next/image'


export default function Navbar() {
  const { user, profile, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#2c1a4b] text-white px-6 md:px-12 py-4 flex justify-between items-center shadow-md z-50 font-sans">

  {/* Logo */}
  
  {/* Logo */}
<Link href="/" className="flex items-center gap-3">
  <Image
    src="https://bwjsxfbamnvzzrfpcyiq.supabase.co/storage/v1/object/public/product-images/elements/Logo.png"
    alt="THULI Logo"
    width={120}
    height={40}
    priority
    className="h-8 lg:h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
  />

  <div className="leading-tight">
    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
      THULI
    </h1>
    <span className="block text-yellow-400 text-xs md:text-sm font-medium">
      That's How U Learn It
    </span>
  </div>
</Link>
  
  {/* Mobile Menu Button */}
  <button
    className="lg:hidden text-2xl focus:outline-none"
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <HiX /> : <HiMenu />}
  </button>

  {/* Links */}
  <div
  className={`
    flex flex-col
    lg:flex lg:flex-row lg:items-center lg:gap-6
    absolute lg:static top-full left-0 w-full lg:w-auto
    bg-[#2c1a4b] lg:bg-transparent
    transition-all duration-300 ease-in-out
    ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0 overflow-hidden'}
    lg:max-h-full lg:overflow-visible lg:py-0
    text-sm lg:text-[15px] font-medium
  `}
>


    {user && profile?.role === 'student' && (
      <Link
        href="/my-dashboard"
        onClick={closeMenu}
        className="px-4 py-2 hover:text-yellow-400 transition"
      >
        My Dashboard
      </Link>
    )}

    {[
  ['/', 'Home'],
  ['/about', 'About'],
  ['/products', 'Courses'],
    ['/tuitions', 'Tuitions'],
  ['/solutions', 'Solutions'],

  ['/blogs', 'Blogs'],
  ['/contact', 'Contact'],
].map(([href, label]) => (
  <Link
    key={href}
    href={href}
    onClick={closeMenu}
    className="px-4 py-2 hover:text-yellow-400 transition-colors duration-200"
  >
    {label}
  </Link>
))}


    


    {!user && (
      <>
        <Link
          href="/login"
          onClick={closeMenu}
          className="px-4 py-2 hover:text-yellow-400 transition"
        >
          Login
        </Link>
      </>
    )}

    {/* Admin Dashboard */}
    {!loading && user && profile?.role === 'admin' && (
      <Link
        href="/admin"
        onClick={closeMenu}
        className="px-4 py-2 hover:text-yellow-400 transition"
      >
        Dashboard
      </Link>
    )}

    {user && <LogoutButton onLogout={closeMenu} />}
  </div>
</nav>

  )
}
