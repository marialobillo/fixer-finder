import React from 'react'

interface AuthButtonsProps {
    login: () => void;
    signup: () => void;
}


const AuthButtons: React.FC<AuthButtonsProps> = ({ login, signup }) => {
    return (
        <div>
            <h2>Welcome to Fixer Finder! </h2>
            <button onClick={login}>Login</button>
            <button onClick={signup}>Sign Up</button>
        </div>
    )
}

export default AuthButtons