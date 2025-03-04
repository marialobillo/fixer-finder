import React from 'react';
import styles from "./AuthButtons.module.css";

interface AuthButtonsProps {
    login: () => void;
    signup: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ login, signup }) => {
    return (
        <div className={styles.authButtons}>
            <button className={styles.login} onClick={login}>Login</button>
            <button className={styles.signup} onClick={signup}>Sign Up</button>
        </div>
    )
}

export default AuthButtons