import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AuthorCard ({createdAt, authorId}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${authorId}`)
            setUser(response.data)
        }
    }, [authorId])
  return (
    <div>
        {user.fullname}
    </div>
  )
}

export default AuthorCard