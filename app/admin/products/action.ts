'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'

export async function createProduct(data: any) {
  const { error } = await supabaseAdmin
    .from('products')
    .insert(data)

  if (error) {
    console.error('CREATE PRODUCT ERROR:', error)
    throw new Error(error.message)
  }
}

export async function updateProduct(id: number, data: any) {
  const { error } = await supabaseAdmin
    .from('products')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('UPDATE PRODUCT ERROR:', error)
    throw new Error(error.message)
  }
}

export async function deleteProduct(id: number) {
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('DELETE PRODUCT ERROR:', error)
    throw new Error(error.message)
  }
}
