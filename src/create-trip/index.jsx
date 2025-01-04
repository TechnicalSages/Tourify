import GooglePlacesAutocomplete from "react-google-places-autocomplete"
function CreateTrip() {
    return (
      <div className="sm:px-10 md:px-32 lg:56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">We need some basic information to generate a customized itinerary based on your preferences.</p>
        
        <div className="">
          <div>
            <h2 className="text-xl my-5 font-medium">What is the destination choice?</h2>
            <GooglePlacesAutocomplete
             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            />
              
            
          </div>
        </div>

      </div>
    )
  }
  
  export default CreateTrip
  