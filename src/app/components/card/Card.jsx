import React, { useState, useEffect } from 'react';
import styles from './card.module.css';
import Image from 'next/image';

function Card({ data, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    onClose();
    setIsVisible(false);
  };
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

  return (
    <>
      <div className={`${styles.blurBackground} ${!isVisible ? styles.hidden : ''}`} onClick={handleClose}></div>
      <div className={styles.cardModal}>
        <div className={styles.formContainer}>
          <button className={styles.closeButton} onClick={handleClose}>×</button>

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
                {/* Замените company_id на companyName */}
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

            <button className='blueBtn'>Связаться</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
