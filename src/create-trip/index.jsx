import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setformData] = useState([]);
  const API_KEY = "b971fc8a60a441568c30d6b4fedcf2e5";

  const fetchSuggestions = async (input) => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
      console.log(data.features);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };
  // Added on 5/1/25 and holds all data regarding trip
  const handleFormData = (key, value) => {
    setformData({
      ...formData,
      [key]: value
    })
  }
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.properties.formatted);
    handleFormData('destination', suggestion.properties.formatted)
    setSuggestions([]);
  }
  // Fucntion that generates the trip 
  const onGenerateTrip = () => {
    if (formData?.TravelDuration == 5) {
      console.log("Pagal jhala ka?");
      return;
    }
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏖️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        We need some basic information to generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">

        {/* This is AUTOCOMOPLETE part*/}
        <div>
          <h2 className="text-xl my-5 font-medium">What is the destination choice?</h2>

          {/* Input field for the place */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Start typing a place..."
            className="border-2 p-2 w-full rounded mt-3" // Increased border size
          />

          {/* Suggestions list without border and separator */}
          <ul className="mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.properties.formatted}
              </li>
            ))}
          </ul>
        </div>

        {/* This */}
        <div>
          <h2 className="text-xl my-5 font-medium">How many days are you planning for the trip?</h2>
          <Input placeholder={'Ex.3'} type='number' onChange={(e) => { handleFormData('TravelDuration', e.target.value) }} />
        </div>

      </div>
      <div>
        <h2 className="text-xl my-5 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* Budget options are displayed here */}
          {SelectBudgetOptions.map((items, index) => (
            <div key={index}
              onClick={() => handleFormData('budget', items.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == items.title && 'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-lg">{items.title}</h2>
              <h2 className="text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* Travel list options */}
        <h2 className="text-xl my-5 font-medium">What do you plan on traveling?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* Travel options are displayed here */}
          {SelectTravelList.map((items, index) => (
            <div key={index}
              onClick={() => handleFormData('traveler', items.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler == items.people && 'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-lg">{items.title}</h2>
              <h2 className="text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Button to generate trip  */}
      <div className="my-10 justify-end flex">
        <Button onClick={() => onGenerateTrip} variant="secondary">Create Your Trip!</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
