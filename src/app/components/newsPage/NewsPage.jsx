import React from 'react'
import styles from './newsPage.module.css'
import News from './news/News'

function NewsPage() {
  return (
    <div className={`${styles.newsPageWrapper} container`}>
      <News />
    </div>
  )
}

export default NewsPage