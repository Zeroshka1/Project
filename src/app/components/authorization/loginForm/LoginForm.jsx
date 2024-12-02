"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../authForm.module.css';

const LoginForm = ({ authType, onSwitchToRegister }) => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        // Сохраняем данные в локальном хранилище
        localStorage.setItem("user", JSON.stringify({ ...loginData, authType }));
        alert(`Вы вошли как ${authType === "customer" ? "Заказчик" : "Компания"}`);
        
        // Перенаправляем пользователя
        const redirectPath = authType === "customer" ? "/customer-profile" : "/company-profile";
        router.push(redirectPath);
    };

    return (
        <div className={styles.loginForm}>
            <h2>Вход для {authType === "customer" ? "заказчика" : "компании"}</h2>
            <input
                type="text"
                name="username"
                placeholder="Логин"
                value={loginData.username}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={loginData.password}
                onChange={handleInputChange}
            />
            <button onClick={handleLogin} className="blueBtn">Вход</button>
            <button onClick={onSwitchToRegister} className="blueBtn">Регистрация</button>
        </div>
    );
};

export default LoginForm;
