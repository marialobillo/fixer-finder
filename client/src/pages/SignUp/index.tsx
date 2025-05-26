import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const SignUp = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
    }, []);

    return <p>Redirecting to signup...</p>;
}

export default SignUp