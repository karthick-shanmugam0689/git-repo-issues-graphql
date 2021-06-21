import * as React from 'react'
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    
    return (
        <>
            <h1>The page you requested doesn't exist. Please go to <Link to="/">Home</Link> page</h1>
        </>
    )
}

export default NotFoundPage