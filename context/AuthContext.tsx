'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
