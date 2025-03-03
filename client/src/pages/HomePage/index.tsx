import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                    <h2>Welcome to Fixer Finder!</h2>
                    <button
                        onClick={() => loginWithRedirect()}
                    >Login</button>
                    <button
                        onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
                    >Sign Up</button>
                </div>
            ) : (
                    <div>
                        <h2>Welcome, {user?.name}</h2>
                        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                    </div>
            )}
        </div>
    )
}

export default HomePage