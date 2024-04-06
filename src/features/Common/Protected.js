import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../counter/counterSlice'

function Protected({children}) {
    const user = useSelector(selectUser)

    const token = localStorage.getItem("token1") 
    console.log(token)

    if(user || token){
        return children
    }
    else{
        return <Navigate to="/"></Navigate>
    }
  
}

export default Protected