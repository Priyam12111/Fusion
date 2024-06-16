import React from 'react'
import { useParams } from 'react-router-dom'
const Greet = () => {
    let username = useParams();
    return (
        <div>Hello {username.Name}</div>
    )
}

export default Greet