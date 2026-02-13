'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'

interface Props {
  productId: string
  title: string
  price: number
}

export default function BuyNowButton({ productId, title, price }: Props) {
  const router = useRouter()
  const { user } = useAuth()

  const handleBuyNow = async () => {

    // 🚨 STEP 1: Check if user is logged in
    if (!user) {
      alert('Please login to continue')
      router.push('/login')   // redirect to login page
      return
    }

    // ✅ If logged in → continue payment
    try {
      const res = await fetch('/api/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: price }),
})

if (!res.ok) {
  alert('Failed to create order')
  return
}

const order = await res.json()

const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: 'INR',
  name: title,
  order_id: order.id,
  handler: async function (response: any) {

  const verifyRes = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      productId
    })
  })

  if (!verifyRes.ok) {
    alert('Payment verification failed')
    return
  }

  router.push('/my-dashboard/my-courses')
}

}

      const razor = new (window as any).Razorpay(options)
      razor.open()

    } catch (err) {
      console.error(err)
      alert('Payment failed')
    }
  }

  return (
    <button
      onClick={handleBuyNow}
className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
    >
      Buy Now
    </button>
  )
}
