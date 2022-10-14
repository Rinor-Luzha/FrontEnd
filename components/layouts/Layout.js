import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer'

const Layout = ({ children, user, setUser }) => {
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            {children}
            <Footer />
        </>
    )
}

export default Layout