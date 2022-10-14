import Layout from '../components/Layout'
import '../styles/globals.css'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_USER, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(user => {
      if (!user.ok) {
        setUser(null)
        throw new Error("User not logged in")
      }
      return user.json()
    })
      .then(userData => {
        setUser(userData);
      }).catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <Layout user={user} setUser={setUser}>
      <Component {...pageProps} user={user} setUser={setUser} />
    </Layout>
  )
}

export default MyApp
