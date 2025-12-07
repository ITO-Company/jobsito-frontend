import { useEffect, useState } from 'react'

export const useHydrationStatus = () => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    console.log('Hydration effect running - setting isHydrated to true')
    setIsHydrated(true)
  }, [])

  return isHydrated
}
