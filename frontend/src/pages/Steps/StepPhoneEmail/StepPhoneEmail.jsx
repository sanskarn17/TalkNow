import React, {useState} from 'react';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepEmail.module.css'
const phoneEmailMap = {
    phone: Phone,
    email : Email
}
const StepPhoneEmail = ({onNext}) => {
    const [type, setType]  = useState('phone');
    const Component = phoneEmailMap[type];
    return (
        <>
        <div className={styles.cardWrapper}>
            <div>
                <div className={styles.buttonWrap}>
                    <button className={`${styles.tabButton} ${type==='phone' ? styles.active : styles.deactive} ` } onClick={()=> setType('phone')}>
                        <img  src="/images/Smartphone.png" alt="" />
                    </button>
                    <button className={`${styles.tabButton} ${type==='email' ? styles.active : styles.deactive} `} onClick={()=> setType('email')}>
                        <img  src="/images/Email.png" alt="" />
                    </button>
                </div>
                <Component onNext = {onNext}/>
            </div>
        </div>
        
        
        </>
    )
}

export default StepPhoneEmail