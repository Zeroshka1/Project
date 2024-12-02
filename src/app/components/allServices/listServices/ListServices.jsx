import React from 'react'
import styles from '../allServices.module.css'
import PrevCard from '../../prevCard/PrevCard'

function ListServices() {
    return (
        <div className={styles.listServicesWrapper}>
            <PrevCard
                type="company"
                data={{
                    photo: "",
                    companyName: "Company ABC",
                    rating: 4.5,
                    sevicesCompany: 'Веб-разработка, мобильные приложения, UI/UX дизайн',
                    price: '10,000-150,000 ₽'
                }}
                showRating={true} />

            <PrevCard
                type="company"
                data={{
                    photo: "",
                    companyName: "Company ABC",
                    rating: 4.5,
                    sevicesCompany: 'Веб-разработка, мобильные приложения, UI/UX дизайн',
                    price: '10,000-150,000 ₽'
                }}
                showRating={true} />

            <PrevCard
                type="company"
                data={{
                    photo: "",
                    companyName: "Company ABC",
                    rating: 4.5,
                    sevicesCompany: 'Веб-разработка, мобильные приложения, UI/UX дизайн',
                    price: '10,000-150,000 ₽'
                }}
                showRating={true} />

        </div>
    )
}

export default ListServices