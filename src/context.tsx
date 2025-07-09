import React, { createContext, useContext, useState, ReactNode } from 'react';
interface ShopContextType {
    backendUrl: string;
    isAuthenticated: boolean;
    userRole?: 'admin' | 'mentor' | 'mentee';
    setAuth?: (auth: boolean) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const backendUrl = process.env.REACT_APP_API_URL || "https://mentorship-1-jpz3.onrender.com";

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<'admin' | 'mentor' | 'mentee' | undefined>(undefined);
    const setAuth = (auth: boolean) => {
        setIsAuthenticated(auth);
    };
    const value: ShopContextType = {
        backendUrl,
        isAuthenticated,
        userRole,
        setAuth
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

//
export const useShopContext = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShopContext must be used within a ShopProvider");
    }
    return context;
};

export default ShopContextProvider;