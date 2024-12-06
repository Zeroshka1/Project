import React from 'react';
import styles from './prevCard.module.css';
import Image from 'next/image';

function PrevCard({ type, data, showRating = false, onClick }) {
    return (
        <div className={styles.PrevCardWrapper} onClick={onClick}>
            {type === "company" && (
                <div className={styles.companyInfo}>
                    <div className={styles.logoNameRating}>
                        <div className={styles.logoAndName}>
                            {data.photo ? (
                                <Image src={data.photo} alt="Avatar" width={200} height={200} />
                            ) : (
                                <div className={styles.placeholderAvatar}>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ov44J4rOnabQ&format=png&color=000000"
                                        alt="Uploaded image"
                                        width={77}
                                        height={67}
                                        className={styles.imgPrev}
                                    />
                                </div>
                            )}
                            <p>{data.companyName}</p>
                        </div>

                        {/* <div className={styles.ratingWrapper}>
                            <span>Рейтинг</span>
                            {showRating && (
                                <div className={styles.ratingCompany}>
                                    <span>{data.rating}</span>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=PuXqa9IZtu5P&format=png&color=000000"
                                        alt="star"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            )}
                        </div> */}
                    </div>

                    <div className={styles.servicesPrice}>
                        <div className={styles.servicesWrapper}>
                            <span>Услуги</span>
                            <div className={styles.sevicesCompany}>
                                <p>{data.service_name}</p>
                            </div>
                        </div>

                        <div className={styles.priceWrapper}>
                            <span>Цена</span>
                            <div className={styles.priceCompany}>
                                <p>{data.price_min}-{data.price_max}</p>
                            </div>
                        </div>
                    </div>

                    {/* Кнопка для открытия модального окна */}
                    <button className="blueBtn" onClick={onClick}>Показать</button>
                </div>
            )}
        </div>
    );
}

export default PrevCard;
