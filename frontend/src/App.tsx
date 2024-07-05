import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signup/signup";
import Home from "./pages/home/home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authcontext";

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
      </div>
    </ThemeProvider>
  );
}

export default App;
