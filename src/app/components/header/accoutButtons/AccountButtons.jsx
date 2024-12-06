import React from 'react';
import styles from '../header.module.css';

const AccountButtons = ({ userData, handleAccountClick, handleAccountClickExit, toggleAuthModal }) => {
    return (
        <div className={styles.btnNav}>
            {userData ? (
                <>
                    <button 
                        onClick={handleAccountClick} 
                        className={styles.accountButton}
                    >
                        Профиль
                    </button>
                    <button 
                        onClick={handleAccountClickExit} 
                        className={`${styles.accountButton} ${styles.logoutButton}`}
                    >
                        Выход
                    </button>
                </>
            ) : (
                <button 
                    onClick={toggleAuthModal} 
                    className={`${styles.accountButton} ${styles.loginButton}`}
                >
                    Вход
                </button>
            )}
        </div>
    );
};

export default AccountButtons;
