import React from 'react';
import styles from '../header.module.css'

const AccountButtons = ({ userData, handleAccountClick, handleAccountClickExit, toggleAuthModal }) => {
    return userData ? (
        <div className={styles.btnNav}>
            <button onClick={handleAccountClick}>Аккаунт</button>
            <button onClick={handleAccountClickExit}>Выход</button>
        </div>
    ) : (
        <button onClick={toggleAuthModal}>Вход</button>
    );
};

export default AccountButtons;