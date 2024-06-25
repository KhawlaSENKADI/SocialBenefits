import Annonces from '@/components/Annonces'
import Hero from '@/components/Hero'
import Image from 'next/image'
import Slider from '@/components/Slider'
import Programs from '@/components/Programs'
import Footer from '@/components/Footer'
import Navbar from '@/components/newNavbar'
export default function Page() {
  return (
    <main className="flex flex-col items-center ">
      <Navbar/>
     <Hero />
     <p className="text-5xl  font-mono mt-20  border-b-2 border-red-600  text-blue-900">Nos Annonces</p>
     <Slider />
     <Programs />
     <Footer />
    </main>
  )
}
