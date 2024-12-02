"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from './companyProfile.module.css';
import Loader from "../loader/Loader";

const CompanyProfile = () => {
    const [companyData, setCompanyData] = useState(null);
    const [isOrderWindow, setIsOrderWindow] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.authType === "company") {
            setCompanyData(user);
        }
    }, []);

    const selectServices = () => {
        setIsOrderWindow(false)
    }
    const selectOrders = () => {
        setIsOrderWindow(true)
    }

    if (!companyData) {
        return (
            <div className={`${styles.companyWrapper} container`}>
                <div className={styles.companyInfo}>
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.companyWrapper} container`}>
            <div className={styles.containerBtns}>
                <div className={styles.wrapperBtns}>
                    <button className="blueBtn" onClick={selectOrders}>Заявки</button>
                    <button className="blueBtn" onClick={selectServices}>Услуги</button>
                </div>
            </div>
            <div className={styles.companyInfo}>
                {companyData.photo ? (
                    <Image
                        src='https://img.icons8.com/?size=100&id=ov44J4rOnabQ&format=png&color=000000'
                        alt="Profile"
                        width={200}
                        height={200}
                    />
                ) : (
                    <div className={styles.placeholderAvatar}>
                        <Image
                            src="https://img.icons8.com/?size=100&id=MRZg41dxvuQk&format=png&color=000000"
                            alt="Uploaded image"
                            width={400}
                            height={400}
                            className={styles.imgPrev}
                        />
                    </div>
                )}
                <p className={styles.nameCompany}>{companyData.companyName}</p>
                <div className={styles.ratingCompany}>
                    <span>{companyData.rating}</span>
                    <Image
                        src="https://img.icons8.com/?size=100&id=PuXqa9IZtu5P&format=png&color=000000"
                        alt="star"
                        width={32}
                        height={32}
                    />
                </div>
                <p className={styles.emailCompany}>{companyData.email}</p>
            </div>
            {isOrderWindow ? (
                <div className={styles.orderWrapper}>
                    <h1>Ваши Заявки</h1>
                </div>
            ) : (
                <div className={styles.servicesWrapper}>
                    <h1>Список услуг</h1>
                </div>
            )}
        </div>
    );
};

export default CompanyProfile;
