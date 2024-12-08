import React, { useState, useEffect } from 'react';
import styles from './card.module.css';
import Image from 'next/image';

function Card({ data, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  const handleClose = () => {
    setIsExiting(true);
  };

  return (
    <>
      <div
        className={`${styles.blurBackground} ${isExiting ? styles.exiting : ''}`}
        onClick={handleClose}
      ></div>
      <div
        className={`${styles.cardModal} ${isExiting ? styles.exiting : ''}`}
      >
        <div className={styles.formContainer}>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>

          <div className={styles.cardContent}>
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

            <button className="blueBtn">Связаться</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
