'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../authForm.module.css';

const LoginForm = ({ authType, onSwitchToRegister, setUserData }) => {
    const [loginData, setLoginData] = useState({ login: "", password: "" });
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (!loginData.login || !loginData.password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    login: loginData.login,
                    password: loginData.password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Ошибка входа");
                return;
            }
    
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
    
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/me`, {
                headers: { Authorization: `Bearer ${data.access_token}` },
            });
    
            if (!userResponse.ok) {
                setError("Ошибка получения данных пользователя");
                return;
            }
    
            const user = await userResponse.json();
            const userData = { ...user, authType };
    
            localStorage.setItem("user", JSON.stringify(userData));
            setUserData(userData);
    
            const path = authType === "customer" ? "/customer-profile" : "/company-profile";
            router.push(path);
    
        } catch (err) {
            setError("Неправильный логин или пароль");
        }
    };
    

    return (
        <div className={styles.loginForm}>
            <h2>Вход для {authType === "customer" ? "заказчика" : "компании"}</h2>
            {error && <p className={styles.error}>{error}</p>}
            <input
                type="text"
                name="login"
                placeholder="Логин"
                value={loginData.login || ""}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={loginData.password || ""}
                onChange={handleInputChange}
            />
            <button onClick={handleLogin} className="blueBtn">Вход</button>
            <button onClick={onSwitchToRegister} className="blueBtn">Регистрация</button>
        </div>
    );
};

export default LoginForm;
