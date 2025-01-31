import React from 'react'
import PlaceCardItem from './placeCardItem'
const PlacesToVisit = ({ trip }) => {

    return (
        <div>
            <h2 className='mt-7 font-bold text-lg'>Places to Visit</h2>
            <div >
                {trip?.tripData?.itinerary?.map((days, index) => (
                    <div key={index} className='mt-3'>
                        <h2 className='font-medium text-lg'>This is {days.day} </h2>
                        <div className='grid md:grid-cols-2 gap-5 mt-2'>
                            {days.plan.map((place, ind) => (
                                <div key={ind} className='my-3'>
                                    <h2 className='font-medium text-sm text-orange-600'>{place?.travelTime}</h2>
                                    <PlaceCardItem place={place} />
                                    {/* <h2>{place?.placeName}</h2> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit
