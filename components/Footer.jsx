import { siteConfig } from '@/config/site'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-(--color-third)/70'>
      <div className='flex flex-col mx-auto w-full max-w-11/12 lg:max-w-3/6 px-4 pt-4'>
        <div className='flex gap-8 justify-between'>
          <div className='flex flex-col'>
            <h1>{siteConfig.company.email}</h1>
            <h1>{siteConfig.company.phone}</h1>
          </div>
          <div className='flex flex-col'>
            <h1>{siteConfig.company.locationCity}</h1>
            <h1>{siteConfig.company.locationStreet}</h1>
          </div>
        </div>
        <span className='mx-auto text-sm mt-4'>
          © 2026 {siteConfig.company.title} Kft.
        </span>
      </div>
    </div>
  )
}

export default Footer