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

    const services = ["A", "B", "C", "D"];

    // Обработка изменения цены
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Убираем все нечисловые символы
        setPrice(value);
        setTempFilters((prev) => ({
            ...prev,
            price: value ? parseInt(value) : null // Преобразуем в число
        }));
    };

    const formattedPrice = price ? Number(price).toLocaleString('ru-RU') : '';

    // Обновление временных фильтров при изменении выбранных услуг
    useEffect(() => {
        setTempFilters((prev) => ({
            ...prev,
            selectedServices
        }));
    }, [selectedServices]);

    // Обработка выбора услуги
    const handleServiceChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service) // Убираем услугу из выбранных
                : [...prev, service] // Добавляем услугу в выбранные
        );
    };

    // Открытие/закрытие выпадающего списка
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
                            options={services}
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
