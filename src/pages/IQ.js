import React, { useEffect, useRef, useState } from 'react'
import styles from './IQ.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setScoreAction } from './../redux/slices/websiteSlice'
import { IQTestArray } from '../data/IQ'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setIQTestPassedAction } from './../redux/slices/websiteSlice'


export default function IQ() {

  const [minutes, _setMinutes] = useState(1)
  const minutesRef = useRef(minutes)
  function setMinutes(x) {
    minutesRef.current = x;
    _setMinutes(x);
  }
  const [seconds, _setSeconds] = useState(0)
  const secondsRef = useRef(seconds)
  function setSeconds(y) {
    secondsRef.current = y;
    _setSeconds(y);
  }


  const intervalRef_S = useRef()
  const intervalRef_M = useRef()


  const navigate = useNavigate()

  const dispatch = useDispatch()
  const selector = useSelector(state => state.websiteSlice)

  const countDownMinutes = () => {
    if (minutesRef.current === 0) {
      clearInterval(intervalRef_M.current)
    } else {
      console.log(minutesRef.current)
      setMinutes(minutesRef.current - 1)
    }
  }
  const countDownSeconds = () => {
    if (minutesRef.current === 0 && secondsRef.current === 8) {
      toast('در حال انتقال به صفحه پرسشنامه 1. لطفا از بازگشت یا ریلود صفحه خودداری کنید.', {
        transition: Flip
      });
    }
    if (minutesRef.current === 0 && secondsRef.current === 1) {
      clearInterval(intervalRef_S.current)
      dispatch(setIQTestPassedAction({ passed: true }))
      navigate('/Q1')
    } else {
      setSeconds(secondsRef.current === 0 ? 59 : secondsRef.current - 1)
    }
  }

  useEffect(() => {
    intervalRef_S.current = setInterval(() => countDownMinutes(), 60000);
    intervalRef_M.current = setInterval(() => countDownSeconds(), 1000);
    return () => {
      clearInterval(intervalRef_M.current)
      clearInterval(intervalRef_S.current)
    };
  }, [])

  if (selector.IQTestPassed) {
    return <Navigate to='/Q1' />
  }

  const handleChange = (e, o) => {
    dispatch(setScoreAction({ section: 'IQ', item: e.target.name, option: o, point: Number(e.target.value) }))
  }

  return (
    <div className={styles.container}>
      <ToastContainer
        rtl
        theme='dark'
        position='bottom-right'
        transition={Flip}
      />
      <div className={styles.header}>
        <div className={styles.descriptionContainer}>
          <span>این آزمون شامل ۶۰ سوال است. در هر سوال باید با توجه به الگوی داده شده قطعه گم شده را حدس بزنید.</span>
          <span>بعد از اتمام زمان پاسخگویی به این آزمون به طور خودکار وارد صفحه پرسشنامه ۱ خواهید شد.</span>
        </div>
        <div className={styles.timerContainer}>
          {String(secondsRef.current).padStart(2, 0)} : {String(minutesRef.current).padStart(2, 0)}
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {IQTestArray.map(item => (
          <div className={styles.itemContainer}>
            <div className={styles.radiosContainer}>
              <span className={styles.itemNumber}>{item.num}</span>
              {item.options.map((i, index) => {
                return (
                  <label className={styles.radio}>
                    <input type="radio" name={item.name} value={i.p} checked={selector.IQ.options[item.name].o === index + 1 ? true : false} onChange={(e) => handleChange(e, i.o)} />
                    <span>{i.s}.</span>
                  </label>
                )
              }
              )}
            </div>
            <img src={item.image} className={styles.itemImage} />
          </div>
        ))}
      </div>
    </div>
  )
}