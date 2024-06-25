import {IoIosArrowDropright , IoIosArrowDropleft} from 'react-icons/io'
import Image from 'next/image'
export default function Annonces() {
  return (
    <div className="w-screen  relative  flex-col flex  items-center h-screen max-w-[65rem] ">
        <p className="text-5xl font-mono mt-8  border-b-2 border-red-600  text-blue-900">Nos Annonces</p>
        <div className='flex relative w-full aspect-[2/1] sm:aspect-[3/1] mt-20 flex-row items-end'>
        <Image fill className="object-cover" alt='/'  src="https://legamart.com/articles/wp-content/uploads/2023/02/workers-considering-term-agreement-min.jpg" />
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white/50'></div>
       
        <div className="flex-col ml-4 overflow-hidden relative mb-2 z-10 grow ">
            <p className='text-blue-800 font-mono text-2xl font-bold'>Annonce 01 : </p>
            <p className='truncate w-[100%] '> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati debitis explicabo ratione inventore blanditiis. Qui, vel nisi, debitis obcaecati alias quis aperiam aspernatur libero quaerat minima, id ratione quia natus voluptates dignissimos iusto inventore? Rem error at repudiandae est placeat.</p>
        </div>
        <button className='z-10 flex-none hover:duration-300 hover:scale-110 hover:bg-blue-800 bg-red-600 text-white rounded py-2 px-4 m-4'>View More</button>
        <IoIosArrowDropleft   className='absolute  w-10 h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 left-0  cursor-pointer hover:scale-110  sm:-translate-x-[150%]  text-red-500  top-[50%]'/>
       <IoIosArrowDropright  className=' absolute  w-10 h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 right-0 cursor-pointer hover:scale-110  sm:translate-x-[150%]  text-red-500  top-[50%]'/>
        </div>
      

    </div>
  )
}
