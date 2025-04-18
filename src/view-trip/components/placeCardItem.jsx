import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const PlaceCardItem = ({ place }) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${place?.placeName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                    setImageUrl(data.results[0].urls.small);
                }
            } catch (error) {
                console.error("Error fetching image from Unsplash:", error);
            }
        };

        fetchImage();
    }, [place?.placeName]);

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=` + place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 flex gap-5 mt-2 overflow-auto hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img className="w-[130px] h-[130px] rounded-xl" src={imageUrl || place?.imageURL} alt="This is placeholder" />
                <div >
                    <h2 className='font-bold text-lg mt-[3rem]'>{place?.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place?.placeDetails}</p>
                    <h2 className='mt-2'>🕜 {place?.travelTime}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
