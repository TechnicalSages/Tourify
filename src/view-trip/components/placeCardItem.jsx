import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const placeCardItem = ({ place }) => {
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=` + place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 flex gap-5 mt-2 overflow-auto hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img className="w-[130px] h-[130px] rounded-xl" src="/travel_background.svg" alt="This is placeholder" />
                <div >
                    <h2 className='font-bold text-lg mt-[3rem]'>{place?.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place?.placeDetails}</p>
                    <h2 className='mt-2'>🕜 {place?.travelTime}</h2>
                </div>
            </div>
        </Link>
    )
}

export default placeCardItem
