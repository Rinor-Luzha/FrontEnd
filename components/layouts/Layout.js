import React from 'react'
import NavBar from '../navBar/NavBar'
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