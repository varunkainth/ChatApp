import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/aceternity/ui/label";
import { Input } from "../../components/aceternity/ui/input";
import { cn } from "../../lib/utils";
import { DropdownMenuRadioGroupDemo } from "../../components/dropdown";
import useSignUp from "../../hooks/useSignup";

export function SignUp() {
  const { signup, loading } = useSignUp();
  const [inputs, setInputs] = useState({
    fullname: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    gender: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      const newInputs = { ...prevInputs, [name]: value };

      if (name === "firstName" || name === "lastName") {
        newInputs.fullname =
          `${newInputs.firstName} ${newInputs.lastName}`.trim();
      }

      return newInputs;
    });
  };

  const handleChangeGender = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({
      fullname: inputs.fullname,
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      gender: inputs.gender,
    });
  };

  return (
    <div className="max-w-[35rem] w-full mx-auto rounded-md p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ChatApp
      </h2>
      <p className="text-neutral-600 text max-w-sm mt-2 dark:text-neutral-300">
        SignUp to ChatApp
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              value={inputs.firstName}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="Example@mail.com"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            value={inputs.username}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="gender">Gender</Label>
          <DropdownMenuRadioGroupDemo
            option1="male"
            option2="female"
            onChangeGender={handleChangeGender}
            selectedGender={inputs.gender}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign up →"
          )}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <span>
          Already have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            login to the chat app
          </Link>
          .
        </span>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
