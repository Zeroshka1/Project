"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../authForm.module.css';
import CustomerSignUp from './customerSignUp/CustomerSignUp';
import CompanySignUp from './companySignUp/CompanySignUp';

const SignUpForm = ({ authType, onSwitchToLogin }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState(
        authType === "customer"
            ? { login: "", email: "", password: "", role: "customer" }
            : { login: "", password: "", phone: "", website: "", email: "", role: "company" }
    );
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const triggerFileUpload = () => {
        document.getElementById('imageUploadInput').click();
    };
    const handleRegister = async () => {
        // Проверка на пустые поля
        const { login, password, email, phone, website } = formData;
    
        if (!login || !password || !email || (authType === "company" && (!phone || !website))) {
            console.error("Пожалуйста, заполните все обязательные поля.");
            return;
        }
    
        const endpoint = authType === "customer" ? `${process.env.NEXT_PUBLIC_API_URL}/auth/register/customer` : `${process.env.NEXT_PUBLIC_API_URL}/auth/register/company`;
        
        try {
            console.log("Sending request to:", endpoint);
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server error response:", errorData);
                throw new Error(errorData.message || "Ошибка регистрации");
            }
    
            const data = await response.json();
            console.log("Registration successful:", data);
            const token = data.access_token;
    
            localStorage.setItem("access_token", token);
            localStorage.removeItem("user");
    
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!userResponse.ok) throw new Error("Ошибка получения данных пользователя");
    
            const newUserData = await userResponse.json();
            localStorage.setItem("user", JSON.stringify(newUserData)); 
    
            const redirectPath = authType === "customer" ? "/customer-profile" : "/company-profile";
            router.push(redirectPath);
    
        } catch (err) {
            console.error("Registration Error:", err.message);
        }
    };
    
    
    

    return (
        <div className={styles.registrationForm}>
            <h2>Регистрация для {authType === "customer" ? "заказчика" : "компании"}</h2>

            {authType === "customer" ? (
                <CustomerSignUp
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    imagePreview={imagePreview}
                    triggerFileUpload={triggerFileUpload}
                />
            ) : (
                <CompanySignUp
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    imagePreview={imagePreview}
                    triggerFileUpload={triggerFileUpload}
                />
            )}

            <button onClick={handleRegister} className="blueBtn">Зарегистрироваться</button>
            <button onClick={onSwitchToLogin} className="blueBtn">Вход</button>
        </div>
    );
};

export default SignUpForm;
