import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Agar loading khatam ho gayi aur user login nahi hai
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in"); 
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Jab tak Clerk load ho raha hai, tab tak loading dikhayein
  if (!isLoaded) {
    return <div><Loader2 className="animate-spin" /></div>;
  }

  return isSignedIn ? children : null;
};

export default ProtectedRoute;