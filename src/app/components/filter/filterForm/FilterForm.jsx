import React from 'react'
import styles from '../filter.module.css'

function FilterForm({ onClose }) {
    return (
        <div className={styles.filterModal}>
            <div className={styles.formContainer}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                filter
            </div>
        </div>

    )
}

export default FilterForm