'use client'
import {AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai'
import { Link, animateScroll as scroll } from "react-scroll";
import { useState ,useEffect } from 'react'

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
        <div  className="  flex flex-row items-center justify-between w-screen max-w-[65rem]">
            <Link to='hero' smooth={true}  style={{color:`${  txtcolor}`}} className="text-white  hover:scale-110 text-2xl font-semibold font-mono cursor-pointer">ESI SBA.</Link>
            <div style={{color:`${txtcolor}`}} className="hidden  h-full text-white items-center sm:flex  flex-row gap-8">
                <Link  to='ads' smooth={true} className=" text-xl  font-mono hover:scale-110 hover:text-blue-500   cursor-pointer">Annonces</Link>
                <Link  to='programs' smooth={true} className="text-xl  font-mono hover:scale-110 hover:text-blue-500   cursor-pointer">Programmes</Link>
                <Link to='contact'  smooth={true} className=" text-xl  font-mono  hover:scale-110 hover:text-blue-500  cursor-pointer">Contact</Link>
            </div>
           {nav ? <AiOutlineClose  onClick={()=>{setNav(!nav)}} size={20} className='text-white sm:hidden z-10 cursor-pointer'/> : <AiOutlineMenu style={{color:`${txtcolor}`}} onClick={()=>{setNav(!nav)}} size={20}  className=' z-10 sm:hidden  cursor-pointer'/> } 
        </div>
      <div className={ nav ? 'absolute top-0 h-screen w-screen translate-x-0 duration-300 bg-black ' : 'absolute top-0 invisible h-screen w-screen translate-x-[100%] duration-300 bg-black ' }>
           <div className="  translate-y-[20%] h-[30%] justify-around flex flex-col  items-center">
           <Link  to='ads'  smooth={true}   onClick={()=>{setNav(false)}} className='cursor-pointer text-white font-mono text-2xl font-bold'>Annonces</Link>
           <Link  to='programs'  smooth={true}   onClick={()=>{setNav(false)}} className='cursor-pointer text-white font-mono text-2xl font-bold'>Programmes</Link>
           <Link to='contact'  smooth={true}   onClick={()=>{setNav(false)}} className='cursor-pointer text-white font-mono text-2xl font-bold'>Contact</Link>

           </div>
      </div>
    </div>
  )
}
