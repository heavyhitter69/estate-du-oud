import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-700 w-full overflow-hidden' id='Footer'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
                <div className='w-full md:w-1/3 mb-8 md:mb-0'>
                    <img src={assets.laga} alt="" />
                    <p className='text-black mt-4'>Building more than homes — we create lasting spaces for families to thrive.
                        Trusted craftsmanship. Timeless design.
                        Estate du Oud, where comfort meets elegance.</p>
                </div>
                <div className='w-full md:w-1/5 mb-8 md:mb-0'>
                    <h3 className='text-white text-lg font-bold mb-4'>Company</h3>
                    <ul className='flex flex-col gap-2 text-black'>
                        <a href="#Header" className='hover:text-white'>Home</a>
                        <a href="#About" className='hover:text-white'>About us</a>
                        <a href="#Contact" className='hover:text-white'>Contact Us</a>
                        <a href="#" className='hover:text-white'>Privacy Policy</a>
                    </ul>
                </div>
                <div className='w-full md:w-1/3'>
                    <h3 className='text-white text-lg font-bold mb-4'>Subscribe to our newsletter</h3>
                    <p className='mb-4 max-w-80'>Stay in the loop with our latest property updates and exclusive offers.
                        Join our newsletter and never miss a move.
                        Your dream home might just be one click away.</p>
                        <div className='flex gap-2'>
                            <input type="email" placeholder='Enter your email' className='p-2 rounded bg-black text-white border border-gray-700 focus:outline-none w-full md:w-auto' />
                            <button className='py-2 px-4 rounded bg-blue-500 text-white cursor-pointer'>Subscribe</button>
                        </div>
                </div>
            </div>
            <div className='border-t border-black py-4 mt-10 text-center text-white font-semibold'>
                Copyright 2025 © Estate du Oud. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer
