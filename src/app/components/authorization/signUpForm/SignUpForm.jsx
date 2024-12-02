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
            ? { photo: "", username: "", email: "", password: "" }
            : { photo: "", companyName: "", rating: 1, phone: "", website: "", email: "", username: "", password: "" }
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

    const handleRegister = () => {
        localStorage.setItem("user", JSON.stringify({ ...formData, authType }));
        alert("Вы успешно зарегистрировались!");

        const redirectPath = authType === "customer" ? "/customer-profile" : "/company-profile";
        router.push(redirectPath);
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
