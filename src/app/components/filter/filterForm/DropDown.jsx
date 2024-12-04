import React, { useEffect, useRef } from 'react';
import styles from '../filter.module.css';

const Dropdown = ({ title, options, selectedOptions, onChange, isOpen, toggleDropdown }) => {
  // Создаем ref для меню
  const dropdownRef = useRef(null);

  // Используем useEffect для отслеживания кликов вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверяем, был ли клик вне меню
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Закрываем меню только если оно открыто
        if (isOpen) {
          toggleDropdown(); // Закрыть меню
        }
      }
    };

    // Добавляем обработчик событий для кликов по документу
    document.addEventListener('mousedown', handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]); // Следим за состоянием isOpen

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown} tabIndex={0}>
        <span
          className={`${styles.text} ${selectedOptions.length > 0 ? styles.selected : ''}`}
        >
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : title}
        </span>
        <span className={styles.dropdownArrow}>▼</span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li key={option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => onChange(option)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.nameService}>{option}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
