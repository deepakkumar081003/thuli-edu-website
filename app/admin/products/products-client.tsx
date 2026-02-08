'use client'

import { useState } from 'react'
import { uploadProductImage } from '@/lib/supabase/uploadImage'
import { createProduct, updateProduct, deleteProduct } from './actions'
import { useRouter } from 'next/navigation'

export default function ProductsClient({ products }: any) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function handleCreate(formData: any) {
    let imageUrl = null

    if (imageFile) {
      imageUrl = await uploadProductImage(imageFile)
    }

    await createProduct({
      ...formData,
      image_url: imageUrl,
      is_active: true,
    })

    router.refresh()
  }

  async function handleUpdate(id: string, formData: any, oldImage: string) {
    let imageUrl = oldImage

    if (imageFile) {
      imageUrl = await uploadProductImage(imageFile)
    }

    await updateProduct(id, {
      ...formData,
      image_url: imageUrl,
    })

    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    router.refresh()
  }

  return (
    <>
      {/* YOUR PRODUCT GRID HERE */}
      {/* ADD / EDIT / DELETE buttons call above functions */}
    </>
  )
}
