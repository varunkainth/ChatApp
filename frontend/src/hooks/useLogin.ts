import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import {useAuthContext} from "../context/authcontext";
import * as z from "zod";
// import {ToastWithAction} from "../components/toastShadcn";

// Define Zod schema for validation
const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, {message: "Username or Email is required"}),
  password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"}),
});

type LoginData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext(); // Ensure this is inside the hook body

  const login = async ({usernameOrEmail, password}: LoginData) => {
    setLoading(true);

    const isValid = handleInputErrors({usernameOrEmail, password});

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
      const data = isEmail
        ? {email: usernameOrEmail, password}
        : {username: usernameOrEmail, password};

      const res = await axios.post(`/api/auth/login`, data);

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      const bearerToken = res.headers["authorization"]
        ?.replace("Bearer", "")
        .trim();
      localStorage.setItem("Chat_APP", JSON.stringify(res.data));
      localStorage.setItem("access-token", bearerToken); // No need to stringify a simple string
      localStorage.setItem("refreshToken", res.data.refreshtoken); // Assuming res.data.refreshtoken is a string

      setAuthUser(res.data);
      toast.success(res.data.message || "Login successful!");
      // const message: string = res.data.message || "Login Successfull";
      // ToastWithAction(message);

      console.log("this is response header: ", res.headers);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);

        // Handle Axios-specific errors
        toast.error(
          error.response?.data.error || "Login Failed. Please try again."
        );
        // const errormessage =
          // error.response?.data.error || "Login Failed. Please try again.";

        // ToastWithAction(errormessage);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
        // ToastWithAction("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = (input: LoginData): boolean => {
    try {
      loginSchema.parse(input);
      return true;
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        e.errors.forEach((error) =>
           toast.error(error.message)
          // ToastWithAction(error.message)
        );
      } else {
        toast.error("An unexpected error occurred");
        // ToastWithAction("An unexpected error occurred");
      }
      return false;
    }
  };

  return {loading, login};
};
