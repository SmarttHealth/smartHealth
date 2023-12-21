import React from 'react';
import hospitalBackground from '../images/bg_login.jpg';
export default function Login() {
    return (
        <div 
    style={{
      backgroundImage: `url(${hospitalBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container mx-auto">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="lg:w-5/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-md bg-white bg-opacity-50 my-20 rounded-md mx-auto">
          <div className="pb-5">
                <h1 className="text-3xl font-semibold text-center text-black-500  uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-black-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-white hover:text-red-500">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/inscription"
                        className="font-medium text-black-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}