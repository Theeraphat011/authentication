import { useAuth } from "../context/auth/authProvider";

const HomePage = () => {
   const { user, logout } = useAuth();

   return (
      <div>
         <h1>Welcome {user ? "user" : "Guest"}</h1>
         {user && <button onClick={logout}>Logout</button>}
      </div>
   );
};
export default HomePage;
