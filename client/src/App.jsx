import { BrowserRouter as Router } from "react-router-dom"; // ใช้ BrowserRouter แทน Router
import { AuthProvider } from "./context/auth/authProvider";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
   return (
      <>
         <Router>
            <AuthProvider>
               <AppRoutes />
            </AuthProvider>
         </Router>
      </>
   );
}

export default App;
