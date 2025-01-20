// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
// console.log("API KEY IS", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with Cheap budget, Give me a Hotels options list with Hotel Name, Hotel Address, Price , Image URL , Geo Coordinates, rating, descriptions and suggest itinerary with place name , place Details, Place Image URL, ticket Pricing , rating , Time to  travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "Okay, I see the structure you're aiming for. You want each day in the `itinerary` to have a `plan` array, where each item in the `plan` array is an object representing a place to visit, with details like `geoCoordinates`, `placeDetails`, etc.\n\nHere's the JSON structure reflecting that change:\n\n```json\n{\n  \"tripName\": \"Ladakh Luxury Escape\",\n  \"duration\": \"1 Day\",\n  \"travelers\": \"2 People\",\n  \"budget\": \"Luxury\",\n  \"currency\": \"INR\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Grand Dragon Ladakh\",\n      \"hotelAddress\": \"Old Road, Sheynam, Leh, Ladakh 194101\",\n      \"hotelCharges\": {\n        \"min\": 15000,\n        \"max\": 30000\n      },\n      \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a8/33/77/the-grand-dragon-ladakh.jpg?w=700&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 34.1519,\n        \"longitude\": 77.5732\n      },\n      \"rating\": 4.5,\n      \"description\": \"A luxury hotel offering exquisite rooms, excellent dining, and panoramic views of the Himalayas.\"\n    },\n    {\n      \"hotelName\": \"Hotel Ladakh Sarai\",\n      \"hotelAddress\": \"Fort Road, Leh, Ladakh 194101\",\n      \"hotelCharges\": {\n        \"min\": 12000,\n        \"max\": 25000\n      },\n      \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/51/2e/c7/hotel-ladakh-sarai.jpg?w=700&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 34.1606,\n        \"longitude\": 77.5819\n      },\n      \"rating\": 4.3,\n      \"description\": \"A luxurious hotel with spacious rooms, a lovely garden and good views of the Himalayan mountains.\"\n    },\n    {\n      \"hotelName\": \"Chamba Camp Thiksey\",\n      \"hotelAddress\": \"Thiksey Village, Leh, Ladakh 194101\",\n      \"hotelCharges\": {\n        \"min\": 20000,\n        \"max\": 40000\n      },\n      \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0b/6d/a4/chamba-camp-thiksey.jpg?w=700&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 34.0576,\n        \"longitude\": 77.6655\n      },\n      \"rating\": 4.8,\n      \"description\": \"A luxury glamping experience with lavish tents, gourmet food, and exceptional service.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"theme\": \"Cultural Immersion and Scenic Beauty\",\n      \"bestTimeToVisit\": \"Morning to Evening\",\n      \"plan\": [\n        {\n           \"geoCoordinates\": {\n              \"latitude\": 34.0578,\n              \"longitude\": 77.6700\n            },\n          \"placeName\": \"Thiksey Monastery\",\n          \"placeDetails\": \"A stunning Tibetan Buddhist monastery perched atop a hill, offering breathtaking views of the Indus Valley.\",\n          \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/79/2f/c0/thiksey-monastery.jpg?w=700&h=-1&s=1\",\n          \"ticketPricing\": \"50\",\n          \"rating\": 4.7,\n          \"travelTime\": \"45 minutes drive from Leh City\"\n        },\n        {\n            \"geoCoordinates\": {\n               \"latitude\": 34.0722,\n               \"longitude\": 77.6470\n            },\n          \"placeName\": \"Shey Palace\",\n          \"placeDetails\": \"The ruins of the ancient Shey Palace and monastery, with a large Buddha statue.\",\n          \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/02/69/f3/shey-palace.jpg?w=700&h=-1&s=1\",\n          \"ticketPricing\": \"30\",\n          \"rating\": 4.3,\n          \"travelTime\": \"15 minutes drive from Thiksey Monastery\"\n        },\n        {\n          \"geoCoordinates\": {\n            \"latitude\": 33.9694,\n            \"longitude\": 77.6976\n           },\n          \"placeName\": \"Hemis Monastery\",\n          \"placeDetails\": \"The largest monastery in Ladakh, known for its rich collection of artifacts and annual festival.\",\n          \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/22/21/1a/hemis-monastery.jpg?w=700&h=-1&s=1\",\n          \"ticketPricing\": \"50\",\n          \"rating\": 4.6,\n          \"travelTime\": \"40 minutes drive from Shey Palace\"\n        },\n        {\n            \"geoCoordinates\": {\n              \"latitude\": 34.1703,\n              \"longitude\": 77.5790\n            },\n          \"placeName\": \"Shanti Stupa\",\n          \"placeDetails\": \"A white-domed Buddhist stupa offering panoramic views of Leh and surrounding mountains.\",\n          \"imageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/c8/3f/c7/shanti-stupa.jpg?w=700&h=-1&s=1\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.7,\n          \"travelTime\": \"50 minutes drive from Hemis Monastery\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Key Changes:**\n\n1.  **`plan` Array:**  Each day object in the `itinerary` array now includes a `plan` key.\n2.  **Plan Details:** The `plan` key is an array, and each item in this array is an object containing the details of a place to visit (`geoCoordinates`, `placeDetails`, `imageURL`, etc).\n3. The geoCoordinates have also been shifted inside the plan as requested in the image.\n\n**Explanation:**\n\n*   I've removed the `activities` array and replaced it with a `plan` array, which is inside each day's itinerary object.\n*   The `plan` array contains objects, and each object represents a place on the plan, with its properties.\n* This new structure should match the image you provided, where `itinerary` contains an array of objects, each having a `day` value, and a `plan` array for each of these objects.\n\nNow, this JSON structure should accurately reflect the format you're looking for. Let me know if there are any further modifications you would like to make.\n" },
            ],
        },
    ],
});

