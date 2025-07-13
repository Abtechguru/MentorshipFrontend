import { createContext, useContext } from 'react'
import type { ReactNode, FC } from 'react'

interface ShopContextType {
    backendUrl: string
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined)

interface ShopContextProviderProps {
    children: ReactNode
}

const ShopContextProvider: FC<ShopContextProviderProps> = (props) => {
    const backendUrl = "https://mentorship-1-jpz3.onrender.com"

    const value: ShopContextType = {
        backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export const useShopContext = () => {
    const context = useContext(ShopContext)
    if (context === undefined) {
        throw new Error('useShopContext must be used within a ShopContextProvider')
    }
    return context
}

export default ShopContextProvider