import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authProvider";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { login, tokenRefresh } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (!tokenRefresh) {
         navigate("/login");
         return;
      }
   }, [navigate, tokenRefresh]);

   const handleSubmit = async (e) => {
      e.preventDefault();
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

   return (
      <div>
         <form action="" onSubmit={handleSubmit}>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="enter your email"
            />
            <input
               type="text"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="enter your Password"
            />
            <button type="submit">Login</button>
         </form>
         {error && <p>{error}</p>}
      </div>
   );
};
export default LoginPage;
