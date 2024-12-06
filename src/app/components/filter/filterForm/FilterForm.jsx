import React, { useState, useEffect, useRef } from 'react';
import styles from '../filter.module.css';
import DropDown from './DropDown';

function FilterForm({ onApplyFilters, onClose }) {
    const [price, setPrice] = useState('');  // Цена
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const filterModalRef = useRef(null);
    const services = ["A", "B", "C", "D"];
    const companies = ["A", "B", "C"];
    const ratings = [1, 2, 3, 4, 5];

    useEffect(() => {
        if (isVisible) {
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
    }, [isVisible]);

    // Закрытие модального окна при клике вне
    const handleClose = () => {
        onClose();
        setIsVisible(false);
    };

    // Toggle для выпадающего меню
    const toggleDropdown = (dropdownType) => {
        setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
    };

    // Обработка изменения чекбоксов
    const handleCheckboxChange = (item, type) => {
        const updateSelection = (selected, setSelected) => {
            setSelected(selected.includes(item)
                ? selected.filter(i => i !== item)
                : [...selected, item]);
        };

        switch (type) {
            case "service":
                updateSelection(selectedServices, setSelectedServices);
                break;
            case "company":
                updateSelection(selectedCompanies, setSelectedCompanies);
                break;
            case "rating":
                updateSelection(selectedRatings, setSelectedRatings);
                break;
            default:
                break;
        }
    };

    // Обработка изменения цены
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');  // Убираем все нечисловые символы
        setPrice(value);  // Обновляем цену
    };
    const formattedPrice = price ? Number(price).toLocaleString('ru-RU') : '';

    // Применение фильтров
    const handleApply = () => {
        const filters = {
            price,  // Цена
            selectedServices,
            selectedCompanies,
            selectedRatings
        };

        onApplyFilters(filters);  // Применяем фильтры
        onClose();  // Закрываем модалку после применения фильтров
    };

    // Закрытие модального окна при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterModalRef.current && !filterModalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <div className={`${styles.blurBackground} ${!isVisible ? styles.hidden : ''}`} onClick={handleClose}></div>
            <div ref={filterModalRef} className={styles.filterModal}>
                <div className={styles.formContainer}>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                    <div className={styles.filterInputs}>
                        {/* Поле для изменения цены */}
                        <input
                            type="text"
                            placeholder="Цена"
                            value={formattedPrice}  // Привязка значения к состоянию
                            onChange={handlePriceChange}  // Обработчик изменения
                        />
                        <DropDown
                            title="Услуги"
                            options={services}
                            selectedOptions={selectedServices}
                            onChange={(service) => handleCheckboxChange(service, "service")}
                            isOpen={openDropdown === 'services'}
                            toggleDropdown={() => toggleDropdown('services')}
                        />
                        <DropDown
                            title="Компании"
                            options={companies}
                            selectedOptions={selectedCompanies}
                            onChange={(company) => handleCheckboxChange(company, "company")}
                            isOpen={openDropdown === 'companies'}
                            toggleDropdown={() => toggleDropdown('companies')}
                        />
                    </div>
                    <div className={styles.filterBtns}>
                        <DropDown
                            title="Оценки"
                            options={ratings}
                            selectedOptions={selectedRatings}
                            onChange={(rating) => handleCheckboxChange(rating, "rating")}
                            isOpen={openDropdown === 'ratings'}
                            toggleDropdown={() => toggleDropdown('ratings')}
                        />
                        <button className="blueBtn" onClick={handleApply}>Показать</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterForm;
