import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Card from '../Component/Card';
import { listingDataContext } from '../Context/ListingContext';

function Home() {
    let { newListData } = useContext(listingDataContext)

    return (
        // 1. Padding-top ko kam kiya (Nav ki total height ke hisaab se adjust karein)
        // 2. Background color ko clean white rakha
        <div className='min-h-screen bg-white'>
            <Nav />
            <div className="h-[60px] md:h-[5px]"></div>
            {/* Spacer div taaki content Nav ke neeche na chhupe */}
            <div className="h-[160px] md:h-[150px]"></div>

            <main className='w-full max-w-[1500px] mx-auto px-4 md:px-8 pb-16'>
                {/* Grid system: Mobile 1 column, Tablet 2, Laptop 3, Large 4 */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {newListData.map((list) => (
                        <div key={list._id} className="w-full">
                            <Card
                                title={list.title}
                                landMark={list.landMark}
                                city={list.city}
                                image1={list.image1}
                                image2={list.image2}
                                image3={list.image3}
                                rent={list.rent}
                                id={list._id}
                                ratings={list.ratings}
                                isBooked={list.isBooked}
                                host={list.host}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Home