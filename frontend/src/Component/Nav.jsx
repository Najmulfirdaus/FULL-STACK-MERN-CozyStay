import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/cozystay.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';


function Nav() {
    let [showpopup, setShowpopup] = useState(false)
    let { userData, setUserData } = useContext(userDataContext)
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let [cate, setCate] = useState()
    let { listingData, setListingData, setNewListData, newListData, searchData, handleSearch, handleViewCard } = useContext(listingDataContext)
    let [input, setInput] = useState("")

    const handleLogOut = async () => {
        try {
            let result = await axios.post(serverUrl + "/api/auth/logout", { withCredentials: true })
            setUserData(null)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCategory = (category) => {
        setCate(category)
        if (category == "trending") {
            setNewListData(listingData)
        } else {
            setNewListData(listingData.filter((list) => list.category == category))
        }
    }

    const handleClick = (id) => {
        if (userData) {
            handleViewCard(id)
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        handleSearch(input)
    }, [input])

    const categories = [
        { key: "trending", label: "Trending", icon: <MdWhatshot className='w-5 h-5' /> },
        { key: "villa", label: "Villa", icon: <GiFamilyHouse className='w-5 h-5' /> },
        { key: "farmHouse", label: "Farm House", icon: <FaTreeCity className='w-5 h-5' /> },
        { key: "poolHouse", label: "Pool House", icon: <MdOutlinePool className='w-5 h-5' /> },
        { key: "rooms", label: "Rooms", icon: <MdBedroomParent className='w-5 h-5' /> },
        { key: "flat", label: "Flat", icon: <BiBuildingHouse className='w-5 h-5' /> },
        { key: "pg", label: "PG", icon: <IoBedOutline className='w-5 h-5' /> },
        { key: "cabin", label: "Cabins", icon: <GiWoodCabin className='w-5 h-5' /> },
        { key: "shops", label: "Shops", icon: <SiHomeassistantcommunitystore className='w-5 h-5' /> },
    ]

    return (
        <div className='fixed top-0 bg-white z-[20] w-full shadow-md border-b border-gray-100 backdrop-blur-sm bg-opacity-95  mb-[80px]'>

            {/* Top Bar */}
            <div className='w-full px-3 sm:px-4 md:px-8 py-3  md:h-[70px] flex items-center justify-between gap-2 sm:gap-3 md:gap-4 bg-red-200'>
                {/* Logo */}
                <div className='flex-shrink-0 hover:opacity-80 transition-opacity duration-200 '>
                    <img src={logo} alt="Logo" className='w-12 sm:w-20 md:w-[140px] h-auto' />
                </div>

                {/* Search — desktop */}
                <div className='w-full max-w-[380px] relative hidden md:block'>
                    <input
                        type="text"
                        className='w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-full outline-none text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all shadow-sm hover:shadow-md'
                        placeholder='Anywhere  ·  Any Location  ·  Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-full transition-all duration-200 shadow-md hover:shadow-lg'>
                        <FiSearch className='w-4 h-4 text-white' />
                    </button>
                </div>

                {/* Right Actions */}
                <div className='flex items-center gap-2 sm:gap-3 relative flex-shrink-0'>
                    {/* <span
                        className='hidden md:block text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 sm:px-4 py-2 rounded-full cursor-pointer transition-all duration-200 hover:text-gray-900'
                        onClick={() => navigate("/listingpage1")}
                    >
                        List your home
                    </span> */}
                
                    <span className="cursor-pointer text-gray-700 hover:text-red-600 font-medium transition-colors duration-200" onClick={()=>{
                        navigate('/about')
                    }}>About</span>
                    <button
                        className='flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border-2 border-gray-300 rounded-full hover:border-gray-400 hover:shadow-md transition-all duration-200 active:scale-95 bg-white'
                        onClick={() => setShowpopup(prev => !prev)}
                    >
                        <GiHamburgerMenu className='w-4 h-4 text-gray-600' />
                        {userData == null
                            ? <CgProfile className='w-4 h-4 text-gray-600' />
                            : <span className='w-6 h-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md'>{userData?.name.slice(0, 1).toUpperCase()}</span>
                        }
                    </button>

                    {/* Dropdown Menu */}
                    {showpopup && (
                        <div className='absolute top-[calc(100%+12px)] right-0 w-52 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
                            <ul className='py-2 text-sm text-gray-700'>
                                {!userData && (
                                    <li className='px-4 py-3 hover:bg-rose-50 cursor-pointer font-semibold text-gray-900 hover:text-rose-600 transition-colors duration-150' onClick={() => { navigate("/login"); setShowpopup(false) }}>Login</li>
                                )}
                                {!userData && (
                                    <li className='px-4 py-3 hover:bg-rose-50 cursor-pointer font-semibold text-gray-900 hover:text-rose-600 transition-colors duration-150' onClick={() => { navigate("/signup"); setShowpopup(false) }}>Sign Up</li>
                                )}
                                {userData && (
                                    <li className='px-4 py-3 hover:bg-red-50 cursor-pointer font-semibold text-red-600 hover:text-red-700 transition-colors duration-150' onClick={() => { handleLogOut(); setShowpopup(false) }}>Logout</li>
                                )}
                                <div className='my-2 border-t-2 border-gray-100' />
                                <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150' onClick={() => { navigate("/listingpage1"); setShowpopup(false) }}>List your Home</li>
                                <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150' onClick={() => { navigate("/mylisting"); setShowpopup(false) }}>My Listings</li>
                                <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-150' onClick={() => { navigate("/mybooking"); setShowpopup(false) }}>My Bookings</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Search — mobile */}
            <div className='md:hidden px-3 sm:px-4 py-2.5 border-b-2 border-gray-100'>
                <div className='relative w-full'>
                    <input
                        type="text"
                        className='w-full pl-4 pr-12 py-2.5 border-2 border-gray-300 rounded-full outline-none text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all shadow-sm hover:shadow-md'
                        placeholder='Anywhere  ·  Any Location  ·  Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-full transition-all duration-200 shadow-md hover:shadow-lg'>
                        <FiSearch className='w-4 h-4 text-white' />
                    </button>
                </div>
            </div>

            {/* Search Results Dropdown */}
            {input.length > 0 && searchData?.length > 0 && (
                <div className='absolute top-full left-0 w-full flex justify-center z-50 px-3 sm:px-4 pt-2'>
                    <div className='w-full max-w-[600px] bg-white border-2 border-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[320px] overflow-y-auto'>
                        {searchData.map((search) => (
                            <div
                                key={search._id}
                                className='px-4 py-3.5 border-b border-gray-100 last:border-0 hover:bg-rose-50 cursor-pointer text-sm text-gray-700 transition-colors duration-150 active:bg-rose-100'
                                onClick={() => handleClick(search._id)}
                            >
                                <span className='font-semibold text-gray-900'>{search.title}</span>
                                <span className='text-gray-400 text-xs'> · {search.landMark}, {search.city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Bar */}
            <div className='w-full h-auto sm:h-16 flex items-center gap-4 sm:gap-5 overflow-x-auto px-3 sm:px-4 md:px-8 md:justify-center scrollbar-hide py-2.5 sm:py-0 border-t border-gray-100  '>
                {categories.map(({ key, label, icon }) => (
                    <button
                        key={key}
                        onClick={() => { handleCategory(key); if (key === "trending") setCate("") }}
                        className={`flex flex-col items-center justify-center gap-1 flex-shrink-0 text-[11px] sm:text-xs font-semibold pb-2 sm:pb-1 border-b-2 transition-all duration-200 hover:scale-105 active:scale-95
                            ${cate === key
                                ? 'border-rose-500 text-rose-600 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                    >
                        <span className={`text-base sm:text-lg transition-colors duration-200 ${cate === key ? 'text-rose-600' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</span>
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Nav