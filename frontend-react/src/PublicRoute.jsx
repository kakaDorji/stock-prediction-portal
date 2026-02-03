import React,{ useContext}from 'react'
import {AuthContext} from './AuthProvider'
import {Navigate} from 'react-router-dom'

const PublicRoute = ({children}) => {
    const{isLoggedIn}=useContext(AuthContext)
  return !isLoggedIn ?(
    //if not login u will be able to acces login and registration page
    children
  ):(
    //esle u can access dashboard
    <Navigate to='/dashbaord' />
  )
}

export default PublicRoute