import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import NewsPage from '../components/newsPage/NewsPage'

function page() {
    return (
        <div>
            <Header />
            <main>
                <NewsPage/>
            </main>
            <Footer />
        </div>
    )
}

export default page