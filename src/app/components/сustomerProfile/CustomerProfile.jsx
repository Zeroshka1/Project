"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from './customerProfile.module.css'
import Loader from "../loader/Loader";

const CustomerProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.authType === "customer") {
                setUserData(user);
            }
        }
    }, []);

    if (!userData) {
        return <div className={`${styles.customerWrapper} container`}>
            <div className={styles.customerInfo}>
                <Loader />
            </div>
        </div>
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
                        <Image src='https://img.icons8.com/?size=100&id=ov44J4rOnabQ&format=png&color=000000' alt="Uploaded image" width={77} height={67} className={styles.imgPrev} />
                    </div>
                )}
                <p>{userData.username}</p>
                <p>{userData.email}</p>
            </div>
            <div className={styles.orderWrapper}>
                <h1>Ваши Заявки</h1>
            </div>
        </div>
    );
};

export default CustomerProfile;
