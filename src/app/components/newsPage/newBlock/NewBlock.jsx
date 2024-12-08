'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../newsPage.module.css'; 

function NewBlock({ data }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (data.image) {
            console.log('Image Data:', data.image);
            const fetchImage = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/image/${data.image}`);
                    if (!response.ok) throw new Error('Не удалось загрузить изображение');
                    
                    const imagePath = await response.json();
                    console.log(imagePath);
                    setImageUrl(imagePath);
    
                } catch (error) {
                    console.error('Ошибка при загрузке изображения:', error);
                }
            };
    
            fetchImage();
        }
    }, [data.image]);
    

    return (
        <div className={styles.newsBlockWrapper}>
            <div className={styles.newsInfo}>
                <div className={styles.title}>
                    <h3>{data.title}</h3>
                </div>

                <div className={styles.photo}>
                    {imageUrl ? (
                        <Image src={`https://decadenz.site/news/image/${imageUrl}`} alt="newsPhoto" width={200} height={200} />
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className={styles.description}>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NewBlock;
