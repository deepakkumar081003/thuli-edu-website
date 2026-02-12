import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
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

    // ✅ Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
    } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment data' }, { status: 400 })
    }

    // ✅ VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // ✅ Optional: Prevent duplicate purchase
    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single()

    if (existing) {
      return NextResponse.json({ message: 'Already purchased' })
    }

    // 🔎 Get actual product price from DB
    const { data: product, error: productError } = await supabase
    .from('products')
    .select('price, discounted_price')
    .eq('id', productId)
    .single()

    if (productError || !product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 400 })
    }

    // Use discounted price if available
    const finalAmount =
    product.discounted_price ?? product.price


    // ✅ Insert into registrations
    const { error } = await supabase
    .from('registrations')
    .insert({
        user_id: user.id,
        product_id: productId,
        status: 'paid',
        payment_status: 'success',
        amount_paid: finalAmount,
        razorpay_order_id,
        razorpay_payment_id,
    })


    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
