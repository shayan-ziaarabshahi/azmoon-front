import React, { useEffect, useState } from 'react'
import styles from './Submit.module.css'
import { setSchoolNameAction, setGradeAction, setAgeAction, setSuccessAction, setEmailAction } from './../redux/slices/websiteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setTotalsAction } from './../redux/slices/websiteSlice'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Submit() {

    const dispatch = useDispatch()
    const selector = useSelector(state => state.websiteSlice)

    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        let a;
        let iq_total_point = 0
        for (a of Object.values(selector.IQ.options)) {
            if (a.p) {
                iq_total_point += a.p
            }
        }


        let b;
        let sh_total_point = 0
        let rh_total_point = 0
        let eh_total_point = 0
        let counter1 = 1
        for (b of Object.values(selector.SH.options)) {
            if (b.p) {
                sh_total_point += b.p
                if (counter1 % 2 === 0) {
                    rh_total_point += b.p
                } else {
                    eh_total_point += b.p
                }
            }
            counter1 += 1
        }


        let c;
        let of_total_point = 0
        let cf_total_point = 0
        let ef_total_point = 0
        let af_total_point = 0
        let nf_total_point = 0
        let counter2 = 1
        for (c of Object.values(selector.PF.options)) {
            if (c.p) {
                if (counter2 % 5 === 0) {
                    cf_total_point += c.p
                }
                else if (counter2 % 5 === 1) {
                    nf_total_point += c.p
                }
                else if (counter2 % 5 === 2) {
                    ef_total_point += c.p
                }
                else if (counter2 % 5 === 3) {
                    of_total_point += c.p
                }
                else if (counter2 % 5 === 4) {
                    af_total_point += c.p
                }
            }
            counter2 += 1
        }


        dispatch(setTotalsAction({
            iq: iq_total_point,

            sh: sh_total_point,
            rh: rh_total_point,
            eh: eh_total_point,

            of: of_total_point,
            cf: cf_total_point,
            ef: ef_total_point,
            af: af_total_point,
            nf: nf_total_point
        }))
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selector.schoolName && selector.grade && selector.age && selector.email) {
            setLoader(true)
            const p = await axios(
                {
                    url: 'https://azmoon-api.onrender.com/api/assessment',
                    method: 'POST',
                    data: {
                        IQ: selector.IQ,
                        SH: selector.SH,
                        PF: selector.PF,
                        schoolName: selector.schoolName,
                        grade: selector.grade,
                        age: selector.age,
                        email: selector.email
                    }
                }
            )
            console.log(p)
            if (p.status >= 200 && p.status < 300) {
                setLoader(false)
                dispatch(setSuccessAction({ success: true }))
                navigate('/results')
            } else {
                setLoader(false)
                toast.error('خطایی رخ داده است.', {
                    transition: Flip
                });
            }
        } else {
            toast.error('به نظر میرسد به برخی پرسش های زیر پاسخ نداده اید. لطفا پیش از ارسال پاسخنامه به تمام پرسش های زیر پاسخ دهید.', {
                transition: Flip
            });
        }
    }

    if (selector.IQTestPassed === false) {
        return <Navigate to='/E1' />
    }
    if (selector.success === true) {
        return <Navigate to='/results' />
    } 

    return (
        <div className={styles.container}>
            <ToastContainer
                rtl
                theme='dark'
                transition={Flip}
            />

            <div className={styles.innerContainer}>
                <span className={styles.description}>
                    لطفا موارد زیر را تکمیل کرده و در نهایت روی دکمه ارسال کلیک کنید.
                </span>
                <form onSubmit={handleSubmit}>
                    <div className={styles.grid}>
                        <div className={styles.fieldContainer}>
                            <label htmlFor='schoolName'>نام مدرسه</label>
                            <input
                                name='schoolName'
                                type='text'
                                onChange={(e) => dispatch(setSchoolNameAction({ schoolName: e.target.value }))}
                                value={selector.schoolName}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label htmlFor='grade'>مقطع تحصیلی</label>
                            <input
                                name='grade'
                                type='text'
                                onChange={(e) => dispatch(setGradeAction({ grade: e.target.value }))}
                                value={selector.grade}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label htmlFor='age'>
                                سن (لطفا تنها عدد صحیح وارد کنید)
                            </label>
                            <input
                                type='text'
                                name='age'
                                placeholder='18'
                                onChange={(e) => dispatch(setAgeAction({ age: e.target.value }))}
                                value={selector.age}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label htmlFor='email'>
                                ایمیل
                            </label>
                            <input
                                type='text'
                                name='email'
                                placeholder=''
                                onChange={(e) => dispatch(setEmailAction({ email: e.target.value }))}
                                value={selector.email}
                            />
                        </div>

                    </div>
                    <div className={styles.buttonContainer}>
                        {!loader && <input type='submit' value='ارسال' />}
                        {loader && <div className={styles.loader}></div>}
                    </div>
                </form>
            </div >
        </div >
    )
}