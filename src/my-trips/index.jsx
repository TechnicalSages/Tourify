import { db } from '@/service/firebaseConfig';
import { collection, query, getDocs, where} from 'firebase/firestore';
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips(){

  const navigate = useNavigate();
  const [userTrips , setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrip();
  }, [navigate]);
  
  const GetUserTrip= async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user || !user.email){
      console.error("user not found");
      navigate('/');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db , 'AITrips') , where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  }

  return (
    
    <div className='mt-36 sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-xl'>My Trips</h2>
      <div className='lg: grid grid-cols-2 mt-10 md:grid-cols-2 gap-20 mt:10 sm:grid-cols-1'>
        {userTrips?.length>0? userTrips.map((trip , index)=>(
          <UserTripCardItem key={index} trip={trip}/>
        ))
        :[1 ,2 ,3 ,4 ,5 ,6].map((item , index)=>(
          <div className='h-80 w-full bg-slate-200 animate-pulse rounded-xl' key={index}>
            
          </div>
        ))
      
      }
      </div>
    </div>
  )
}

export default MyTrips
