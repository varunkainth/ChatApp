import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signup/signup";
import Home from "./pages/home/home";
import { useAuthContext } from "./context/authcontext";
import {Toaster as ToasterShadcn} from "./components/ui/toaster"
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-4 h-screen flex items-center justify-center ">
        <Routes>
          <Route path="/" element={authUser?<Home />:<Navigate to="/login/"/>} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> :<Login />} />
          <Route
            path="signup"
            element={authUser ? <Navigate to="/login" /> : <SignUp />}
          />
        </Routes>
        <Toaster />
        <ToasterShadcn />
      </div>
    </ThemeProvider>
  );
}

export default App;
