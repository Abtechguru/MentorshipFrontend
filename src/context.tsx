import React from 'react'
import {createContext, useContext, } from 'react'

interface ShopContextType {
    backendUrl : string;
}
export const ShopContext = createContext<ShopContextType | undefined> (undefined)

interface ShopContextProviderProps { 
    children:ReactNode
}

const ShopContextProvider: React.FC <ShopContextProviderProps> = (props)=> {

    const backendUrl = "https://mentorship-1-jpz3.onrender.com"

    const value : ShopContextType = {
backendUrl

    }
  return (
<ShopContext.provider value={value}>

{props.children}

    </ShopContext.provider>



  )
}

export const useShopContext = ()=> {
    return = useContext(ShopContext)
return

}
export default ShopContextProvider