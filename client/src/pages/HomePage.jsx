import { useEffect } from "react";
import { useAuth } from "../context/auth/authProvider";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const HomePage = () => {
   const { user, logout, isAuthenticated, loading } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (!loading && !isAuthenticated()) {
         navigate("/login");
      }
   }, [loading, isAuthenticated, navigate]);

   if (loading) return (
      <div className="h-screen flex items-center justify-center">
         <div className="animate-spin h-10 w-10 border-4 border-green-600 rounded-full border-t-transparent"></div>
      </div>
   );

   return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
         <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
            <div className="flex flex-col items-center mb-6">
               <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <User size={48} className="text-green-700" />
               </div>
               <h2 className="text-2xl font-semibold text-center text-green-700">
                  Welcome, {user?.username || "User"}!
               </h2>
               <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-4">
               <div className="bg-green-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-green-800 mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm">
                     <p className="flex justify-between">
                        <span className="text-gray-600">Username:</span>
                        <span className="font-medium">{user?.username || "Not available"}</span>
                     </p>
                     <p className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{user?.email || "Not available"}</span>
                     </p>
                     <p className="flex justify-between">
                        <span className="text-gray-600">Account created:</span>
                        <span className="font-medium">
                           {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Not available"}
                        </span>
                     </p>
                  </div>
               </div>

               <button
                  onClick={() => {
                     logout();
                     navigate("/login");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
               >
                  <LogOut size={18} />
                  Logout
               </button>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
