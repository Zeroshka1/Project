import React from 'react'
import styles from './allServices.module.css'
import ListServices from './listServices/ListServices'

function AllServices() {
    return (
        <div className={`${styles.allServicesContainer} container`}>
            <h1>Все услуги</h1>
            <div className={styles.allServicesWrapper}>
                <ListServices/>
            </div>
        </div>
    )
}

export default AllServices