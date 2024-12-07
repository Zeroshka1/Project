'use client';
import React, { useState, useEffect } from 'react';
import styles from '../header.module.css';
import AccountButtons from '../accoutButtons/AccountButtons';
import AuthForm from '../../authorization/AuthForm';

function MobileMenu({ userData, setUserData }) {
    const [open, setOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        if (open || isAuthModalOpen) {
            document.body.classList.add('hiddenScroll');
            document.documentElement.classList.add('hiddenScroll');
        } else {
            document.body.classList.remove('hiddenScroll');
            document.documentElement.classList.remove('hiddenScroll');
        }
        return () => {
            document.body.classList.remove('hiddenScroll');
            document.documentElement.classList.remove('hiddenScroll');
        };
    }, [open, isAuthModalOpen]);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const handleAccountClick = () => {
        if (userData?.authType === 'customer') {
            window.location.href = "/customer-profile";
        } else if (userData?.authType === 'company') {
            window.location.href = "/company-profile";
        }
    };

    const handleAccountClickExit = () => {
        localStorage.removeItem('user');
        setUserData(null);
        setOpen(false);
        window.location.href = "/";
    };

    const toggleLocalAuthModal = () => {
        setIsAuthModalOpen((prev) => !prev);
    };

    const menuItemsData = [
        { title: 'Услуги', url: '/' },
        { title: 'Новости', url: '/news' },
        { title: 'Контакты', url: '/k' },
    ];

    return (
        <>
            <div className={`${styles.blurBackground} ${open ? styles.active : ''}`} onClick={toggleMenu}></div>

            <header className={`${styles.headerWrapperMobile}`}>
                <div className={`${styles.logoNav}`}>
                    <div className={`${styles.logoNavWrapper} container`}>
                        <h1 className={styles.headerLogo}>L</h1>
                        <div 
                            className={`${styles.burgerBtn} ${open ? styles.open : ''}`} 
                            onClick={toggleMenu}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.navEnterBtn} ${open ? styles.show : ''}`}>
                    <nav>
                        <ul className={styles.navList}>
                            {menuItemsData.map((menu, index) => (
                                <li key={index}>
                                    <a href={menu.url}>{menu.title}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <AccountButtons
                        userData={userData}
                        handleAccountClick={handleAccountClick}
                        handleAccountClickExit={handleAccountClickExit}
                        toggleAuthModal={toggleLocalAuthModal}
                    />
                </div>
            </header>

            {isAuthModalOpen && (
                <AuthForm
                    onClose={toggleLocalAuthModal}
                    setUserData={(user) => {
                        setUserData(user);
                        localStorage.setItem("user", JSON.stringify(user));
                        setIsAuthModalOpen(false);
                    }}
                />
            )}
        </>
    );
}

export default MobileMenu;
