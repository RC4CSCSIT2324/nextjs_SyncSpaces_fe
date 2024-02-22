'use client'

import { useEffect, useRef, useState } from 'react'

import classnames from 'classnames/bind'
import Image from 'next/image'

import orca from '@/public/img/orca.png'

import styles from './OrcaLogo.module.scss'

let cx = classnames.bind(styles)

interface OrcaLogoProps {
  underwater: boolean,
}

const OrcaLogo = ({ underwater } : OrcaLogoProps) => {
  // needed to prevent animation during initial render
  const initialRender = useRef(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else setAnimate(true)
  }, [underwater])

  return (
    <div className={cx('container', { underwater, animate })}>
      <Image className={cx('orca')} src={orca} alt="orca logo" />
      <div className={cx('waves')}></div>
      <div className={cx('water')}></div>
    </div>
  )
}

export default OrcaLogo
