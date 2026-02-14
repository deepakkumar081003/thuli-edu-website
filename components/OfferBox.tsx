'use client'

import { useState } from 'react'
import BuyNowButton from './BuyNowButton'

interface Props {
  course: any
  registrations: { product_id: string; mode: 'online' | 'one_on_one' }[]
}

export default function OfferBox({ course, registrations }: Props) {
  const [mode, setMode] = useState<'online' | 'one_on_one'>('one_on_one')

  const price =
    mode === 'online'
      ? course.discounted_price != null && course.discounted_price > 0
        ? course.discounted_price
        : course.price
      : course.one_on_one_discount_price != null && course.one_on_one_discount_price > 0
        ? course.one_on_one_discount_price
        : course.one_on_one_price

  const originalPrice = mode === 'online' ? course.price : course.one_on_one_price

  const discountPercent =
    price && originalPrice && price < originalPrice
      ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
      : null

  // Short descriptions
  const description =
    mode === 'online'
      ? 'Learn at your own pace with structured course content.'
      : 'Get personalized guidance, instant doubt solving, and faster skill mastery.'

  // Highlights for One-on-One
  const oneOnOneHighlights = [
    '🎯 Personalized Learning',
    '💡 Direct Mentor Feedback',
    '⏱ Flexible Timing',
  ]

  const isAlreadyPurchasedForMode = registrations?.some(
    r => r.product_id === course.id && r.mode === mode
  )

  return (
    <div className="mb-8 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 rounded-3xl p-6 shadow-lg">
      {/* Toggle */}
      <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-2 mb-4">
        <button
          onClick={() => setMode('online')}
          className={`px-4 py-2 rounded-full font-semibold shadow w-full sm:w-auto text-center ${
            mode === 'online' ? 'bg-purple-700 text-white' : 'bg-white text-purple-700'
          }`}
        >
          Online
        </button>
        <button
          onClick={() => setMode('one_on_one')}
          className={`px-4 py-2 rounded-full font-semibold shadow flex items-center justify-center gap-1 w-full sm:w-auto text-center ${
            mode === 'one_on_one' ? 'bg-purple-700 text-white scale-105' : 'bg-white text-purple-700'
          }`}
        >
          One-on-One
          <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full font-bold">Premium</span>
        </button>
      </div>

      {/* Heading & description */}
      <p className="font-bold text-lg text-purple-900 mb-2">
        ⚡ {mode === 'online' ? 'Online Offer Active' : 'One-on-One Premium'}
      </p>
      <p className="text-gray-700 text-sm mb-2">{description}</p>

      {/* Highlights */}
      {mode === 'one_on_one' && (
        <ul className="list-disc list-inside text-sm text-purple-800 mb-3">
          {oneOnOneHighlights.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      {/* Price */}
      {price && (
        <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
          <span className="bg-green-100 px-5 py-2 rounded-full text-green-700 font-extrabold text-xl shadow">
            ₹{price}
          </span>
          {discountPercent && (
            <>
              <span className="text-gray-400 line-through text-lg font-semibold">{originalPrice}</span>
              <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      )}

      {/* Buy Now */}
      {isAlreadyPurchasedForMode ? (
        <div className="flex justify-center my-6">
          <div className="bg-green-100 border border-green-300 text-green-800 px-8 py-4 rounded-2xl font-semibold shadow">
            ✅ Already Purchased ({mode === 'online' ? 'Online' : 'One-on-One'})
          </div>
        </div>
      ) : (
        <div className="flex justify-center scale-[1.08] mb-4">
          <BuyNowButton productId={course.id} title={course.title} price={price} mode={mode} />
        </div>
      )}

      {/* Trust tags */}
      <div className="flex flex-wrap justify-center gap-3 text-sm text-purple-800">
        {mode === 'online' ? (
          <>
            <span className="bg-white px-4 py-2 rounded-full shadow">✅ Gain Skills</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">💻 Group Sessions</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">📚 Structured Content</span>
          </>
        ) : (
          <>
            <span className="bg-white px-4 py-2 rounded-full shadow">✅ Individual Projects</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">🧑‍🏫 Personal Mentor</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">⏱ Flexible Timing</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">🚀 Faster Progress</span>
            <span className="bg-white px-4 py-2 rounded-full shadow">💡 Personalized Content</span>
          </>
        )}
      </div>
    </div>
  )
}
