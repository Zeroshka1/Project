"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from './customerProfile.module.css';
import Loader from "../loader/Loader";

const CustomerProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) throw new Error("Токен отсутствует");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Ошибка получения данных пользователя");

                const user = await response.json();
                setUserData(user);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className={`${styles.customerWrapper} container`}>
                <div className={styles.customerInfo}>
                    <Loader />
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={`${styles.customerWrapper} container`}>
                <div className={styles.customerInfo}>
                    <p>Не удалось загрузить данные пользователя.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.customerWrapper} container`}>
            <div className={styles.customerInfo}>
                {userData.photo ? (
                    <Image
                        src={userData.photo}
                        alt="Profile"
                        width={200}
                        height={200}
                    />
                ) : (
                    <div className={styles.placeholderAvatar}>
                        <Image 
                            src="https://img.icons8.com/?size=100&id=ov44J4rOnabQ&format=png&color=000000" 
                            alt="Uploaded image" 
                            width={77} 
                            height={67} 
                            className={styles.imgPrev} 
                        />
                    </div>
                )}
                <p>{userData.login}</p>
                <p>{userData.email}</p>
            </div>
            <div className={styles.orderWrapper}>
                <h1>Ваши Заявки</h1>
            </div>
        </div>
    );
};

export default CustomerProfile;
