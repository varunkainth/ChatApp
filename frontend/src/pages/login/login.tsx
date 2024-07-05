"use client";
import React, { useState } from "react";
import { Label } from "../../components/aceternity/ui/label";
import { Input } from "../../components/aceternity/ui/input";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export function Login() {
  const { loading, login } = useLogin();

  const [inputs, setInputs] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(inputs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="max-w-md w-full mx-auto rounded-md md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to ChatApp
        </h2>
        <p className="text-neutral-600 text max-w-sm mt-2 dark:text-neutral-300">
          Please Login to ChatApp
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="usernameOrEmail">Username or Email Address</Label>
            <Input
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="Username or Email"
              type="text"
              value={inputs.usernameOrEmail}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              "Login →"
            )}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <span>
            Don't have an account yet? Sign up now to join the ChatApp.
          </span>
          <Link to="/signup" className="mt-3 block">
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
            >
              Sign Up &rarr;
              <BottomGradient />
            </button>
          </Link>
        </form>
      </div>
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
