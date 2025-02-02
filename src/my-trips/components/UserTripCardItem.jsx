import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

    const [imageUrl, setImageUrl] = useState(""); // Default placeholder
    
    useEffect(() => {
            if (trip?.userSelection?.destination) {
                fetchImage(trip?.userSelection?.destination);
            }
        }, [trip?.userSelection?.destination])

    const fetchImage = async (destination) => {
        
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${destination}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        if (data.results.length > 0) {
            setImageUrl(data.results[0].urls.regular); // Set the first image
        }
    };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <div className="bg-slate-200 w-72 h-80 rounded-xl">
            <img className="object-cover overflow-hidden rounded-xl w-72 h-48" src={imageUrl} alt="" />

            <div className='flex items-center justify-center'>
                <h2>{trip?.userSelection?.destination}</h2>
            </div>
            <div className="flex grid grid-cols-3 gap-1 items-start">
                <h2 className='p-1 px-3 font-bold sm:text-xs py-5 md:text-md'>🗓️ {trip?.userSelection?.TravelDuration}Day</h2>
                <h2 className='p-1 px-3 font-bold sm:text-xs py-5 md:text-md'>💸 {trip?.userSelection?.budget}</h2>
                <h2 className='p-1 px-3 font-bold  sm:text-xs py-5 md:text-md'>🥂 No. of Travelers: {trip?.userSelection?.traveler}  </h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
