import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({ trip }) => {
    const [hotelImages, setHotelImages] = useState({});

    useEffect(() => {
        const fetchHotelImages = async () => {
            if (!trip?.tripData?.hotels) return;

            const fetchImage = async (hotelName) => {
                try {
                    const response = await fetch(`https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
                    const data = await response.json();
                    return data.results.length > 0 ? data.results[0].urls.small : "/logo.svg";
                } catch (error) {
                    console.error("Error fetching hotel image from Unsplash:", error);
                    return "/logo.svg";
                }
            };

            const images = {};
            for (const hotel of trip.tripData.hotels) {
                images[hotel.hotelName] = await fetchImage(hotel.hotelName);
            }
            setHotelImages(images);
        };

        fetchHotelImages();
    }, [trip?.tripData?.hotels]);

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)},${encodeURIComponent(hotel?.hotelAddress)}`} target='_blank'>
                        <div className='hover:scale-105 transition-all cursor-pointer'>
                            <img 
                                src={hotelImages[hotel.hotelName] || "/logo.svg"} 
                                alt={hotel?.hotelName} 
                                className='rounded-lg w-full h-[150px] object-cover' 
                            />
                            <div className='flex flex-col gap-2 mt-2'>
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                                <h2 className='text-xs'>💰 {hotel?.hotelCharges?.min} to {hotel?.hotelCharges?.max} per night</h2>
                                <h2 className='text-xs'>{hotel?.rating}⭐ Ratings</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
