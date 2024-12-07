'use client'
import React, { useState, useEffect } from 'react';
import styles from './allServices.module.css';
import ListServices from './listServices/ListServices';
import Filter from '../filter/Filter';
import FilterForm from '../filter/filterForm/FilterForm';

function AllServices() {
    const [filters, setFilters] = useState({ price: '', selectedServices: [] });
    const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => {
            if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
                return newFilters;
            }
            return prevFilters;
        });
    };


    const toggleFilterForm = () => {
        setIsFilterFormOpen(!isFilterFormOpen);
    };


    return (
        <div className={`${styles.allServicesContainer} container`}>
            <h1>Все услуги</h1>

            <Filter onFilterChange={handleFilterChange} openMenu={toggleFilterForm} />

            {isFilterFormOpen && (
                <FilterForm
                    onApplyFilters={handleFilterChange}
                    onClose={toggleFilterForm}
                />
            )}

            <div className={styles.allServicesWrapper}>
                <ListServices filters={filters} />
            </div>
        </div>
    );
}

export default AllServices;

