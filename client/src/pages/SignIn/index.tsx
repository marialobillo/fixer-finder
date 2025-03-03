import { useAuthActions } from "./../../hooks/useAuthActions";
import { useEffect } from "react";

const SignIn = () => {
    const { login } = useAuthActions();

    useEffect(() => {
        login();
    }, []);

    return <p>Redirecting to login...</p>;
}

export default SignIn
