'use client'
import React, { useState, useEffect } from "react";
import styles from "./filter.module.css";
import Dropdown from "./filterForm/DropDown";

function Filter({ onFilterChange, openMenu }) {
    const [selectedServices, setSelectedServices] = useState([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [tempFilters, setTempFilters] = useState({
        price: null,
        selectedServices: []
    });

    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        try {
            const servicesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`);
            const servicesData = await servicesResponse.json();
            setServices(servicesData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrice(value);
        setTempFilters((prev) => ({
            ...prev,
            price: value ? parseInt(value) : null
        }));
    };

    const formattedPrice = price ? Number(price).toLocaleString('ru-RU') : '';

    useEffect(() => {
        setTempFilters((prev) => ({
            ...prev,
            selectedServices
        }));
    }, [selectedServices]);

    const handleServiceChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleApplyFilters = () => {
        onFilterChange(tempFilters);
    };

    return (
        <>
            <div className={`${styles.filterContainer} container pc`}>
                <div className={styles.filterWrapper}>
                    <div className={styles.filterInputs}>
                        <input
                            type="text"
                            placeholder="Цена"
                            value={formattedPrice}
                            onChange={handlePriceChange}
                        />
                       <Dropdown
                            title="Услуги"
                            options={services.map(service => service.service_name)}
                            selectedOptions={selectedServices}
                            onChange={handleServiceChange}
                            isOpen={isDropdownOpen}
                            toggleDropdown={toggleDropdown}
                        />
                    </div>

                    <div className={styles.filterBtns}>
                        <button onClick={openMenu}>Фильтр</button>
                        <button className="blueBtn" onClick={handleApplyFilters}>
                            Показать
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
