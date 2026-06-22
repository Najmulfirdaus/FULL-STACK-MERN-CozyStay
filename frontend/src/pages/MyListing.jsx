import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';

function MyListing() {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)

    useEffect(() => {
        console.log("Current User Data:", userData);
    }, [userData]);

    if (!userData || !userData.listing) {
        return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    }

    return (
        <div className='min-h-screen bg-gray-50 pb-10'>
            {/* Header Section */}
            <div className='relative w-full p-6 flex flex-col items-center'>
                <div 
                    className='w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-6 left-6 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors' 
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeftLong className='w-[25px] h-[25px] text-white' />
                </div>
                
                <div className='w-full max-w-[600px] border-2 border-gray-300 py-4 flex items-center justify-center text-3xl rounded-lg text-gray-800 font-bold mt-16 bg-white shadow-sm'>
                    MY LISTING
                </div>
            </div>

            {/* Grid Container for Cards */}
            <main className='w-full max-w-[1200px] mx-auto px-4 mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {userData.listing.map((list) => (
                        <div key={list._id} className="w-full flex justify-center">
                            <Card 
                                title={list.title} 
                                landMark={list.landMark} 
                                city={list.city} 
                                image1={list.image1} 
                                image2={list.image2} 
                                image3={list.image3} 
                                rent={list.rent} 
                                id={list._id} 
                                isBooked={list.isBooked} 
                                ratings={list.ratings} 
                                host={list.host}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default MyListing