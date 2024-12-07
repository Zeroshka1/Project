import React, { useState, useEffect, useRef } from 'react';
import styles from '../filter.module.css';
import DropDown from './DropDown';

function FilterForm({ onApplyFilters, onClose }) {
    const [price, setPrice] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isExiting, setIsExiting] = useState(false);

    const filterModalRef = useRef(null);
    const services = ["A", "B", "C", "D"];
    const companies = ["A", "B", "C"];
    const ratings = [1, 2, 3, 4, 5];

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

    const handleApply = () => {
        const filters = { price, selectedServices, selectedCompanies, selectedRatings };
        onApplyFilters(filters);
        handleClose();
    };

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
                            options={services}
                            selectedOptions={selectedServices}
                            onChange={(service) => {
                                setSelectedServices((prev) =>
                                    prev.includes(service)
                                        ? prev.filter((item) => item !== service)
                                        : [...prev, service]
                                );
                            }}
                            isOpen={openDropdown === 'services'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'services' ? null : 'services')
                            }
                        />
                        <DropDown
                            title="Компании"
                            options={companies}
                            selectedOptions={selectedCompanies}
                            onChange={(company) => {
                                setSelectedCompanies((prev) =>
                                    prev.includes(company)
                                        ? prev.filter((item) => item !== company)
                                        : [...prev, company]
                                );
                            }}
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
                            selectedOptions={selectedRatings}
                            onChange={(rating) => {
                                setSelectedRatings((prev) =>
                                    prev.includes(rating)
                                        ? prev.filter((item) => item !== rating)
                                        : [...prev, rating]
                                );
                            }}
                            isOpen={openDropdown === 'ratings'}
                            toggleDropdown={() =>
                                setOpenDropdown(openDropdown === 'ratings' ? null : 'ratings')
                            }
                        />
                        <button className="blueBtn" onClick={handleApply}>
                            Показать
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterForm;
