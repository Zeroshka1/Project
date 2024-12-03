import React from 'react';
import styles from '../filter.module.css';

const Dropdown = ({ title, options, selectedOptions, onChange, isOpen, toggleDropdown }) => (
    <div className={styles.dropdown}>
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

export default Dropdown;
