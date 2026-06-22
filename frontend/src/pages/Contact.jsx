import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
const Contact = () => {
    const navigate=useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
               <div className='w-[39px] ml-[10px] h-[50px]  md:top-[40px] cursor-pointer rounded-[50%]
                      flex items-center justify-start px-[5px] relative  left-[5px]  flex-wrap
                      md:left-[100px]  bg-red-500 hover:bg-red-600 transition-all duration-300'
                              
                      onClick={() => {
                                  navigate('/')
                              }}>
                              <FaArrowLeft className='text-[white] text-[20px] 
                                           w-[30px] h-[30px]'/>
                          </div>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12">We'd love to hear from you! Reach out for any queries or support.</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white p-3 rounded-full"><FaPhoneAlt /></div>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white p-3 rounded-full"><FaEnvelope /></div>
              <p className="text-gray-700">support@cozystay.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white p-3 rounded-full"><FaMapMarkerAlt /></div>
              <p className="text-gray-700">Connaught Place, New Delhi, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"></textarea>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;