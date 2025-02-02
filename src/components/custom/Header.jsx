import { useState , useEffect } from "react";
import { Button } from "../ui/button"
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  // DialogTrigger,
} from "@/components/ui/dialog"

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setopenDialog] = useState(false);

    
  useEffect(() => {
    console.log(user);
  }, [user]);

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setopenDialog(false);
        window.location.reload();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md p-3 flex justify-between items-center px-5">
      <a href="/"><img src="./logo.svg" alt="Logo" /></a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-white">+ Create a Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-white">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="h-[35px] w-[35px] rounded-full" alt="User" />
              </PopoverTrigger>
              
              
                <PopoverContent className="w-[100px] h-auto flex justify-center items-center p-2 text-sm font-medium bg-white shadow-md rounded-md">
                <a href="/">
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </h2>
                  </a>  
                </PopoverContent>
              
              
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setopenDialog(true)} variant="secondary">
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="src/assets/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
