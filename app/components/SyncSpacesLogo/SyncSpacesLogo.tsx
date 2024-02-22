'use client'

import { useEffect, useRef, useState } from 'react'

import synImage from '@/public/img/syn.svg'
import spacesImage from '@/public/img/spaces.svg'
import OrcaLogo from '@/app/components/OrcaLogo/OrcaLogo'

interface SyncSpacesLogoProps {
  width: number,
  collapsed: boolean,
}

const SyncSpacesLogo = ({ width, collapsed } : SyncSpacesLogoProps) => {
  const orcaContainerRef = useRef<HTMLDivElement>(null)
  const [orcaTransitioning, setOrcaTransitioning] = useState(false)

  useEffect(() => {
    const transitionstart = () => {
      setOrcaTransitioning(true)
    }

    const transitionend = () => {
      setOrcaTransitioning(false)
    }

    const orcaContainer = orcaContainerRef.current

    orcaContainer?.addEventListener('transitionstart', transitionstart)
    orcaContainer?.addEventListener('transitionend', transitionend)

    return () => {
      orcaContainer?.removeEventListener('transitionstart', transitionstart)
      orcaContainer?.removeEventListener('transitionend', transitionend)
    }
  }, [])

  return (
    <div style={{ width, height: width / 6 }} className='relative'>
      <div style={{ backgroundImage: `url(${synImage.src})`, width: collapsed ? 0 : width / 3, backgroundSize: width / 4, backgroundPosition: collapsed ? width / 2 : 0 }} className='inline-block h-full bg-no-repeat transition-all duration-1000'>
      </div>
      <div style={{ width: width / 6, left: collapsed ? -0.01 * width : width * 0.23, top: width * -0.015, zIndex: orcaTransitioning ? 100 : -1 }} className='absolute inline-block h-full overflow-hidden transition-[left] duration-1000' ref={orcaContainerRef}>
        <OrcaLogo underwater={collapsed} />
      </div>
      <div style={{ backgroundImage: `url(${spacesImage.src})`, width: collapsed ? 0 : width / 3 * 2, backgroundSize: width / 24 * 13 }} className='inline-block h-full bg-no-repeat bg-right transition-all duration-1000'>
      </div>
    </div>
    )
}

export default SyncSpacesLogo
