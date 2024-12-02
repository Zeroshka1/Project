"use client";
import React, { useState } from "react";
import LoginForm from "./loginForm/LoginForm.jsx";
import SignUpForm from "./signUpForm/SignUpForm.jsx";
import styles from './authForm.module.css';

const AuthForm = ({ onClose }) => {
    const [authType, setAuthType] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleClose = () => {
        setAuthType("");
        setIsLogin(true);
        onClose();
    };

    const handleAuthTypeChange = (type) => {
        setAuthType(type);
        setIsLogin(true);
    };

    return (
        <div className={styles.authModal}>
            <div className={styles.formContainer}>
                <button className={styles.closeButton} onClick={handleClose}>×</button>
                {!authType ? (
                    <>
                        <h1>Вход и регистрация<br />
                            для Заказчика и Компании</h1>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => handleAuthTypeChange("customer")}
                                className="blueBtn"
                            >
                                Вход для заказчика
                            </button>
                            <button
                                onClick={() => handleAuthTypeChange("company")}
                                className="blueBtn"
                            >
                                Вход для компании
                            </button>
                        </div>
                    </>
                ) : isLogin ? (
                    <LoginForm
                        authType={authType}
                        onSwitchToRegister={() => setIsLogin(false)}
                    />
                ) : (
                    <SignUpForm
                        authType={authType}
                        onSwitchToLogin={() => setIsLogin(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthForm;
