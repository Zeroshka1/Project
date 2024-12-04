import React, { useState } from 'react';
import styles from './card.module.css';
import Image from 'next/image';

function Card({ data, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    onClose();
    setIsVisible(false)
  };


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
                <p>{data.companyName}</p>
              </div>

              <div className={styles.ratingWrapper}>
                <div className={styles.ratingCompany}>
                  <span>{data.rating}</span>
                  <Image
                    src="https://img.icons8.com/?size=100&id=PuXqa9IZtu5P&format=png&color=000000"
                    alt="star"
                    width={32}
                    height={32}
                  />
                </div>

              </div>
            </div>

            <div className={styles.servicesPrice}>
              <div className={styles.servicesWrapper}>
                <span>Услуги</span>
                <div className={styles.sevicesCompany}>
                  <p>{data.sevicesCompany}</p>
                </div>
              </div>

              <div className={styles.priceWrapper}>
                <span>Цена</span>
                <div className={styles.priceCompany}>
                  <p>{data.price}</p>
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
