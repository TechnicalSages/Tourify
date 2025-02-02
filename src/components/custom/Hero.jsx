import { Button } from "../ui/button"
import { Link } from "react-router-dom"

function Hero() {
    return (
      <div className="flex flex-col items-center mx-56 gap-9 mt-36">
          <h1 className="font-extrabold text-[45px] text-center mt-16">
            <span className="text-[#f56551]">Plan Your Dream Vacation</span> with Smart AI Recommendations.</h1>
          <p className="text-xl text-gray-500 text-center">Effortlessly plan your next getaway with AI-driven insights. Say goodbye to stress and hello to unforgettable trips.</p>

          <Link to={'/create-trip'}><Button variant="secondary">Get Started Its Free!</Button></Link>
          
      </div>
    )
  }
  
  export default Hero
  