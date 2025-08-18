'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const RedirectMessage = ({ url }: { url: string }) => {
  const router = useRouter()
  useEffect(() => {
    void router.push(url)
  }, [])
  return null
}
