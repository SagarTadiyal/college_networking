import React from 'react'
import { Button } from './ui/button'
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-[#1d1e16] p-8 mt-4 text-white'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-items-center p-6 space-y-4">
                <div className="mb-2 ">
                    <h2 className='text-4xl font-serif'>CSN</h2>
                    <p>CSN will always help in your college life.</p>
                </div>
                <div className="lg:col-span-2">
                    <p>Contact here to get in touch with the support team.</p>
                    <div className="space-x-2 md:flex items-center gap-4 my-2">
                        <input placeholder='Enter your email' className='bg-transparent outline-none border border-white p-2' />
                        <Button className="bg-pink-500 cursor-pointer">Subscribe</Button>
                    </div>
                </div>
                <div className="">
                    <p>Follow Us</p>
                    <div className="flex items-center gap-2">
                        <Link ><FaFacebook size={40} /></Link>
                        <Link><FaWhatsapp size={40} /></Link>
                        <Link><FaInstagram size={40} /></Link>
                    </div>
                </div>
                <div className="">
                    <p>Call Us</p>
                    <p>+91 70173 58292</p>
                </div>
            </div>

            <div className="w-full h-[2px] bg-white my-4"></div>
            <div className="md:flex justify-between items-center space-y-2">
                <p>2025 Think32. College Social Network,Peerumdara,Ramnagar,India. All Rights Reserved</p>
                <p>PRIVACY POLICY,TERMS AND CONDITIONS</p>
            </div>
        </div>
    )
}

export default Footer