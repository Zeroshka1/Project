import React, { useState, useEffect, useRef } from 'react';
import styles from '../filter.module.css';
import DropDown from './DropDown';

function FilterForm({ onClose }) {
    const [price, setPrice] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [isExiting, setIsExiting] = useState(false);

    const [services, setServices] = useState([]);
    const [companies, setCompanies] = useState([]);
    const ratings = [1, 2, 3, 4, 5];

    const filterModalRef = useRef(null);
    const dropdownServicesRef = useRef(null);  // Ссылка для услуг
    const dropdownCompaniesRef = useRef(null);  // Ссылка для компаний
    const dropdownRatingsRef = useRef(null);  // Ссылка для рейтингов

    const fetchServicesAndCompanies = async () => {
        try {
            const servicesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`);
            const servicesData = await servicesResponse.json();
            setServices(servicesData);

            const companiesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/all`);
            const companiesData = await companiesResponse.json();
            setCompanies(companiesData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        fetchServicesAndCompanies();
    }, []);

    useEffect(() => {
        if (!isExiting) {
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
    }, [isExiting]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Проверяем, был ли клик вне всех дропменю
            if (
                (dropdownServicesRef.current && !dropdownServicesRef.current.contains(event.target)) &&
                (dropdownCompaniesRef.current && !dropdownCompaniesRef.current.contains(event.target)) &&
                (dropdownRatingsRef.current && !dropdownRatingsRef.current.contains(event.target))
            ) {
                setOpenDropdown(null);  // Закрываем все дропменю
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrice(value);
    };

    const handleServiceChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const handleCompanyChange = (company) => {
        setSelectedCompanies((prev) =>
            prev.includes(company)
                ? prev.filter((item) => item !== company)
                : [...prev, company]
        );
    };

    const formattedPrice = price ? Number(price).toLocaleString('ru-RU') : '';

    return (
        <>
            <div
                className={`${styles.blurBackground} ${isExiting ? styles.exiting : ''}`}
                onClick={handleClose}
            ></div>
            <div
                ref={filterModalRef}
                className={`${styles.filterModal} ${isExiting ? styles.exiting : ''}`}
            >
                <div className={styles.formContainer}>
                    <button className={styles.closeButton} onClick={handleClose}>
                        ×
                    </button>
                    <div className={styles.filterInputs}>
                        <input
                            type="text"
                            placeholder="Цена"
                            value={formattedPrice}
                            onChange={handlePriceChange}
                        />

                        <DropDown
                            ref={dropdownServicesRef} // Ссылка на услуги
                            title="Услуги"
                            options={services.map(service => service.service_name)}
                            selectedOptions={selectedServices}
                            onChange={handleServiceChange}
                            isOpen={openDropdown === 'services'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'services' ? null : 'services')
                            }
                        />

                        <DropDown
                            ref={dropdownCompaniesRef} // Ссылка на компании
                            title="Компании"
                            options={companies.map(company => company.login)}
                            selectedOptions={selectedCompanies}
                            onChange={handleCompanyChange}
                            isOpen={openDropdown === 'companies'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'companies' ? null : 'companies')
                            }
                        />
                    </div>
                    <div className={styles.filterBtns}>
                        <DropDown
                            ref={dropdownRatingsRef} // Ссылка на рейтинги
                            title="Оценки"
                            options={ratings}
                            isOpen={openDropdown === 'ratings'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'ratings' ? null : 'ratings')
                            }
                        />
                        <button className="blueBtn" onClick={handleClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterForm;
