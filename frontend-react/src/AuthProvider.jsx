import React from 'react'
import { useState,useContext,createContext } from 'react'

// create the context
const AuthContext=createContext();
// !! convert to the boolean we dont want all the token
const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn]=useState(
       !!localStorage.getItem('accessToken')
    )
//children mean all other component and this login and setLoggin will be avialabel in all 
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}  
</AuthContext.Provider>
    
    
  )
}

export default AuthProvider

export {AuthContext}