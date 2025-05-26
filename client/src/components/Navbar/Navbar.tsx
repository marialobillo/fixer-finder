import React from "react";
import { useAuthActions } from "./../../hooks/useAuthActions";
import AuthButtons from "./../AuthButtons/AuthButtons";
import styles from "./Navbar.module.css"; 

const Navbar: React.FC = () => {
    const { isAuthenticated, login, signup, logoutUser } = useAuthActions();

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>Fixer-Finder</h1>
            <div className={styles.logo}>
                {!isAuthenticated ? (
                    <AuthButtons login={login} signup={signup} />
                ) : (
                        <button className={styles.logout} onClick={logoutUser}>Log Out</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar