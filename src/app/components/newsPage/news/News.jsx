'use client'
import React, { useEffect, useState } from 'react';
import NewBlock from '../newBlock/NewBlock';
import Loader from '../../loader/Loader';
import styles from '../newsPage.module.css'

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/all`);
                if (!response.ok) throw new Error('Не удалось загрузить данные новостей');
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className={styles.wrapperNewsBlock}>
            {news.length === 0 ? (
                <div className={styles.loaderWrapper}><Loader/></div>
            ) : (
                news.map((newsItem) => (
                    <NewBlock key={newsItem.id} data={newsItem} />
                ))
            )}
        </div>
    );
}

export default News;
