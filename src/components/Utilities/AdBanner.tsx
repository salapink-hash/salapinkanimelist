'use client'
import { useEffect, useRef } from 'react'

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bannerRef.current) return
    const containerId = 'container-242b64bf9733986a9c56bd1758462e20'
    const existing = bannerRef.current.querySelector(`script[src*="242b64bf9733986a9c56bd1758462e20"]`)
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://pl31251354.profitableratecpmnetwork.com/242b64bf9733986a9c56bd1758462e20/invoke.js'
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      bannerRef.current.appendChild(script)
    }
  }, [])

  return (
    <div className="container" style={{ textAlign: 'center', margin: '2rem auto', minHeight: '90px' }}>
      <div id="container-242b64bf9733986a9c56bd1758462e20" ref={bannerRef} />
    </div>
  )
}

