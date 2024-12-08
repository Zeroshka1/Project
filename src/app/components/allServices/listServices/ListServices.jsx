'use client';
import React, { useState, useEffect } from 'react';
import styles from '../allServices.module.css';
import PrevCard from '../../prevCard/PrevCard';
import Card from '../../card/Card';

function ListServices() {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [cardData, setCardData] = useState(null);
    const [services, setServices] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/all`);
                if (!response.ok) throw new Error('Не удалось загрузить данные компаний');
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных компаний:', error);
            }
        };

        fetchCompanies();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/services/all`);
                if (!response.ok) throw new Error('Не удалось загрузить данные сервисов');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Ошибка при загрузке услуг:', error);
            }
        };

        fetchServices();
    }, []);

    const getCompanyNameById = (companyId) => {
        const company = companies.find((comp) => comp.id === companyId);
        return company ? company.login : 'Неизвестная компания';
    };

    const handleCardOpen = (data) => {
        setCardData({
            ...data,
            companyName: getCompanyNameById(data.company_id),
        });
        setIsCardOpen(true);
    };

    const handleCardClose = () => {
        setIsCardOpen(false);
        setCardData(null);
    };

    return (
        <div className={styles.listServicesWrapper}>
            {services.length === 0 ? (
                <p className={styles.noServicesMessage}>Услуги не найдены</p>
            ) : (
                services.map((service, index) => (
                    <PrevCard
                        key={index}
                        type="company"
                        data={{
                            ...service,
                            companyName: getCompanyNameById(service.company_id),
                        }}
                        showRating={true}
                        onClick={() => handleCardOpen(service)}
                    />
                ))
            )}

            {isCardOpen && <Card data={cardData} onClose={handleCardClose} />}
        </div>
    );
}

export default ListServices;
