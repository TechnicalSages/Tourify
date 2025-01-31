import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  // DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setformData] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchSuggestions = async (input) => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${import.meta.env.VITE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("respone is now", data);
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
  // Login function
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  })
  // Fucntion that generates the trip 
  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setopenDialog(true);
      return;
    }
    if (!formData?.destination || !formData?.budget || !formData?.traveler || !formData?.TravelDuration
    ) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.TravelDuration)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.TravelDuration)
    // console.log(FINAL_PROMPT)
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    setLoading(false);
    SaveAITrip(result.response?.text());
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.acess_token}`,
        Accept: "Application/json"
      }
    }
    ).then((response) => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response.data));
      setopenDialog(false);
      onGenerateTrip();
    })
  }

  const SaveAITrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
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
        <Button
          onClick={() => onGenerateTrip()} variant="secondary"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            : 'Create Your Trip!'}
        </Button>

      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="src\assets\logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in to the app with google authentication securily </p>
              <Button

                onClick={login}
                className="w-full mt-5 flex gap-4 items-center" >


                <FcGoogle className="h-7 w-7" />Sign in with Google


              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
