'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../newsPage.module.css';

function NewBlock({ data }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (data.id) {
            const fetchImage = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/image/${data.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) throw new Error('Не удалось загрузить изображение');

                    const imageBlob = await response.blob();

                    const imageObjectUrl = URL.createObjectURL(imageBlob);

                    setImageUrl(imageObjectUrl);

                } catch (error) {
                    console.error('Ошибка при загрузке изображения:', error);
                }
            };

            fetchImage();
        }
    }, [data.id]);

    return (
        <div className={styles.newsBlockWrapper}>
            <div className={styles.newsInfo}>
                <div className={styles.title}>
                    <h3>{data.title}</h3>
                </div>

                <div className={styles.photo}>
                    {imageUrl ? (
                        <Image src={imageUrl} alt="newsPhoto" width={400} height={400} />
                    ) : (
                        <div>No Image</div>
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
