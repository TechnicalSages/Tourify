// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
const Viewtrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);
    // Used to get info from firestores
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document");
            toast('no trip found');
        }
    }
    console.log("trip is ", trip)
    return (
        <div className='mt-36 p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information section */}
            {/* <img src="/travel_background.svg" alt="" /> */}
            <InfoSection trip={trip} />
            {/* recommended hotel */}
            <Hotels trip={trip} />
            {/* Daily plan */}
            <PlacesToVisit trip={trip} />
            {/* Fotter */}
            <Footer trip={trip} />
        </div>
    )
}
export default Viewtrip;
