"use client";
import React, { useState } from "react";
import LoginForm from "./loginForm/LoginForm.jsx";
import SignUpForm from "./signUpForm/SignUpForm.jsx";
import styles from './authForm.module.css';

const AuthForm = ({ onClose, setUserData }) => {
    const [authType, setAuthType] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [formTransition, setFormTransition] = useState("visible");
    const [mainTransition, setMainTransition] = useState("visible");

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setAuthType("");
            setIsLogin(true);
            onClose(); 
        }, 300);
    };

    const handleAuthTypeSelect = (type) => {
        setMainTransition("exiting");
        setTimeout(() => {
            setAuthType(type);
            setFormTransition("entering");
            setTimeout(() => setFormTransition("visible"), 300);
        }, 300);
    };

    const switchForm = (isLoginState) => {
        setFormTransition("exiting");
        setTimeout(() => {
            setIsLogin(isLoginState);
            setFormTransition("entering");
            setTimeout(() => setFormTransition("visible"), 300);
        }, 300);
    };

    return (
        <>
            <div
                className={`${styles.blurBackground} ${isExiting ? styles.exiting : ''}`}
                onClick={handleClose}
            ></div>
            <div className={`${styles.authModal} ${isExiting ? styles.exiting : ''}`}>
                {!authType ? (
                    <div className={`${styles.mainContainer} ${styles[mainTransition]}`}>
                        <button className={styles.closeButton} onClick={handleClose}>×</button>
                        <h1>Вход и регистрация<br />
                            для Заказчика и Компании</h1>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => handleAuthTypeSelect("customer")}
                                className="blueBtn"
                            >
                                Вход для заказчика
                            </button>
                            <button
                                onClick={() => handleAuthTypeSelect("company")}
                                className="blueBtn"
                            >
                                Вход для компании
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.formContainer} ${styles[formTransition]}`}>
                        <button className={styles.closeButton} onClick={handleClose}>×</button>
                        {isLogin ? (
                            <LoginForm
                                authType={authType}
                                onSwitchToRegister={() => switchForm(false)}
                                setUserData={setUserData}
                                onClose={handleClose}
                            />
                        ) : (
                            <SignUpForm
                                authType={authType}
                                onSwitchToLogin={() => switchForm(true)}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AuthForm;
