import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
    let [updatePopUp, setUpdatePopUp] = useState(false)
    let [bookingPopUp, setBookingPopUp] = useState(false)
    let [title, setTitle] = useState(cardDetails.title)
    let [description, setDescription] = useState(cardDetails.description)
    let [backEndImage1, setBackEndImage1] = useState(null)
    let [backEndImage2, setBackEndImage2] = useState(null)
    let [backEndImage3, setBackEndImage3] = useState(null)
    let [rent, setRent] = useState(cardDetails.rent)
    let [city, setCity] = useState(cardDetails.city)
    let [landmark, setLandmark] = useState(cardDetails.landMark)
    let { serverUrl } = useContext(authDataContext)
    let { updating, setUpdating } = useContext(listingDataContext)
    let { deleting, setDeleting } = useContext(listingDataContext)
    let [minDate, setMinDate] = useState("")

    let {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight, handleBooking, booking
    } = useContext(bookingDataContext)

    useEffect(() => {
        if (checkIn && checkOut) {
            let inDate = new Date(checkIn)
            let OutDate = new Date(checkOut)
            let n = (OutDate - inDate) / (24 * 60 * 60 * 1000)
            setNight(n)
            let cozystayCharge = (cardDetails.rent * (7 / 100))
            let tax = (cardDetails.rent * (7 / 100))
            if (n > 0) {
                setTotal((cardDetails.rent * n) + cozystayCharge + tax)
            } else {
                setTotal(0)
            }
        }
    }, [checkIn, checkOut, cardDetails.rent, total])

    const handleUpdateListing = async () => {
        setUpdating(true)
        try {
            let formData = new FormData()
            formData.append("title", title)
            if (backEndImage1) { formData.append("image1", backEndImage1) }
            if (backEndImage2) { formData.append("image2", backEndImage2) }
            if (backEndImage3) { formData.append("image3", backEndImage3) }
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landMark", landmark)
            let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
            setUpdating(false)
            console.log(result)
            toast.success("Listing Updated")
            navigate("/")
            setTitle("")
            setDescription("")
            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)
            setRent("")
            setCity("")
            setLandmark("")
        } catch (error) {
            setUpdating(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
            console.log(result.data)
            navigate("/")
            toast.success("Listing Deleted")
            setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response.data.message)
        }
    }

    const handleImage1 = (e) => { let file = e.target.files[0]; setBackEndImage1(file) }
    const handleImage2 = (e) => { let file = e.target.files[0]; setBackEndImage2(file) }
    const handleImage3 = (e) => { let file = e.target.files[0]; setBackEndImage3(file) }

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    return (
        <div className='w-full md:w-[100%] h-[100%] bg-white flex flex-col overflow-y-auto relative'>

            {/* Back Button */}
            <div
                className='w-10 h-10 bg-rose-500 hover:bg-rose-600 cursor-pointer fixed top-5 left-4 rounded-full flex items-center justify-center shadow-md transition-colors z-10'
                onClick={() => navigate("/")}
            >
                <FaArrowLeftLong className='w-5 h-5 text-white' />
            </div>

            <div className='w-full flex flex-col items-center px-4 md:px-10 pt-20 pb-10 gap-5'>

                {/* Location heading */}
                <div className='w-full max-w-[1100px]'>
                    <h1 className='text-xl md:text-3xl font-semibold text-gray-800 truncate'>
                        {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                    </h1>
                </div>

                {/* Image Grid — stacked on mobile, side by side on desktop */}
                <div className='w-full max-w-[1100px] flex flex-col md:flex-row gap-2 rounded-2xl overflow-hidden'>
                    {/* Big image */}
                    <div className='w-full md:w-[65%] h-[250px] md:h-[55vh] overflow-hidden rounded-xl md:rounded-none md:rounded-l-2xl'>
                        <img src={cardDetails.image1} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
                    </div>
                    {/* Two small images — side by side on mobile, stacked on desktop */}
                    <div className='w-full md:w-[35%] h-[160px] md:h-[55vh] flex flex-row md:flex-col gap-2'>
                        <div className='flex-1 overflow-hidden rounded-xl md:rounded-none md:rounded-tr-2xl'>
                            <img src={cardDetails.image2} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
                        </div>
                        <div className='flex-1 overflow-hidden rounded-xl md:rounded-none md:rounded-br-2xl'>
                            <img src={cardDetails.image3} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className='w-full max-w-[1100px] flex flex-col gap-2'>
                    <p className='text-base md:text-xl font-semibold text-gray-800 uppercase tracking-wide'>
                        {`${cardDetails.title} · ${cardDetails.category} · ${cardDetails.landMark}`}
                    </p>
                    <p className='text-sm md:text-base text-gray-600 leading-relaxed'>{cardDetails.description}</p>
                    <p className='text-base md:text-lg font-bold text-rose-500'>
                        ₹{cardDetails.rent}<span className='text-gray-400 font-normal text-sm'>/night</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='w-full max-w-[1100px]'>
                    {cardDetails.host == userData._id && (
                        <button
                            className='px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm md:text-base font-semibold rounded-xl shadow-md transition-colors'
                            onClick={() => setUpdatePopUp(prev => !prev)}
                        >
                            Edit Listing
                        </button>
                    )}
                    {cardDetails.host != userData._id && (
                        <button
                            className='px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm md:text-base font-semibold rounded-xl shadow-md transition-colors'
                            onClick={() => setBookingPopUp(prev => !prev)}
                        >
                            Reserve
                        </button>
                    )}
                </div>
            </div>

            {/* ── Update Listing Modal ── */}
            {updatePopUp && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] p-3 sm:p-6'>
                    <button
                        className='absolute top-4 left-4 w-9 h-9 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors z-10'
                        onClick={() => setUpdatePopUp(false)}
                    >
                        <RxCross2 className='w-5 h-5 text-white' />
                    </button>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='w-full max-w-[500px] max-h-[88vh] overflow-y-auto bg-gray-900 text-white rounded-2xl p-5 flex flex-col gap-4 shadow-2xl'
                    >
                        <h2 className='text-lg font-semibold text-center border-b border-gray-700 pb-3'>Update Your Listing</h2>

                        {/* Title & Rent */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex flex-col gap-1.5 flex-1'>
                                <label htmlFor="title" className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Title</label>
                                <input
                                    type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder="_bhk house or best title" required
                                    className='w-full h-10 border border-gray-600 bg-gray-800 rounded-lg text-white text-sm px-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition'
                                />
                            </div>
                            <div className='flex flex-col gap-1.5 flex-1'>
                                <label htmlFor="rent" className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Rent</label>
                                <input
                                    type="number" id="rent" value={rent} onChange={(e) => setRent(e.target.value)}
                                    placeholder="Rs.______/day" required
                                    className='w-full h-10 border border-gray-600 bg-gray-800 rounded-lg text-white text-sm px-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition'
                                />
                            </div>
                        </div>

                        {/* City & Landmark */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex flex-col gap-1.5 flex-1'>
                                <label htmlFor="city" className='text-xs font-medium text-gray-400 uppercase tracking-wide'>City</label>
                                <input
                                    type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                    placeholder="city, country" required
                                    className='w-full h-10 border border-gray-600 bg-gray-800 rounded-lg text-white text-sm px-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition'
                                />
                            </div>
                            <div className='flex flex-col gap-1.5 flex-1'>
                                <label htmlFor="landmark" className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Landmark</label>
                                <input
                                    type="text" id="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}
                                    required
                                    className='w-full h-10 border border-gray-600 bg-gray-800 rounded-lg text-white text-sm px-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition'
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="des" className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Description</label>
                            <textarea
                                id="des" required value={description} onChange={(e) => setDescription(e.target.value)}
                                className='w-full h-20 border border-gray-600 bg-gray-800 rounded-lg text-white text-sm px-3 py-2 resize-none focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition'
                            />
                        </div>

                        {/* Images */}
                        {[
                            { label: "Image 1", id: "img1", handler: handleImage1 },
                            { label: "Image 2", id: "img2", handler: handleImage2 },
                            { label: "Image 3", id: "img3", handler: handleImage3 },
                        ].map(({ label, id, handler }) => (
                            <div key={id} className='flex flex-col gap-1.5'>
                                <label htmlFor={id} className='text-xs font-medium text-gray-400 uppercase tracking-wide'>{label}</label>
                                <div className='w-full h-10 border border-gray-600 bg-gray-800 rounded-lg flex items-center px-3'>
                                    <input
                                        type="file" id={id} onChange={handler}
                                        className='w-full text-xs text-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-rose-500 file:text-white file:text-xs file:cursor-pointer'
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className='flex gap-3 mt-1'>
                            <button
                                onClick={handleUpdateListing} disabled={updating}
                                className='flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm'
                            >
                                {updating ? "Updating..." : "Update Listing"}
                            </button>
                            <button
                                onClick={handleDeleteListing} disabled={deleting}
                                className='flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm'
                            >
                                {deleting ? "Deleting..." : "Delete Listing"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── Booking Modal ── */}
            {bookingPopUp && (
                <div className='fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[100] p-4'>
                    <button
                        className='absolute top-4 left-4 w-9 h-9 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors'
                        onClick={() => setBookingPopUp(false)}
                    >
                        <RxCross2 className='w-5 h-5 text-white' />
                    </button>

                    <div className='w-full max-w-[900px] flex flex-col md:flex-row gap-5 max-h-[90vh] overflow-y-auto'>

                        {/* Booking Form */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className='flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 shadow-lg'
                        >
                            <h1 className='text-xl font-semibold text-center border-b border-gray-200 pb-4 text-gray-800'>Confirm & Book</h1>
                            <p className='text-base font-semibold text-gray-700'>Your Trip</p>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="checkIn" className='text-sm font-medium text-gray-600'>Check In</label>
                                <input
                                    type="date" min={minDate} id='checkIn' required
                                    value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                                    className='w-full h-11 border-2 border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-rose-400 transition'
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="checkOut" className='text-sm font-medium text-gray-600'>Check Out</label>
                                <input
                                    type="date" min={minDate} id='checkOut' required
                                    value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                                    className='w-full h-11 border-2 border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-rose-400 transition'
                                />
                            </div>

                            <button
                                onClick={() => { handleBooking(cardDetails._id) }} disabled={booking}
                                className='w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors mt-2'
                            >
                                {booking ? "Booking..." : "Book Now"}
                            </button>
                        </form>

                        {/* Price Summary */}
                        <div className='flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 shadow-lg'>
                            <div className='flex gap-4 border border-gray-100 rounded-xl p-3'>
                                <img src={cardDetails.image1} alt="" className='w-20 h-20 rounded-xl object-cover flex-shrink-0' />
                                <div className='flex flex-col gap-1 min-w-0'>
                                    <p className='text-xs text-gray-500 uppercase font-medium truncate'>{`${cardDetails.landMark}, ${cardDetails.city}`}</p>
                                    <p className='text-sm font-semibold text-gray-800 truncate'>{cardDetails.title.toUpperCase()}</p>
                                    <p className='text-xs text-gray-500 uppercase'>{cardDetails.category}</p>
                                    <span className='flex items-center gap-1 text-xs text-gray-600'>
                                        <FaStar className='text-rose-400 w-3 h-3' />{cardDetails.ratings}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 border border-gray-100 rounded-xl p-4'>
                                <p className='text-base font-semibold text-gray-800'>Price Details</p>
                                <div className='flex justify-between text-sm text-gray-600'>
                                    <span>₹{cardDetails.rent} × {night} nights</span>
                                    <span>₹{cardDetails.rent * night}</span>
                                </div>
                                <div className='flex justify-between text-sm text-gray-600'>
                                    <span>Tax</span>
                                    <span>₹{cardDetails.rent * 7 / 100}</span>
                                </div>
                                <div className='flex justify-between text-sm text-gray-600 pb-3 border-b border-gray-200'>
                                    <span>cozystay Charge</span>
                                    <span>₹{cardDetails.rent * 7 / 100}</span>
                                </div>
                                <div className='flex justify-between text-base font-bold text-gray-800'>
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewCard