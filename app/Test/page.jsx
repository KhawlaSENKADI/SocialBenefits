'use client'
import React from 'react'
import Image from 'next/image'
import empty from '@/assets/empty.svg'
export default function page() {
  return (
    <div>
      <div className='realtive w-[50%] aspect-square'>

      <Image src={empty} alt="SVG" width={200} height={200} />

      </div>
    </div>
  )
}
