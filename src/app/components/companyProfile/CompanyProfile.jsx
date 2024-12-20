'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './companyProfile.module.css';
import Loader from '../loader/Loader';
import Services from './services/Services';

const CompanyProfile = () => {
    const [companyData, setCompanyData] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [isOrderWindow, setIsOrderWindow] = useState(true);
    const [loading, setLoading] = useState(true);
    const [selectedServices, setSelectedServices] = useState([]); 
    const [existingServices, setExistingServices] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) throw new Error("Токен отсутствует");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = await response.json();
                setCompanyData(user);

                const responseC = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const companyInfo = await responseC.json();
                setCompanyInfo(companyInfo);

                if (!response.ok || !responseC.ok) throw new Error("Ошибка получения данных пользователя или компании");

                const responseServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${companyInfo.id}/services`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const services = await responseServices.json();
                setExistingServices(services);
                

            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const selectServices = () => {
        setIsOrderWindow(false);
    };

    const selectOrders = () => {
        setIsOrderWindow(true);
    };

    const handleApply = async () => {
        if (!companyInfo || !companyInfo.id) {
            console.error('company_id не найден');
            return;
        }

        if (selectedServices.length === 0) {
            console.error('Выбранные услуги не найдены');
            return;
        }

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Токен отсутствует");

            const company_id = companyInfo.id;

            const createServiceUrl = `${process.env.NEXT_PUBLIC_API_URL}/company/service/create`;
            const updateServiceUrl = `${process.env.NEXT_PUBLIC_API_URL}/company/services?company_id=${company_id}`;

            for (const service of selectedServices) {
                const serviceData = {
                    company_id,
                    service_id: service.service_id,
                    price_min: service.price_min,
                    price_max: service.price_max,
                    description: service.description || "Без описания"
                };

                const existingService = existingServices.find(existing => existing.services_id === service.service_id);

                if (existingService) {
                    const updatedServiceData = {
                        service_id: service.service_id,
                        price_min: service.price_min,
                        price_max: service.price_max
                    };

                    const response = await fetch(updateServiceUrl, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedServiceData)
                    });

                    const textResponse = await response.text();

                    if (!response.ok) {
                        console.error(`Ошибка обновления услуги ${service.service_id}. Статус: ${response.status}, Ответ: ${textResponse}`);
                        throw new Error("Ошибка обновления услуги");
                    }

                    console.log(`Услуга ${service.service_id} успешно обновлена: ${textResponse}`);
                } else {
                    const response = await fetch(createServiceUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(serviceData)
                    });

                    const textResponse = await response.text();

                    if (!response.ok) {
                        console.error(`Ошибка создания услуги ${service.service_id}. Статус: ${response.status}, Ответ: ${textResponse}`);
                        throw new Error("Ошибка создания услуги");
                    }

                    console.log(`Услуга ${service.service_id} успешно создана: ${textResponse}`);
                }
            }
        } catch (err) {
            console.error("Ошибка:", err.message);
        }
    };

    if (loading) {
        return (
            <div className={`${styles.companyWrapper} container`}>
                <div className={styles.companyInfo}>
                    <div className={styles.loaderWrapper}><Loader /></div>
                </div>
            </div>
        );
    }

    if (!companyData || !companyInfo) {
        return (
            <div className={`${styles.companyWrapper} container`}>
                <div className={styles.companyInfo}>
                    <p>Не удалось загрузить данные компании.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.companyWrapper} container`}>
            <div className={styles.containerBtns}>
                <div className={styles.wrapperBtns}>
                    <button className="blueBtn" onClick={selectOrders}>Заявки</button>
                    <button className="blueBtn" onClick={selectServices}>Услуги</button>
                </div>
            </div>

            <div className={styles.companyInfo}>
                {companyData.photo ? (
                    <Image
                        src={companyData.photo}
                        alt="Profile"
                        width={200}
                        height={200}
                    />
                ) : (
                    <div className={styles.placeholderAvatar}>
                        <Image
                            src="https://img.icons8.com/?size=100&id=MRZg41dxvuQk&format=png&color=000000"
                            alt="Uploaded image"
                            width={400}
                            height={400}
                            className={styles.imgPrev}
                        />
                    </div>
                )}
                <p className={styles.nameCompany}>{companyData.login}</p>
                {/* <div className={styles.ratingCompany}>
                    <span>{companyData.rating}</span>
                    <Image
                        src="https://img.icons8.com/?size=100&id=PuXqa9IZtu5P&format=png&color=000000"
                        alt="star"
                        width={32}
                        height={32}
                    />
                </div> */}
                <p className={styles.emailCompany}>{companyData.email}</p>
            </div>

            {isOrderWindow ? (
                <div className={styles.orderWrapper}>
                    <h1>Ваши Заявки</h1>
                </div>
            ) : (
                <div className={styles.servicesWrapper}>
                    <h1>Список услуг</h1>
                    <Services setSelectedServices={setSelectedServices} />
                    <div className={styles.btnWrapper}>
                        <button className="blueBtn" onClick={handleApply}>
                            Применить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyProfile;
