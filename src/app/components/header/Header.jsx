'use client';
import styles from './header.module.css';
import MobileMenu from "./mobileMenu/MobileMenu.jsx";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthForm from '../authorization/AuthForm.jsx';
import AccountButtons from './accoutButtons/AccountButtons';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthModalOpen) {
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
}, [ isAuthModalOpen]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const menuItemsData = [
    { title: 'Услуги', url: '/' },
    { title: 'Новости', url: '/1' },
    { title: 'Контакты', url: '/2' },
  ];

  const pathname = usePathname();

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
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

  return (
    <>
      <header className={`${styles.headerWrapper} PC container`}>
        <h1 className={styles.headerLogo}>L</h1>

        <nav>
          <ul className={styles.navList}>
            {menuItemsData.map((menu, index) => (
              <li key={index}>
                <Link href={menu.url} legacyBehavior>
                  <a className={pathname === menu.url ? styles.activeLink : ''}>
                    {menu.title}
                  </a>
                </Link>
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
      </header>

      <MobileMenu 
        userData={userData} 
        setUserData={setUserData}
        toggleAuthModal={toggleAuthModal} 
      />

      {isAuthModalOpen && (
        <AuthForm 
          onClose={toggleAuthModal} 
          setUserData={(user) => {
            setUserData(user);
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthModalOpen(false); // Закрыть форму после входа
          }}
        />
      )}
    </>
  );
};

export default Header;
