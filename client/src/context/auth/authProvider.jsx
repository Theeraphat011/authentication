import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [tokenCheck, setTokenCheck] = useState(null);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const token = Cookies.get("refreshToken");
      setTokenCheck(token);

      if (!token) {
         console.log("No token found");
         setLoading(false);
         setUser(null);
         return;
      }

      const fetchAccessToken = async () => {
         try {
            const res = await api.post("/auth/refresh", { token: token });

            setUser({
               accessToken: res.data.accessToken,
               ...(res.data.user || {}),
            });
         } catch (err) {
            console.error("Failed to refresh token:", err);
            setTokenCheck(null);
            setUser(null);
            Cookies.remove("refreshToken", { path: "/" });
         } finally {
            setLoading(false);
         }
      };

      fetchAccessToken();
   }, [navigate]);

   const registerUser = async (userData) => {
      console.log(userData);
      try {
         const { data } = await api.post("/auth/register", userData);
         return data;
      } catch (error) {
         console.error("Registration error:", error.response?.data);
         throw error.response || new Error("Registration failed");
      }
   };

   const login = async (email, password) => {
      try {
         const res = await api.post("/auth/login", { email, password });

         setUser({
            accessToken: res.data.accessToken,
            ...(res.data.user || {}),
         });

         Cookies.set("refreshToken", res.data.refreshToken, { path: "/" });
         setTokenCheck(res.data.refreshToken);

         return res.data;
      } catch (err) {
         console.error("Login error", err);
         throw new Error("Login failed. Please check your credentials.");
      }
   };

   const logout = () => {
      setUser(null);
      setTokenCheck(null);
      Cookies.remove("refreshToken", { path: "/" });
   };

   const isAuthenticated = () => {
      return !!tokenCheck;
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            login,
            logout,
            tokenCheck,
            loading,
            isAuthenticated,
            registerUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
