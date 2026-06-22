import React from 'react'


import { FaArrowLeft } from "react-icons/fa6";

import {useNavigate} from 'react-router-dom'

const About = () => {

    const navigate=useNavigate()

  return (

    <div className='min-h-screen bg-white'>

      {/* <Navbar /> */}

       <div className='w-[39px] ml-[10px] h-[50px]  md:top-[40px] cursor-pointer rounded-[50%]

              flex items-center justify-start px-[5px] relative  left-[5px] top-[20px] flex-wrap

              md:left-[100px]  bg-red-500 hover:bg-red-600 transition-all duration-300'

                      

              onClick={() => {

                          navigate('/')

                      }}>

                      <FaArrowLeft className='text-[white] text-[20px] 

                                   w-[30px] h-[30px]'/>

                  </div>

     <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-16">

        

        {/* Heading */}

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">

          Welcome to <span className="text-red-500 hover:text-red-600 transition-all duration-300">CozyStay</span>

        </h1>



        {/* Mission Section */}

        <div className="text-center mb-16">

          <h2 className="text-2xl font-bold text-gray-700 mb-4">Our Mission</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">

            We are dedicated to revolutionizing the way you travel. Our mission is to provide 

            a seamless, safe, and affordable platform that connects travelers with their 

            perfect home away from home.

          </p>

        </div>



        {/* Features Grid */}

        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <div className="text-center p-6 bg-blue-50 rounded-xl">

            <h3 className="text-xl font-bold text-red-500 hover:text-red-600 transition-all duration-300 mb-2">Safe Stays</h3>

            <p className="text-gray-600">Verified hosts and secure payment gateways for your peace of mind.</p>

          </div>

          <div className="text-center p-6 bg-blue-50 rounded-xl">

            <h3 className="text-xl font-bold text-red-500 hover-text-red-600 transition-all duration-300 mb-2">Affordable</h3>

            <p className="text-gray-600">Quality accommodations that fit every traveler's budget perfectly.</p>

          </div>

          <div className="text-center p-6 bg-blue-50 rounded-xl">

            <h3 className="text-xl font-bold text-red-500 hover-text-red-600 transition-all duration-300 mb-2">Easy Booking</h3>

            <p className="text-gray-600">A user-friendly interface designed for quick and hassle-free reservations.</p>

          </div>

        </div>



        {/* Story Section */}

        <div className="border-t pt-10">

          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Our Journey</h2>

          <p className="text-gray-600 text-center leading-relaxed">

            Started in 2026 as a major project, CozyStay was built to solve the struggle of finding reliable 

            short-term rentals. Today, we are proud to be a bridge between comfort-seeking guests 

            and amazing local hosts worldwide.

          </p>

        </div>



      </div>

    </div>

  )

}



export default About