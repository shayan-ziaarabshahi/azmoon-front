import React from 'react'
import styles from './SH.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setScoreAction } from './../redux/slices/websiteSlice'
import { SHTestArray } from '../data/SH'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SH() {


  const dispatch = useDispatch()
  const selector = useSelector(state => state.websiteSlice)

  const navigate = useNavigate()

  const handleChange = (e, o) => {
    dispatch(setScoreAction({ section: 'SH', item: e.target.name, option: o, point: Number(e.target.value) }))
  }

  const handleTransfer = () => {
    if (Object.values(selector.SH.options).some(i => i.p === '')) {
      toast.error('به نظر می رسد به برخی از پرسش های بالا پاسخ نداده اید. لطفا ابتدا پرسش نامه جاری را تکمیل کنید.', {
        transition: Flip
      });
    } else {
      navigate('/Q2')
    }
  }

  if (selector.IQTestPassed === false) {
    return <Navigate to='/E1' />
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
          <span>این پرسشنامه شامل ۲۰ سوال است. شما باید با توجه به شناختی که از خود دارید گزینه ای که در حال حاضر موافق با احوال تان است را انتخاب کنید.</span>
          <span>لطفا به تمام پرسش ها پاسخ دهید و در نهایت روی دکمه انتقال به پرسشنامه ۲ کلیک کنید.</span>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {SHTestArray.map(item => (
          <div className={styles.itemContainer}>
            <div className={styles.itemHeaderContainer}>
              <span className={styles.itemNumber}>{item.num}</span>
              <span>{item.question}</span>
            </div>
            <div className={styles.radiosContainer}>
              {item.options.map((i, index) => {
                return (
                  <label className={styles.radio}>
                    <input type="radio" name={item.name} value={i.p} checked={selector.SH.options[item.name].o === index + 1 ? true : false} onChange={(e) => handleChange(e, i.o)} />
                    <span>{i.s}.</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.linksContainer}>
        <div onClick={handleTransfer} className={styles.nextLink}>انتقال به پرسشنامه ۲</div>
      </div>
    </div>
  )
}
