import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import headerImage from './../images/uni.png'


export default function Home() { 

    return (
        <div className={styles.container}>
            <a href="mailto: ziaarabshahi_shayan@yahoo.com" className={styles.emailLink}>تماس با پشتیبانی</a>
            <img src={headerImage} alt='' className={styles.HeaderImage} />
            <div className={styles.descriptionContainer}>
                <span className={styles.descriptionTitle}>
                    طرح تحقیقاتی دانشگاه علوم توانبخشی و سلامت اجتماعی
                </span>
                <span>
                    دانش آموز عزیز؛ از این که موافقت کردید در طرح تحقیقاتی ما شرکت کنیم از شما سپاسگزاریم. پاسخ های شما به ما کمک خواهد کرد تا با بررسی روابط میان متغیرهای مورد نظر گام هایی را در مسیر بهبود سلامت و پیشرفت دانش آموزان سراسر دنیا برداریم.
                </span>
                <span>
                    شما باید به یک آزمون و دو پرسشنامه پاسخ دهید. برای شروع لطفا وارد آزمون زیر شوید.
                </span>
                <span className={styles.alertText}>
                    در طول فرایند سنجش از refresh  کردن صفحه خودداری کنید.
                </span>
            </div>
            <div className={styles.itemsContainer}>
                <Link to='/log-in' style={{ textDecoration: "none", color: "black" }}>
                    <div className={styles.examContainer}>
                        <span>ورود</span>
                    </div>
                </Link>
            </div>
        </div >
    )
}
