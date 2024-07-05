import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/authcontext";
import toast from "react-hot-toast";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      // Extract access token from localStorage and remove surrounding quotes
      let accessToken = localStorage.getItem("access-token");
      if (accessToken) {
        accessToken = accessToken.replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if present
      }

      // console.log(accessToken);
      

      // Set the Authorization header with the access token
      
       const headers = {
          Authorization: `Bearer${accessToken} `,
        }
        // console.log(headers);
        
      


      // Make the logout request with axios
      const res = await axios.post(
        `https://potential-space-succotash-j7x4wrqqphpp4v-5000.app.github.dev/api/auth/logout`,
        {},
        {headers}
        
      );

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      // Remove accessToken from localStorage
      localStorage.removeItem("access-token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Chat_APP");

      // Clear the auth user context
      setAuthUser(null);

      toast.success("Logout successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        // Handle Axios-specific errors
        toast.error(
          error.response?.data.error || "Logout Failed. Please try again."
        );
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
