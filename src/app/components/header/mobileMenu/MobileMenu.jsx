'use client';
import React, { useState, useEffect } from 'react';
import styles from '../header.module.css';
import AccountButtons from '../accoutButtons/AccountButtons';

function MobileMenu({ userData, setUserData, toggleAuthModal }) {
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
        window.location.href = "/";  
    };

    const menuItemsData = [
        { title: 'Услуги', url: '/' },
        { title: 'Новости', url: '/Новости' },
        { title: 'Контакты', url: '/Контакты' },
    ];

    return (
        <>
            <div className={`${styles.blurBackground} ${open ? styles.active : ''}`} onClick={toggleMenu}></div>

            <header className={`${styles.headerWrapperMobile}`}>
                <div className={`${styles.logoNav}`}>
                    <div className={`${styles.logoNavWrapper} container`}>
                        <h1 className={styles.headerLogo}>L</h1>
                        <div className={`${styles.burgerBtn} ${open ? styles.open : ''}`} onClick={toggleMenu}>
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
                      toggleAuthModal={toggleAuthModal} 
                    />
                </div>
            </header>

            {isAuthModalOpen && <AuthForm onClose={toggleAuthModal} />}
        </>
    );
}

export default MobileMenu;
