import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    let getUser = localStorage.getItem("isLogin")
    return (
        <>
            {
                getUser ? <Outlet /> : <Navigate to={"/login"} />
            }
        </>
    )
}

export default Private
