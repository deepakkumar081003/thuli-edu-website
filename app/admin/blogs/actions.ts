'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'

/* ---------------- DELETE BLOG ---------------- */
export async function deleteBlog(id: string) {
  // 1. Fetch blog
  const { data: blog, error: fetchError } = await supabaseAdmin
    .from('blogs')
    .select('cover_image')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('FETCH BLOG ERROR:', fetchError)
    throw new Error(fetchError.message)
  }

  // 2. Delete cover image
  if (blog?.cover_image) {
    const filePath = blog.cover_image.split('/product-images/')[1]

    if (filePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('product-images')
        .remove([filePath])

      if (storageError) {
        console.error('BLOG IMAGE DELETE ERROR:', storageError)
        throw new Error(storageError.message)
      }
    }
  }

  // 3. Delete blog row
  const { error: deleteError } = await supabaseAdmin
    .from('blogs')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('DELETE BLOG ERROR:', deleteError)
    throw new Error(deleteError.message)
  }
}

/* ---------------- UPDATE BLOG ---------------- */
export async function updateBlog(id: string, data: any) {
  // 1. Fetch existing blog
  const { data: existingBlog, error: fetchError } = await supabaseAdmin
    .from('blogs')
    .select('cover_image')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('FETCH BLOG ERROR:', fetchError)
    throw new Error(fetchError.message)
  }

  // 2. If new image → delete old image
  if (
    data.cover_image &&
    existingBlog?.cover_image &&
    data.cover_image !== existingBlog.cover_image
  ) {
    const oldFilePath = existingBlog.cover_image.split('/product-images/')[1]

    if (oldFilePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('product-images')
        .remove([oldFilePath])

      if (storageError) {
        console.error('BLOG IMAGE DELETE ERROR:', storageError)
        throw new Error(storageError.message)
      }
    }
  }

  // 3. Update blog
  const { error: updateError } = await supabaseAdmin
    .from('blogs')
    .update(data)
    .eq('id', id)

  if (updateError) {
    console.error('UPDATE BLOG ERROR:', updateError)
    throw new Error(updateError.message)
  }
}
