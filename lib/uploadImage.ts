import { supabaseBrowser } from '@/lib/supabase/browser'

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabaseBrowser.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data } = supabaseBrowser.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
