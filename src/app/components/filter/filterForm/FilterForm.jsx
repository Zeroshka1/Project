import React, { useState, useEffect, useRef } from 'react';
import styles from '../filter.module.css';
import DropDown from './DropDown';

function FilterForm({ onClose }) {
    const [price, setPrice] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isExiting, setIsExiting] = useState(false);

    const [services, setServices] = useState([]);
    const [companies, setCompanies] = useState([]);
    const ratings = [1, 2, 3, 4, 5];

    const filterModalRef = useRef(null);

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
                            title="Услуги"
                            options={services.map(service => service.service_name)}
                            isOpen={openDropdown === 'services'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'services' ? null : 'services')
                            }
                        />

                        <DropDown
                            title="Компании"
                            options={companies.map(company => company.login)}
                            isOpen={openDropdown === 'companies'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'companies' ? null : 'companies')
                            }
                        />
                    </div>
                    <div className={styles.filterBtns}>
                        <DropDown
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
