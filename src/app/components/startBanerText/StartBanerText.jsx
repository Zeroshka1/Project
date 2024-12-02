import React from 'react'
import styles from './startBanerText.module.css'
function StartBanerText() {
    return (
        <div className={`${styles.wrapper} container`}>
            <div className={styles.container}>
                <h1 className={styles.typedOut}>Подбор IT-услуг <span>в Самаре</span></h1>
            </div>
            <p>В сервисе подбора IT-услуг вы можете выбрать параметры, задать
                условия поиска по разработке сайтов, мобильных приложений и
                другим услугам, а также найти компанию с рейтингом до 5.0 и
                доступными ценами.
            </p>
        </div>
    )
}

export default StartBanerText