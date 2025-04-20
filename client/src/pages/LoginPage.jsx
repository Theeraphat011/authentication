import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authProvider";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { login, isAuthenticated, loading } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (!loading && isAuthenticated()) {
         navigate("/");
      }
   }, [loading, isAuthenticated, navigate]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
         console.log("Attempting login with:", email, password);
         await login(email, password);
         console.log("Login successful, navigating to /");
         navigate("/");
      } catch (err) {
         console.error("Login failed:", err);
         setError(err.message);
      }
   };

   if (loading) return <div>Loading...</div>;
   if (isAuthenticated()) return null;

   return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
         <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
               Login to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
               {error && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-md text-sm">
                     <AlertCircle size={18} />
                     {error}
                  </div>
               )}

               <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Enter your email"
                     className="w-full px-3 py-2 border rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-0"
                  />
               </div>

               <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                     Password
                  </label>
                  <div className="relative">
                     <input
                        id="password"
                        type={showPassword ? "password" : "text"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-0"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                     >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
               >
                  {loading && (
                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                     </svg>
                  )}
                  {loading ? "Logging in..." : "Login"}
               </button>

               <p className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-green-600 hover:underline">
                     Register here
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
