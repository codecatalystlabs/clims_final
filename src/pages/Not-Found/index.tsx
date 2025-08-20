import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
<div className="p-5 lg:p-10 md:p-10 fixed top-0 left-0 w-full z-10">

<div className="flex justify-end  lg:justify-between md:justify-end items-center max-w-7xl mx-auto hidden lg:block md:hidden">
    <div className='flex justify-start space-x-5'>
  <div className="hidden lg:block md:hidden ">
    <img className="mx-auto mb-4 w-25 h-15" src="uganda.png" alt="LMD" />
  </div>
  <div className="">
          <h1 className="text-3xl font-bold text-[#006D5B]">Ministry of Health</h1>
          <p className="text-sm text-[#006D5B]">Uganda's first electronic condom distribution system</p>
        </div>
        </div>
        {/* <div className="flex items-center justify-end">
        <div className="text-right">
            <p className="text-sm text-gray-600">Address: Kampala, Uganda</p>
            <p className="text-sm text-gray-600">Phone: +256-123-456-789</p>
        </div>
    </div> */}

</div>
</div>
    <div className="bg-white  flex flex-col items-center justify-center px-4 md:px-8 lg:px-50 lg:py-20 py-8 rounded-lg shadow-md">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for could not be found.</p>
        <Link to="/" className="flex items-center space-x-2 bg-[#006D5B] hover:bg-[#006D5B] text-white px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span>Return Home</span>
        </Link>
    </div>
    <footer className="bg-gray-800 text-[#006D5B] py-4 mt-4 w-full">
      <div className="container mx-auto text-center">
      <p className="text-sm mt-1">
          © {currentYear} Ministry of Health, Kampala, Republic of Uganda. All Rights Reserved.
        </p>
      </div>
    </footer>
</div>
  )
}
