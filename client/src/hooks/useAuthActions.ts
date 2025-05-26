import { useAuth0 } from '@auth0/auth0-react';

export const useAuthActions = () => { 
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    const login = () => {
        loginWithRedirect();
    }

    const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
    const logoutUser = () => logout({ logoutParams: { returnTo: window.location.origin } });

    return { isAuthenticated, user, login, signup, logoutUser };
}