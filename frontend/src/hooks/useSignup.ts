import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import * as z from "zod";
import {useAuthContext} from "../context/authcontext";
// import {ToastWithAction} from "../components/toastShadcn";

// Define Zod schema for validation
const signUpSchema = z.object({
  fullname: z.string().min(1, {message: "Full name is required"}),
  username: z.string().min(1, {message: "Username is required"}),
  email: z.string().email({message: "Invalid email format"}),
  password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"}),
  gender: z.string().min(1, {message: "Gender is required"}),
});

type SignUpInput = z.infer<typeof signUpSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSignUp = (inputs?: {
  fullname: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  password: string;
}) => {
  const {setAuthUser} = useAuthContext();

  const [loading, setLoading] = useState(false);

  const signup = async (input: SignUpInput) => {
    setLoading(true);

    const success = handleInputErrors(input);

    if (!success) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/auth/signup`, input);
      toast.success("Signup successful!");
      toast.success(response.data.message);
      // ToastWithAction("Signup Successfull");
      // ToastWithAction(response.data.message);
      // Handle successful signup (e.g., redirect or display a success message)

      // localStorage.setItem("Chat_APP", JSON.stringify(response.data));

      setAuthUser(response.data);

      // console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        // Handle Axios-specific errors
        toast.error(
          error.response?.data.error || "Signup failed. Please try again."
        );
        // ToastWithAction(
        //   error.response?.data.error || "Signup failed. Please try again."
        // );
      } else {
        console.log(error);

        toast.error("An unexpected error occurred");
        // ToastWithAction("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = (input: SignUpInput): boolean => {
    try {
      signUpSchema.parse(input);
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

  return {
    loading,
    signup,
  };
};

export default useSignUp;
