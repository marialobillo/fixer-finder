import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const SignIn = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect();
    }, []);

    return <p>Redirecting to login...</p>;
}

export default SignIn
