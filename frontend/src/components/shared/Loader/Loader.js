import React from 'react'
import styles from './Loader.module.css';
import Card from '../Card/Card';
const Loader=({message})=> {
  return (
    <div className={styles.cardWrapper}>
        <Card>
        <svg className={styles.spinner}
        width="68" height="68" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="34" r="31" stroke="#022B3A" strokeWidth="6"/><mask id="a" fill="#fff"><path d="M1.361 24.476A34 34 0 1 1 46.75 65.519l-2.214-5.474A28.095 28.095 0 1 0 7.03 26.13L1.36 24.476Z"/></mask><path d="M1.361 24.476A34 34 0 1 1 46.75 65.519l-2.214-5.474A28.095 28.095 0 1 0 7.03 26.13L1.36 24.476Z" stroke="#E1E5F2" strokeWidth="12" mask="url(#a)"/></svg>
            <span className={styles.message}>{message}</span>   
        </Card>
    </div>
  )
}

export default Loader