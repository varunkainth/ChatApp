import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authcontext";

type LoginData = { usernameOrEmail: string; password: string };

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Ensure this is inside the hook body

  const login = async ({ usernameOrEmail, password }: LoginData) => {
    setLoading(true);
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
      const data = isEmail
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      const res = await axios.post(
        `https://potential-space-succotash-j7x4wrqqphpp4v-5000.app.github.dev/api/auth/login`,
        data
      );

      toast.success(res.data.message)

      if (res.data.error) {
        throw new Error(res.data.error);
      }
      localStorage.setItem("Chat_APP", JSON.stringify(res.data));
      localStorage.setItem(
        "access-token",
        JSON.stringify(res.data.accessToken)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(res.data.refreshtoken)
      );
      setAuthUser(res.data);
      console.log(res.headers);
      
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        // Handle Axios-specific errors
        toast.error(
          error.response?.data.error || "Login Failed. Please try again."
        );
      } else {
        console.log(error);

        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
