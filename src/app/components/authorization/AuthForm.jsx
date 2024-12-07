"use client";
import React, { useState } from "react";
import LoginForm from "./loginForm/LoginForm.jsx";
import SignUpForm from "./signUpForm/SignUpForm.jsx";
import styles from './authForm.module.css';

const AuthForm = ({ onClose, setUserData }) => {
    const [authType, setAuthType] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setAuthType("");
            setIsLogin(true);
            onClose(); 
        }, 300); 
    };

    return (
        <>
            <div
                className={`${styles.blurBackground} ${isExiting ? styles.exiting : ''}`}
                onClick={handleClose}
            ></div>
            <div className={`${styles.authModal} ${isExiting ? styles.exiting : ''}`}>
                <div className={styles.formContainer}>
                    <button className={styles.closeButton} onClick={handleClose}>×</button>
                    {!authType ? (
                        <>
                            <h1>Вход и регистрация<br />
                                для Заказчика и Компании</h1>
                            <div className={styles.buttonGroup}>
                                <button
                                    onClick={() => setAuthType("customer")}
                                    className="blueBtn"
                                >
                                    Вход для заказчика
                                </button>
                                <button
                                    onClick={() => setAuthType("company")}
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
                            setUserData={setUserData}
                            onClose={handleClose}
                        />
                    ) : (
                        <SignUpForm
                            authType={authType}
                            onSwitchToLogin={() => setIsLogin(true)}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthForm;
