import DashboardSearch from '@/components/DashboardSearch'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className=' py-10 flex flex-col gap-10'>
            <h1 className=' text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl'>College Social Network</h1>

            <div className="flex flex-col gap-10">
                <DashboardSearch activeTab="Dashboard" />

                <Outlet />
            </div>

        </div>
    )
}

export default DashboardLayout