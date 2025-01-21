//eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaShare } from 'react-icons/fa'
import { Button } from "@/components/ui/button"; // Replace 'your-button-library' with the actual library name
// import PropTypes from 'prop-types'
const InfoSection = ({ trip }) => {
    console.log("The tripdata is ", trip);
    return (
        <>
            <div>
                <img src="/travel_background.svg" alt="This is an placeholder" className='h-[340px] object-cover w-full rounded-xl' />
                <div className='flex justify-between items-center'>


                    <div className='my-5 flex flex-col gap-2'>
                        <h2 className="font-bold text-2xl">{trip?.userSelection?.destination}</h2>
                        <div className='flex gap-5'>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs py-5 md:text-md'>🗓️ {trip?.userSelection?.TravelDuration}Day</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs py-5 md:text-md'>💸 {trip?.userSelection?.budget} Budget : </h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs py-5 md:text-md'>🥂 No. of Travelers: {trip?.userSelection?.traveler}  </h2>
                        </div>
                    </div>
                    <Button variant="secondary"><FaShare /></Button>
                </div>
            </div>
        </>

    )
}
export default InfoSection

