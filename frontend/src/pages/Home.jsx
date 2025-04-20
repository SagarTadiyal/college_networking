import React from 'react'
import { Button } from "@/components/ui/button"
import { serviceOffered } from '@/lib/serviceOffered'
import Service from '@/components/Service'
import Footer from '@/components/Footer'

const Home = () => {
  return (
    <div className='mt-2 pt-10'>
      <img src='/banner.webp' alt='banner' className='object-cover w-full h-[500px] rounded-lg' />

      {/* Service Offered */}
      <div className="py-10">
        <h1 className='text-xl md:text-2xl lg:text-4xl text-gray-800 py-8'>Services Offered</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {
            serviceOffered.map(service => {
              return (
                <div className="" key={service.id}>
                  <Service data={service} />
                </div>

              )
            })
          }
        </div>
      </div>

      {/* About */}
      <div className=''>
        <h1 className='text-xl md:text-2xl lg:text-4xl text-gray-800 py-8'>About College Social Network</h1>
        <p className='text-gray-800 text-md md:text-lg bg-gray-300 rounded-2xl p-6 mt-2 text-justify '>The College Social Network is a comprehensive digital platform designed to streamline communication and resource sharing within the college community. Our goal is to enhance the academic and social experience for students, faculty, and staff by providing a centralized space for essential tools and updates. Users can easily upload and manage PDF documents, making it simple to share assignments, notes, and other academic materials. The platform also offers convenient access to previous years' question papers, supporting effective exam preparation and academic success. To keep everyone informed, college updates are shared in a timely manner, and important notices are regularly published and circulated through the website. In addition, our integrated chatbot service ensures a seamless and responsive chat experience, offering assistance and information whenever needed. A wide selection of study materials is also readily available, allowing students to find the resources they need with ease. With a focus on connectivity, efficiency, and accessibility, the College Social Network is committed to building a more informed and engaged campus environment.</p>

        <p className='text-gray-800 text-md md:text-lg bg-gray-300 rounded-2xl p-6 mt-4 text-justify'>Users can effortlessly upload and manage PDF documents, making it easy to share lecture notes, assignments, study guides, and official college resources. The platform also provides quick access to a curated archive of previous years’ question papers—an invaluable tool for students preparing for exams and revising key topics. In addition, a regularly updated feed delivers important college news, event updates, and academic notifications directly to your dashboard, ensuring you're always in sync with what's happening on campus.</p>
      </div>
    </div>
  )
}

export default Home
