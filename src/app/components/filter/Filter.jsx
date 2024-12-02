"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./filter.module.css";
import FilterForm from "./filterForm/FilterForm";

function Filter() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);

    const services = ["Веб-разработка", "Мобильная-разработка", "SEO", "И т.д"];

    useEffect(() => {
        if (isFilterFormOpen) {
          document.body.classList.add('hiddenScroll');
          document.documentElement.classList.add('hiddenScroll');
          console.log('работает')
        } else {
          document.body.classList.remove('hiddenScroll');
          document.documentElement.classList.remove('hiddenScroll');
          console.log('не работает')
        }
        return () => {
          document.body.classList.remove('hiddenScroll');
          document.documentElement.classList.remove('hiddenScroll');
        };
      }, [isFilterFormOpen]);

    const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

    const handleCheckboxChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleFilterForm = () => {
        setIsFilterFormOpen(!isFilterFormOpen)
    }

    return (
        <>
            <div className={`${styles.filterContainer} container`}>
                <div className={styles.filterWrapper}>
                    <div className={styles.filterInputs}>
                        <input type="text" placeholder="Цена" />

                        {/* Выпадающий список с чекбоксами */}
                        <div
                            className={styles.dropdown}
                            ref={dropdownRef}
                        >
                            <div
                                className={styles.dropdownToggle}
                                onClick={toggleDropdown}
                                tabIndex={0}
                            >
                                {selectedServices.length > 0
                                    ? selectedServices.join(", ")
                                    : "Услуги"}
                                <span className={styles.dropdownArrow}>▼</span>
                            </div>
                            {isDropdownOpen && (
                                <ul className={styles.dropdownMenu}>
                                    {services.map((service) => (
                                        <li key={service}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    value={service}
                                                    checked={selectedServices.includes(service)}
                                                    onChange={() => handleCheckboxChange(service)}
                                                    className={styles.checkboxInput}
                                                />
                                                <span className={styles.checkboxCustom}></span>
                                                <span className={styles.nameService}>{service}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
