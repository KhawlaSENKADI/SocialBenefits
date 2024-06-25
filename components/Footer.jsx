import React from 'react'

export default function Footer() {
  return (
    <div id='contact' className='w-screen pt-5 py-8 text-gray-300 flex flex-col items-center mt-52 bg-[#2c3a51]'>
        <div className=' my-8 flex flex-col px-4 w-screen max-w-[65rem]'>
            <p className='text-lg font-bold'>Contact : </p>
        <ul className='ml-6 list-disc'>
            <li>E-mail : d.amarbensaber@esi-sba.dz / m.amrane@esi-sba.dz</li>
            <li>Telephone : +213 3568-8547-52</li>
            <li>Fax : 032 56 81 66</li>
            <li>Adresse : 200 El Wiam, Sidi Bel Abbes ,Algérie</li>
        </ul>
        </div>
      <p className='text-gray-400'>Copyright© 2023 CodeHive - Tous Droits Reservés</p>
    </div>
  )
}
