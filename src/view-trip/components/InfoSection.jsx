//eslint-disable-next-line no-unused-vars
import axios from 'axios';
import React, {useState , useEffect} from 'react'
import { FaShare } from 'react-icons/fa'
import { Button } from "@/components/ui/button"; // Replace 'your-button-library' with the actual library name
// import PropTypes from 'prop-types'

const InfoSection = ({ trip }) => {
    const [imageUrl, setImageUrl] = useState("/travel_background.svg"); // Default placeholder

    useEffect(() => {
        if (trip?.userSelection?.destination) {
            fetchImage(trip?.userSelection?.destination);
        }
    }, [trip?.userSelection?.destination]);

    const fetchImage = async (destination) => {
        
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${destination}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        if (data.results.length > 0) {
            setImageUrl(data.results[0].urls.regular); // Set the first image
        }
    };

    return (
        <>
            <div>
                <img src= {imageUrl} alt="This is an placeholder" className="w-full h-[400px] md:h-[500px] lg:h-[400px] rounded-xl overflow-hidden" />
                <div className='flex justify-between items-center'>


                    <div className='my-5 flex flex-col gap-2'>
                        <h2 className="font-bold text-2xl">{trip?.userSelection?.destination}</h2>
                        <div className='flex gap-5'>
                            <h2 className='p-1 px-3 bg-gray-200 font-bold rounded-full sm:text-xs py-5 md:text-md'>🗓️ {trip?.userSelection?.TravelDuration}Day</h2>
                            <h2 className='p-1 px-3 bg-gray-200 font-bold rounded-full sm:text-xs py-5 md:text-md'>💸 {trip?.userSelection?.budget} Budget : </h2>
                            <h2 className='p-1 px-3 bg-gray-200 font-bold rounded-full sm:text-xs py-5 md:text-md'>🥂 No. of Travelers: {trip?.userSelection?.traveler}  </h2>
                        </div>
                    </div>
                    <Button variant="secondary"><FaShare /></Button>
                </div>
            </div>
        </>

    )
}
export default InfoSection

