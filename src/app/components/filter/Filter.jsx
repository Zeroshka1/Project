"use client";
import React, { useState, useEffect } from "react";
import styles from "./filter.module.css";
import FilterForm from "./filterForm/FilterForm";
import Dropdown from "./filterForm/DropDown";

function Filter() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [price, setPrice] = useState('');

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrice(value);
    };

    const formattedPrice = price ? Number(price).toLocaleString('ru-RU') : '';

    const services = ["Веб-разработка", "Мобильная-разработка", "SEO", "И т.д"];

    useEffect(() => {
        if (isFilterFormOpen) {
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
    }, [isFilterFormOpen]);

    const handleServiceChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const toggleFilterForm = () => {
        setIsFilterFormOpen(!isFilterFormOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
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
                        <button onClick={toggleFilterForm}>Фильтр</button>
                        <button className="blueBtn">Показать</button>
                    </div>
                </div>
            </div>

            {isFilterFormOpen && <FilterForm onClose={toggleFilterForm} />}
        </>
    );
}

export default Filter;
