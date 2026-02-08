'use client' // ⚠️ This makes it a Client Component

import React, { useRef } from 'react'

interface Product {
  id: number
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
        <div
          key={p.id}
          className="flex-none w-80 h-72 rounded-xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer bg-white flex flex-col"
        >
          <img
            src={p.image_url}
            alt={p.title}
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <div className="p-4 mt-auto text-center">
            <h3 className="text-purple-900 font-semibold text-lg">{p.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
)


}
