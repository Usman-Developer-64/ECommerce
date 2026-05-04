import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-2xl">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Private;