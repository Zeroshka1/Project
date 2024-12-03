'use client'
import React, { useState, useEffect } from 'react';
import styles from '../allServices.module.css';
import PrevCard from '../../prevCard/PrevCard';
import Card from '../../card/Card';

function ListServices() {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        if (isCardOpen) {
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
    }, [isCardOpen]);

    const handleCardOpen = (data) => {
        setCardData(data);
        setIsCardOpen(true);
    };

    // Закрытие модального окна
    const handleCardClose = () => {
        setIsCardOpen(false);
        setCardData(null);
    };

    const services = [
        {
            photo: '',
            companyName: 'Company ABC',
            rating: 3,
            sevicesCompany: 'Веб-разработка',
            price: '10,000-150,000',
        },
        {
            photo: '',
            companyName: 'Company XYZ',
            rating: 5,
            sevicesCompany: 'Мобильные приложения',
            price: '15,000-200,000',
        },
        {
            photo: '',
            companyName: 'Company DEF',
            rating: 1,
            sevicesCompany: 'UI/UX дизайн',
            price: '12,000-130,000',
        },
        {
            photo: '',
            companyName: 'Company DEF',
            rating: 4,
            sevicesCompany: 'Мобильные приложения',
            price: '12,000-130,000',
        },
    ];

    return (
        <div className={styles.listServicesWrapper}>
            {services.map((service, index) => (
                <PrevCard
                    key={index}
                    type="company"
                    data={service}
                    showRating={true}
                    onClick={() => handleCardOpen(service)} // Передаем данные при клике
                />
            ))}

            {isCardOpen && <Card data={cardData} onClose={handleCardClose} />}
        </div>
    );
}

export default ListServices;
