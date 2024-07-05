import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";

// Define Zod schema for validation
const signUpSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  gender: z.string().min(1, { message: "Gender is required" }),
});

type SignUpInput = z.infer<typeof signUpSchema>;

const useSignUp = (inputs?: {
  fullname: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  password: string;
}) => {
  const [loading, setLoading] = useState(false);

  const signup = async (input: SignUpInput) => {
    setLoading(true);

    const success = handleInputErrors(input);

    if (!success) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://potential-space-succotash-j7x4wrqqphpp4v-5000.app.github.dev/api/auth/signup`,
        input
      );
      toast.success("Signup successful!");
      // Handle successful signup (e.g., redirect or display a success message)
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        toast.error(
          error.response?.data.message || "Signup failed. Please try again."
        );
      } else {
        console.log(error);
        
        toast.error("An unexpected error occurred");
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
        e.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.error("An unexpected error occurred");
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
