import React, { useContext } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/authContext';
import { LogOut, LogOutIcon } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    return (
        
        <div className='h-14 md:h-15 lg:h-20 px-6 md:px-10 lg:px-16 flex items-center justify-between rounded-2xl sticky top-2 bg-white/30 backdrop-blur-md border-b border-white/20 z-50 '>
           <div className="w-10 h-10 md:w-16 md:h-16">
                    <Link to={'/'}>
                    <img src='/navlogo.png' alt='logo' width={100} height={100} className='cursor-pointer' />
                </Link>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 text-lg font-medium text-gray-700">

                <Link to={'/dashboard'} className="py-2 md:py-0 hover:text-green-600 transition">Dashboard</Link>
                <Link className="py-2 md:py-0 hover:text-green-600 transition">About</Link>
                <Link to={"/profile"} className="py-2 md:py-0 hover:text-green-600 transition">Profile</Link>


                {user && <Button className={"bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"} onClick={() => logout(navigate)}><span className="hidden md:block">Logout</span><span className="block md:hidden text-white"><LogOut size={25} /></span></Button>}


                {!user && <Button className={"hidden md:flex bg-blue-600 text-white text-md md:text-lg px-3 py-2 md:px-6 md:py-4 lg:px-8 lg:py-6 cursor-pointer"} onClick={() => navigate('/login')}>Login</Button>}
            </div>

        </div>
    )
}

export default Navbar


