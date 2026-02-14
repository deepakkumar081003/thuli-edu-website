'use client' // ⚠️ This makes it a Client Component

import React, { useRef } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  slug: string
  title: string
  short_description?: string
  image_url: string
}

interface CoursesCarouselProps {
  products: Product[]
}

export default function CoursesCarousel({ products }: CoursesCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-700 text-white rounded-full p-3 hover:bg-purple-900 shadow-lg"
        onClick={scrollLeft}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-700 text-white rounded-full p-3 hover:bg-purple-900 shadow-lg"
        onClick={scrollRight}
      >
        ›
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden py-2 px-4 scroll-smooth hide-scrollbar"
      >
        {products.map((p) => (
          <Link
  key={p.id}
  href={`/products/${p.slug}`}
className="flex-none w-[90%] sm:w-[320px] lg:w-80 h-[360px] sm:h-[340px]"
>
  <div
    className="group relative rounded-3xl p-[1px] 
               bg-gradient-to-br from-purple-400/40 via-transparent to-purple-700/40
               hover:from-purple-500/60 hover:to-purple-800/60
               transition-all duration-500"
  >
    <div
      className="group relative bg-white/90 backdrop-blur-md 
           rounded-3xl p-5 h-full flex flex-col
           shadow-lg hover:shadow-2xl active:shadow-2xl
           transition-all duration-500
           group-hover:-translate-y-2 active:-translate-y-2"

    >

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={p.image_url}
          alt={p.title}
          className="w-full h-52 object-cover 
           transition-transform duration-700 
           group-hover:scale-110 active:scale-110"

        />

        {/* Bottom fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/30 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 
                        transition duration-500" />

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full 
                        bg-gradient-to-r from-transparent via-white/40 to-transparent
                        group-hover:translate-x-full 
                        transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Space */}
      <div className="flex-grow" />

      {/* Title */}
      <div className="pt-6 text-center h-[56px] flex items-center justify-center">
        <h3 className="text-purple-900 font-semibold text-lg tracking-wide 
               group-hover:text-purple-700 transition
               line-clamp-2">
  {p.title}
</h3>

      </div>

    </div>
  </div>
</Link>


        ))}
      </div>
    </div>
  )
}
