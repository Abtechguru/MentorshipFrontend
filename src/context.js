import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
export const ShopContext = createContext(undefined);
const ShopContextProvider = (props) => {
    const backendUrl = "https://mentorship-1-jpz3.onrender.com";
    const value = {
        backendUrl
    };
    return (_jsx(ShopContext.Provider, { value: value, children: props.children }));
};
export const useShopContext = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShopContext must be used within a ShopContextProvider');
    }
    return context;
};
export default ShopContextProvider;
