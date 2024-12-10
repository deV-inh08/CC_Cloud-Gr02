import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "../utils/auth";

interface AppContextInterFace {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
}

export const AppContext = createContext<AppContextInterFace>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )

  const value = {
    isAuthenticated,
    setIsAuthenticated
  }
  return (
  <AppContext.Provider value={value}>
    { children }  
  </AppContext.Provider>
  )
}