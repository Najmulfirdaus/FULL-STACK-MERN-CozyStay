import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { useState } from 'react';
import { bookingDataContext } from '../Context/BookingContext';

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    let { handleViewCard } = useContext(listingDataContext)
    let [popUp, setPopUp] = useState(false)
    let { cancelBooking } = useContext(bookingDataContext)
    const handleClick = () => {
        if (userData) {
            handleViewCard(id)
        } else {
            navigate("/login")
        }
    }
    return (
        <div
            className='group w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative flex flex-col'
            onClick={() => !isBooked ? handleClick() : null}
        >
            {/* Booked Badge */}
            {isBooked && (
                <div className='absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm'>
                    <GiConfirmed className='w-3 h-3' />
                    Booked
                </div>
            )}

            {/* Cancel Button */}
            {isBooked && host == userData?._id && (
                <div
                    className='absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-red-500 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm hover:bg-red-50 transition-colors'
                    onClick={() => setPopUp(true)}
                >
                    <FcCancel className='w-3 h-3' />
                    Cancel
                </div>
            )}

            {/* Confirmation Popup */}
            {popUp && (
                <div className='absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl'>
                    <div className='bg-white rounded-xl shadow-lg p-4 mx-2 w-full max-w-[220px] text-center'>
                        <p className='text-gray-800 font-semibold text-sm mb-1'>Cancel Booking?</p>
                        <p className='text-gray-500 text-xs mb-4'>This action cannot be undone.</p>
                        <div className='flex gap-2 justify-center'>
                            <button
                                className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors'
                                onClick={() => { cancelBooking(id); setPopUp(false) }}
                            >
                                Yes, Cancel
                            </button>
                            <button
                                className='px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors'
                                onClick={() => setPopUp(false)}
                            >
                                Keep
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image */}
            <div className='w-full h-[140px] sm:h-[180px] overflow-hidden flex  '>
                <img src={image1} alt={title} className='w-full flex-shrink-0 object-cover group-hover:scale-105 transition-transform duration-500' />
                <img src={image2} alt={title} className='w-full flex-shrink-0 object-cover' />
                <img src={image3} alt={title} className='w-full flex-shrink-0 object-cover' />
            </div>

            {/* Card Body */}
            <div className='p-2.5 sm:p-3 flex flex-col gap-1 flex-1'>
                <div className='flex items-start justify-between gap-1'>
                    <p className='text-[11px] sm:text-[12px] font-semibold text-gray-800 uppercase tracking-wide truncate'>
                        {landMark}, {city}
                    </p>
                    <span className='flex items-center gap-0.5 text-[11px] text-gray-600 flex-shrink-0'>
                        <FaStar className='text-rose-400 w-3 h-3' />
                        <span className='font-medium'>{ratings}</span>
                    </span>
                </div>

                <p className='text-[10px] sm:text-[11px] text-gray-400 truncate uppercase tracking-wider'>{title}</p>

                <div className='mt-auto pt-2 border-t border-gray-100'>
                    <span className='text-sm font-bold text-rose-500'>₹{rent}</span>
                    <span className='text-gray-400 text-xs font-normal'> / night</span>
                </div>
            </div>
        </div>
    )
}

export default Card