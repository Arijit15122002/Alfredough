import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AuthorCard ({createdAt, authorId}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`http://localhost:8000/user/${authorId}`)
            setUser(response.data)
            console.log(response)
        }
    }, [authorId])
  return (
    <div>
        {user.fullname}
    </div>
  )
}

export default AuthorCard