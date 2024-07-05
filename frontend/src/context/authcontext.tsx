import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser, AuthContextType } from "../../types"; // Adjust the path as necessary

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("Chat_APP") || "null")
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
