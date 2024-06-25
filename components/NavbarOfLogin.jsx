'use client'
import {AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai'
import { Link, animateScroll as scroll } from "react-scroll";
import { useState ,useEffect } from 'react'
import Link2 from 'next/link';

export default function Navbar() {
    const[nav,setNav] = useState(false)
    const[color,setColor] = useState('transparent')
    const[txtcolor,setTxtColor] = useState('white')
    const[shadow, setShadow] = useState('shadow-none')
useEffect(()=>{
    const changeColor = ()=>{if(window.scrollY>=90 ){setColor('white');setTxtColor('black') ;setShadow('shadow-lg')}else{setColor('transparent');setTxtColor('white');setShadow('shadow-none')} 
}
window.addEventListener('scroll' ,changeColor)
},[])

  return (
    <div style={{backgroundColor:`${color}`}} className={`z-20 fixed w-full px-4 py-2 flex justify-center ${shadow} `}>
        <div  className="  flex flex-row items-center justify-between w-screen max-w-[80rem]">
            <Link2  href="/#hero"   className="text-white sm:text-blue-800  hover:scale-110 text-2xl font-semibold font-mono cursor-pointer">ESI SBA.</Link2>
            <div style={{color:`${txtcolor}`}} className="hidden  h-full text-white items-center sm:flex  flex-row gap-8">
                <Link2 scroll={true}  href="/#ads"  className=" text-xl  font-mono hover:scale-110 hover:text-blue-500   cursor-pointer">Annonces</Link2>
                <Link2 scroll={true}   href="/#programs"  className="text-xl  font-mono hover:scale-110 hover:text-blue-500   cursor-pointer">Programmes</Link2>
                <Link2 scroll={true}  href="/#contact"  className=" text-xl  font-mono  hover:scale-110 hover:text-blue-500  cursor-pointer">Contact</Link2>
            </div>
           {nav ? <AiOutlineClose  onClick={()=>{setNav(!nav)}} size={20} className='text-white sm:hidden z-10 cursor-pointer'/> : <AiOutlineMenu style={{color:`${txtcolor}`}} onClick={()=>{setNav(!nav)}} size={20}  className=' z-10 sm:hidden  cursor-pointer'/> } 
        </div>
      <div className={ nav ? 'absolute top-0 h-screen w-screen translate-x-0 duration-300 bg-black ' : 'absolute top-0 invisible h-screen w-screen translate-x-[100%] duration-300 bg-black ' }>
           <div className="  translate-y-[20%] h-[30%] justify-around flex flex-col  items-center">
           <Link2 scroll={true}  href="/#ads"  className='text-white font-mono text-2xl font-bold'>Annonces</Link2>
           <Link2 scroll={true}   href="/#programs"  className='text-white font-mono text-2xl font-bold'>Programmes</Link2>
           <Link2 scroll={true}  href="/#contact"  className='text-white font-mono text-2xl font-bold'>Contact</Link2>

           </div>
      </div>
    </div>
  )
}
