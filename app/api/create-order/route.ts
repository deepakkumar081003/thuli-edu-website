import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    // ✅ Create Supabase server client
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // ✅ Check logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ✅ Get amount from request
    const { amount } = await req.json()

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      )
    }

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)

  } catch (error) {
    console.error('Razorpay Error:', error)

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
