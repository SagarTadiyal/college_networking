import React, { useContext } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    return (
        <div className='h-14 md:h-15 lg:h-20 px-6 md:px-10 lg:px-16 flex items-center justify-between rounded-2xl sticky top-2 bg-white/30 backdrop-blur-md border-b border-white/20 z-50 '>
            <div className="w-16 h-16">
                <Link to={'/'}>
                    <img src='/navlogo.png' alt='logo' width={100} height={100} className='cursor-pointer' />
                </Link>
            </div>
            <div className="flex items-center gap-6 md:gap-8 lg:gap-12 " >

                <Link to={'/dashboard'} className='cursor-pointer text-sm md:text-md lg:text-lg'>Dashboard</Link>
                <Link className='cursor-pointer text-sm md:text-md lg:text-lg'>About</Link>
                <Link className='cursor-pointer text-sm md:text-md lg:text-lg'>Profile</Link>

                {user && <Button className={"hidden md:flex bg-blue-600 text-white text-md md:text-lg px-3 py-2 md:px-6 md:py-4 lg:px-8 lg:py-6 cursor-pointer"} onClick={()=>logout(navigate)}>Logout</Button>}

                {!user && <Button className={"hidden md:flex bg-blue-600 text-white text-md md:text-lg px-3 py-2 md:px-6 md:py-4 lg:px-8 lg:py-6 cursor-pointer"} onClick={() => navigate('/login')}>Login</Button>}
            </div>

        </div>
    )
}

export default Navbar