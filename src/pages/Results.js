import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styles from './Results.module.css'



export default function Results() {

    const selector = useSelector(state => state.websiteSlice)

    if (selector.IQTestPassed === false) {
        return <Navigate to='/E1' />
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <span className={styles.description}>
                    عملکرد شما در سنجش های اخذ شده به قرار زیر است. با این وجود شما نباید این نمرات را به عنوان عملکرد ثابت و همیشگی خود در نظر بگیرید.
                </span>
                <div className={styles.IQContainer}>
                    <span>آزمون الگو</span>
                    <span>{selector.IQ.t}/60</span>
                </div>

                <div className={styles.SHContainer}>
                    <span>سلامت معنایی</span>
                    <span>{selector.SH.t}/120</span>
                </div>

                <div className={styles.PFContainer}>
                    <span className={styles.PFTitle}>ویژگی های شخصیتی</span>
                    <div>
                        <span>برونگرایی</span>
                        <span>{selector.PF.ef}/48</span>
                    </div>
                    <div>
                        <span>وجدانگرایی</span>
                        <span>{selector.PF.cf}/48</span>
                    </div>
                    <div>
                        <span>تجربه گرایی</span>
                        <span>{selector.PF.of}/48</span>
                    </div>
                    <div>
                        <span>توافق پذیری</span>
                        <span>{selector.PF.af}/48</span>
                    </div>
                    <div>
                        <span>روانرنجوری</span>
                        <span>{selector.PF.nf}/48</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
