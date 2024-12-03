import React, { useState } from 'react';
import styles from '../filter.module.css';
import DropDown from './DropDown';

function FilterForm({ onClose }) {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
  
    const services = ["Веб-разработка", "Мобильная-разработка", "SEO", "И т.д"];
    const companies = ["Компания 1", "Компания 2", "Компания 3"];
    const ratings = [1, 2, 3, 4, 5];
  
    const toggleDropdown = (dropdownType) => {
      setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
    };
  
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
  
    return (
      <div className={styles.filterModal}>
        <div className={styles.formContainer}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <div className={styles.filterInputs}>
            <input type="text" placeholder="Цена" />
  
            {/* Выпадающий список услуг */}
            <DropDown
              title="Услуги" 
              options={services} 
              selectedOptions={selectedServices} 
              onChange={(service) => handleCheckboxChange(service, "service")}
              isOpen={openDropdown === 'services'}
              toggleDropdown={() => toggleDropdown('services')} 
            />
  
            {/* Выпадающий список компаний */}
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
            {/* Выпадающий список оценок */}
            <DropDown 
              title="Оценки" 
              options={ratings} 
              selectedOptions={selectedRatings} 
              onChange={(rating) => handleCheckboxChange(rating, "rating")}
              isOpen={openDropdown === 'ratings'}
              toggleDropdown={() => toggleDropdown('ratings')} 
            />
            
            <button className="blueBtn">Показать</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FilterForm;
