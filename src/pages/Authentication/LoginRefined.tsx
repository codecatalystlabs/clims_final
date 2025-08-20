import React from 'react';

export default function LoginRefined() {
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
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-2xl sm:text-2xl md:uppercase text-[#006D5B]">Condom Logistics System</div>
        <div className="relative mt-6 flex items-center justify-center rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
            {/* <i className="fab fa-facebook-f"></i> */}
          </span>
          <span>Last Mile Condom Distribution</span>
        </div>

        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-[#006D5B]">E-Mail Address:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-[#006D5B]">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
              </div>
            </div>

            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a href="#" className="inline-flex text-xs sm:text-sm text-[#006D5B] hover:text-blue-700">Forgot Your Password?</a>
              </div>
            </div>

            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#006D5B] hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <a href="#" target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2 text-[#006D5B]">You don't have an account?,Request for account</span>
          </a>
        </div>
      </div>
      <footer className="bg-gray-800 text-[#006D5B] py-4 mt-4 w-full">
      <div className="container mx-auto text-center">
      <p className="text-sm mt-1">
          © {currentYear} Ministry of Health, Kampala, Republic of Uganda. All Rights Reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}
