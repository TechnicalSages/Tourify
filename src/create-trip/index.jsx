import { useState } from "react";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const API_KEY = "b971fc8a60a441568c30d6b4fedcf2e5";

  const fetchSuggestions = async (input) => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
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

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        We need some basic information to generate a customized itinerary based on your preferences.
      </p>
      
      <div>
        <h2 className="text-xl my-5 font-medium">What is the destination choice?</h2>
        
        {/* Input field for the place */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Start typing a place..."
          className="border p-2 w-full rounded mt-3"
        />
        
        {/* Suggestions list */}
        <ul className="border mt-2 rounded">
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
    </div>
  );
}

export default CreateTrip;
