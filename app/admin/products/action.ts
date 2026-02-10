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
  // 1. Fetch existing product
  const { data: existingProduct, error: fetchError } = await supabaseAdmin
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('FETCH PRODUCT ERROR:', fetchError)
    throw new Error(fetchError.message)
  }

  // 2. If new image is provided & old image exists → delete old image
  if (
    data.image_url &&
    existingProduct?.image_url &&
    data.image_url !== existingProduct.image_url
  ) {
    const oldFilePath = existingProduct.image_url.split('/product-images/')[1]

    if (oldFilePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('product-images')
        .remove([oldFilePath])

      if (storageError) {
        console.error('STORAGE DELETE ERROR:', storageError)
        throw new Error(storageError.message)
      }
    }
  }

  // 3. Update product
  const { error: updateError } = await supabaseAdmin
    .from('products')
    .update(data)
    .eq('id', id)

  if (updateError) {
    console.error('UPDATE PRODUCT ERROR:', updateError)
    throw new Error(updateError.message)
  }
}

export async function deleteProduct(id: number) {
  // 1. Fetch product to get image URL
  const { data: product, error: fetchError } = await supabaseAdmin
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('FETCH PRODUCT ERROR:', fetchError)
    throw new Error(fetchError.message)
  }

  // 2. Delete image from storage (if exists)
  if (product?.image_url) {
    /**
     * image_url example:
     * https://xxxx.supabase.co/storage/v1/object/public/product-images/products/abc.jpg
     */
    const filePath = product.image_url.split('/product-images/')[1]

    if (filePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('product-images')
        .remove([filePath])

      if (storageError) {
        console.error('STORAGE DELETE ERROR:', storageError)
        throw new Error(storageError.message)
      }
    }
  }

  // 3. Delete product from DB
  const { error: deleteError } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('DELETE PRODUCT ERROR:', deleteError)
    throw new Error(deleteError.message)
  }
}
