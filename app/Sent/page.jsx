'use client'
import Image from 'next/image'
import Navbar from '@/components/NavbarOfLogin'
import { useRouter } from 'next/navigation';



export default  function Page() {
  const router = useRouter();


  return (
  
    <div  className='w-screen h-screen flex flex-col'>
    <Navbar/>
<div  className='w-screen  h-full grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-2'>
    <div className='h-full  sm:row-span-1 row-span-2 w-full relative    '>
        <div className='sm:w-[75%] w-[80%] flex flex-col bottom-0 justify-between pb-[35%] sm:pb-[20%]   absolute top-[10%] sm:top-1/4 left-1/2 transform -translate-x-1/2  '>
        <p style={{fontFamily: 'Bahnschrift' }} className=' text-[38px] text-blue-800 font-bold  sm:-translate-x-[20%] -translate-x-[30%] font-mono   w-full text-center ml-[20%]'>Vérifiez vos e-mails !</p>
    <p className='mt-[40px] text-[20px] font-bahnschrift  text-blue-900 font-bold sm:-translate-x-[20%] -translate-x-[30%]   w-full text-center ml-[20%]'>Nous vous avons envoyer un lien, veuillez consultez votre email pour le récuperer. Si vous voulez demander un nouveau lien, cliquer sur le button ci-dessous .</p>

           
  <div className="w-full flex flex-col mt-2   items-center justify-center">
  <button 
onClick={()=>{router.push('/ForgotPassword')}}
  type="submit" 
  className="text-[18px] w-[160px] h-[45px] flex justify-center items-center bg-white px-4 py-2 text-red-500 border border-red-600 font-bold text-sm gap-1 hover:scale-110 mt-20 rounded-[10px]"
  >
    Renvoyer le lien
  </button></div>
  
  <div className='w-full flex flex-col mt-2   items-center justify-center'>


        <svg
          className="animate-spin mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
       
 </div>
 </div>

        </div>
        <div className='w-full order-first sm:order-2 relative h-full bg-red-900'>
            <div className='absolute top-0 right-0 h-full w-full bg-black/80 z-10'></div>
        <Image fill alt='/' className="object-cover" priority={true}  src="https://legamart.com/articles/wp-content/uploads/2023/02/workers-considering-term-agreement-min.jpg" />
 </div>      
    </div>
    </div>
  )
}
