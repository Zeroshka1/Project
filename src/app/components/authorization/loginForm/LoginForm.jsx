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
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    login: loginData.login,
                    password: loginData.password,
                }),
            });

            if (!response.ok) throw new Error("Ошибка входа");

            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);

            const userEndpoint = authType === "customer" ? "/customer/me" : "/company/me";

            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${userEndpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.access_token}`,
                },
                body: JSON.stringify({}),
            });

            if (!userResponse.ok) throw new Error("Ошибка получения данных пользователя");

            const user = await userResponse.json();
            const userData = { ...user, authType };

            localStorage.setItem("user", JSON.stringify(userData));
            setUserData(userData);

            const path = authType === "customer" ? "/customer-profile" : "/company-profile";
            router.push(path);

            onClose();
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
