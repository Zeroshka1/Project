import React, { useState, useEffect } from 'react';
import styles from '../companyProfile.module.css';

function Services({ setSelectedServices }) {
    const [services, setServices] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [prices, setPrices] = useState({});

    const fetchServices = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`);
            const data = await response.json();
            setServices(data);

            const initialPrices = data.reduce((acc, service) => {
                acc[service.service_id] = { minPrice: '', maxPrice: '' };
                return acc;
            }, {});
            setPrices(initialPrices);
        } catch (error) {
            console.error('Ошибка при загрузке услуг:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleChange = (service_id) => {
        setSelectedOptions((prev) => {
            if (prev.includes(service_id)) {
                return prev.filter((item) => item !== service_id);
            } else {
                return [...prev, service_id];
            }
        });
    };

    const handlePriceChange = (service_id, e) => {
        const { name, value } = e.target;
        setPrices((prev) => ({
            ...prev,
            [service_id]: {
                ...prev[service_id],
                [name]: value,
            }
        }));
    };

    useEffect(() => {
        const updatedServices = services.map((service) => ({
            service_id: service.service_id,
            price_min: prices[service.service_id]?.minPrice || '',
            price_max: prices[service.service_id]?.maxPrice || '',
        }));
        setSelectedServices(updatedServices.filter(service => selectedOptions.includes(service.service_id)));
    }, [selectedOptions, prices, services, setSelectedServices]);

    return (
        <div className={styles.servicesAndPrice}>
            <ul className={styles.dropdownMenu}>
                {services.map((service) => (
                    <li key={service.service_id}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                value={service.service_name}
                                checked={selectedOptions.includes(service.service_id)} 
                                onChange={() => handleChange(service.service_id)} 
                                className={styles.checkboxInput}
                            />
                            <span className={styles.checkboxCustom}></span>
                            <span className={styles.nameService}>{service.service_name}</span>
                        </label>

                        <div className={styles.priceInputs}>
                            <div className={styles.priceInputWrapper}>
                                <input
                                    type="number"
                                    name="minPrice"
                                    value={prices[service.service_id]?.minPrice || ''} 
                                    onChange={(e) => handlePriceChange(service.service_id, e)} 
                                    placeholder="Мин"
                                    className={`${styles.priceInput} ${!selectedOptions.includes(service.service_id) ? styles.disabledInput : ''}`}
                                    disabled={!selectedOptions.includes(service.service_id)} 
                                />
                                 
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={prices[service.service_id]?.maxPrice || ''} 
                                    onChange={(e) => handlePriceChange(service.service_id, e)} 
                                    placeholder="Макс"
                                    className={`${styles.priceInput} ${!selectedOptions.includes(service.service_id) ? styles.disabledInput : ''}`}
                                    disabled={!selectedOptions.includes(service.service_id)} 
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Services;
