import React from "react"

export interface AuthUser {
    // Define the shape of your auth user object
    id: string;
    email: string;
    // Add other fields as necessary
  }
  
  export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  }
  