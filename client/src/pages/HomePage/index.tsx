import AuthButtons from '../../components/AuthButtons';
import { useAuthActions } from '../../hooks/useAuthActions';

const HomePage = () => {
    const { isAuthenticated, user, login, signup, logoutUser } = useAuthActions();

    return (
        <div>
            {!isAuthenticated ? (
                <AuthButtons login={login} signup={signup} />
            ) : (
                <div>
                    <h2>Welcome, {user?.name}</h2>
                    <button onClick={logoutUser}>Log Out</button>
                </div>
            )}
        </div>
    )
}

export default HomePage