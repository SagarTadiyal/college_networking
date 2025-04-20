import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="bg-gradient-to-b from-emerald-100 to-emerald-600">

            <div className='w-[95%] md:w-[90%] lg:w-[92%] xl:w-[85%] mx-auto'>
                {/* Navbar */}
                <Navbar />
                {/* content */}
                <Outlet />
                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout