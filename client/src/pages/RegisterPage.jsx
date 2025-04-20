import { useState } from "react";
import { registerUser } from "../api/register";

const RegisterPage = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");
   const [validationErrors, setValidationErrors] = useState([]);

   const handleRegister = async (e) => {
      e.preventDefault();
      setError("");
      setValidationErrors([]);

      if (password !== confirmPassword) {
         setError("Passwords do not match!");
         return;
      }

      try {
         await registerUser({ username, email, password });
         alert("Register success!");
         setUsername("");
         setEmail("");
         setPassword("");
         setConfirmPassword("");
      } catch (err) {
         console.error(err);
         if (err.data?.errors) {
            setValidationErrors(err.data.errors);
         }
      }
   };

   return (
      <form onSubmit={handleRegister}>
         {error && <p style={{ color: "red" }}>{error}</p>}
         {validationErrors.length > 0 && (
            <ul style={{ color: "red" }}>
               {validationErrors.map((err, index) => (
                  <li key={index}>{err.msg}</li>
               ))}
            </ul>
         )}
         <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
         />
         <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
         />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
         />
         <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
         />
         <button type="submit">Register</button>
      </form>
   );
};

export default RegisterPage;
