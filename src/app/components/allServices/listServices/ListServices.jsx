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
        const priceRange = service.price.split('-').map((val) => parseInt(val.replace(/[^\d]/g, ''))); // Преобразуем строку с диапазоном в массив чисел
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];

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

    // Загружаем данные о компаниях с API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://80.68.156.221:8001/company/all'); // API для получения списка компаний
                if (!response.ok) throw new Error('Не удалось загрузить данные компаний');
                const data = await response.json();
                setCompanies(data); // Устанавливаем данные о компаниях
            } catch (error) {
                console.error('Ошибка при загрузке данных компаний:', error);
            }
        };

        fetchCompanies();
    }, []);

    // Загружаем данные о сервисах с API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://80.68.156.221:8001/company/services/all');
                if (!response.ok) throw new Error('Не удалось загрузить данные сервисов');
                const data = await response.json();
                setServices(data); // Устанавливаем данные в состояние
            } catch (error) {
                console.error('Ошибка при загрузке услуг:', error);
            }
        };

        fetchServices();
    }, []);

    // Функция для получения имени компании по ее ID
    const getCompanyNameById = (companyId) => {
        const company = companies.find((comp) => comp.id === companyId);
        return company ? company.login : 'Неизвестная компания'; // Если компания не найдена, выводим 'Неизвестная компания'
    };

    const handleCardOpen = (data) => {
        setCardData({
            ...data,
            companyName: getCompanyNameById(data.company_id), // Добавляем имя компании
        });
        setIsCardOpen(true);
    };

    const handleCardClose = () => {
        setIsCardOpen(false);
        setCardData(null);
    };

    return (
        <div className={styles.listServicesWrapper}>
            {/* Если нет подходящих услуг, показываем сообщение */}
            {filteredServices.length === 0 ? (
                <p className={styles.noServicesMessage}>Услуги не найдены</p>
            ) : (
                filteredServices.map((service, index) => (
                    <PrevCard
                        key={index}
                        type="company"
                        data={{
                            ...service,
                            companyName: getCompanyNameById(service.company_id), // Добавляем имя компании
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
