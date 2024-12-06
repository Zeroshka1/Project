'use client';
import React, { useState, useEffect } from 'react';
import styles from '../allServices.module.css';
import PrevCard from '../../prevCard/PrevCard';
import Card from '../../card/Card';

function ListServices({ filters }) {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [cardData, setCardData] = useState(null);
    const [services, setServices] = useState([]); // Состояние для списка услуг
    const [companies, setCompanies] = useState([]); // Состояние для списка компаний

    // Дефолтные значения для фильтров, если они undefined
    const { price, selectedServices = [], selectedCompanies = [], selectedRatings = [] } = filters || {};

    // Проверка, есть ли активные фильтры
    const hasActiveFilters = price || selectedServices.length > 0 || selectedCompanies.length > 0 || selectedRatings.length > 0;

    // Фильтрация сервисов на основе переданных фильтров, если активные фильтры есть
    const filteredServices = hasActiveFilters ? services.filter((service) => {
        // Фильтрация по цене
        const priceRange = service.price ? service.price.split('-').map((val) => parseInt(val.replace(/[^\d]/g, ''))) : [0, Infinity];
        const [minPrice, maxPrice] = priceRange;

        const filterPrice = price ? parseInt(price) : null;
        const isPriceValid = filterPrice ? (minPrice <= filterPrice && maxPrice >= filterPrice) : true;

        // Фильтрация по услугам
        const isServiceValid = selectedServices.length === 0 || selectedServices.includes(service.sevicesCompany);

        // Фильтрация по компаниям
        const isCompanyValid = selectedCompanies.length === 0 || selectedCompanies.includes(service.companyName);

        // Фильтрация по рейтингу
        const isRatingValid = selectedRatings.length === 0 || selectedRatings.includes(service.rating);

        return isPriceValid && isServiceValid && isCompanyValid && isRatingValid;
    }) : services;

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://80.68.156.221:8001/company/all');
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
                const response = await fetch('http://80.68.156.221:8001/company/services/all');
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
            {filteredServices.length === 0 ? (
                <p className={styles.noServicesMessage}>Услуги не найдены</p>
            ) : (
                filteredServices.map((service, index) => (
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
