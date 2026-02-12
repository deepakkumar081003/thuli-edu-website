'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useAuth } from '@/context/AuthContext'

export default function MyTuitions() {
  const { user } = useAuth()
  const [tuitions, setTuitions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchTuitions = async () => {
      const { data, error } = await supabaseBrowser
        .from('registrations')
        .select(`
          id,
          status,
          tuitions (
            id,
            title,
            class_level,
            subject,
            mode,
            timings,
            fees
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .not('tuition_id', 'is', null)

      if (!error) {
        setTuitions(data)
      }

      setLoading(false)
    }

    fetchTuitions()
  }, [user])

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Tuitions</h1>

      {tuitions.length === 0 ? (
        <p>No tuition enrollments yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tuitions.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow">
              <h2 className="font-semibold text-lg">
                {item.tuitions?.title}
              </h2>
              <p>Class: {item.tuitions?.class_level}</p>
              <p>Subject: {item.tuitions?.subject}</p>
              <p>Mode: {item.tuitions?.mode}</p>
              <p>Timings: {item.tuitions?.timings}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
