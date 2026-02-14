'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useAuth } from '@/context/AuthContext'

export default function MyProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabaseBrowser
        .from('profiles')
        .select('full_name, phone, role, email')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setProfile(data)
        setFullName(data.full_name || '')
        setPhone(data.phone || '')
      }

      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const handleUpdate = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabaseBrowser
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone,
      })
      .eq('id', user.id)

    if (!error) {
      setProfile({ ...profile, full_name: fullName, phone })
      setIsEditing(false)
    }

    setSaving(false)
  }

  if (loading)
    return (
      <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <p className="text-purple-700 font-semibold text-lg">Loading...</p>
      </div>
    )

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3">
          My Profile
        </h1>
        <p className="text-yellow-400 text-lg">
          View your account details
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-10 max-w-2xl relative">

        <div className="space-y-6">

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-xl font-semibold text-purple-900">
              {profile?.full_name || 'Not provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-xl font-semibold text-purple-900">
              {profile?.phone || 'Not provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-xl font-semibold text-purple-900">
              {profile?.email || 'Not provided'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-xl font-semibold text-purple-900 capitalize">
              {profile?.role || 'student'}
            </p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-purple-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">
              Edit Profile
            </h2>

            <div className="space-y-4">

              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 rounded-full border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400 opacity-10 rounded-full"></div>

    </section>
  )
}
