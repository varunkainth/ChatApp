import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./pages/login/login";
import { SignUp } from "./pages/signup/signup";
import Home from "./pages/home/home";
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-4 h-screen flex items-center justify-center ">
       <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="signup" element={<SignUp/>}/>

       </Routes>
       <Toaster/>
      </div>
    </ThemeProvider>
  );
}

export default App;
