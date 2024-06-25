 import Image from "next/image"
 import Link from 'next/link';

export default function Hero() {
  return (
    <div id="hero" className="w-screen relative flex justify-center items-center h-screen">
      <Image fill alt="/" className="object-cover"  src="https://legamart.com/articles/wp-content/uploads/2023/02/workers-considering-term-agreement-min.jpg" />
      <div className="h-screen w-screen absolute bg-black/60"></div>
      <div className="flex z-10 flex-col w-screen  max-w-[50rem]  py-20  justify-center items-center ">
        <p className="text-7xl w-full text-center font-bold font-mono text-white">LES ŒUVRES SOCIALES</p>
        <p className=" hyphens-auto mt-4 text-xl font-mono text-gray-400 w-[80%] sm:w-[50%] text-center">Gérez votre dossier professionel et comminuquer avec l&apos;administration en toute simplicité grac a notre site</p>
        <Link href="/Login">
        <button  className="text-center hover:duration-500 justify-center bg-red-600 hover:bg-blue-500 hover:scale-110 max-w-[12rem] w-screen rounded py-2  text-white   text-3xl mt-10 ">Log In</button>
</Link>
      </div>
    
    </div>
  )
}
