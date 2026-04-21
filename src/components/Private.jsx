import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/react'

const Private = () => {
    const { isSignedIn, isLoaded } = useUser()

    if (!isLoaded) return null

    return (
        isSignedIn ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default Private