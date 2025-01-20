// eslint-disable-next-line
import React from 'react'
import { Link } from 'react-router-dom';
const Hotels = ({ trip }) => {
    console.log("options are", trip?.tripData?.hotels);
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=` + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
                        <div className='hover:scale-105 transition-all cursor-pointer'>
                            <img src="/logo.svg" alt="Hotel image" className='rounded-lg' />
                            <div className='flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                                <h2 className='text-xs'>💰 {hotel?.hotelCharges?.min} to {hotel?.hotelCharges?.max} per night </h2>
                                <h2 className='text-xs'>{hotel?.rating}⭐ Ratings </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels
