import React from "react";
import Image from "next/image";
import styles from '../../authForm.module.css';

const CustomerSignUp = ({ formData, handleInputChange, handleImageUpload, imagePreview, triggerFileUpload }) => {
    return (
        <>
            <div className={styles.uploadImgWrapper}>
                {imagePreview ? (
                    <Image src={imagePreview} alt="Uploaded image" width={165} height={155} className={styles.imgAvatar} />
                ) : (
                    <div className={styles.placeholderAvatar} onClick={triggerFileUpload}>
                        <Image src='https://img.icons8.com/?size=100&id=ov44J4rOnabQ&format=png&color=000000' alt="Uploaded image" width={77} height={67} className={styles.imgPrev} />
                    </div>
                )}
                <input type="file" id="imageUploadInput" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>

            <input
                type="text"
                name="username"
                placeholder="Логин"
                value={formData.username}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
            />
        </>
    );
};

export default CustomerSignUp;
