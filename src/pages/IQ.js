import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./IQ.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IQTestArray } from "../data/IQ";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertEnToPe } from "persian-number";
import axiosInstance from "../_axios";
import { setUserAction } from "../redux/slices/websiteSlice";

export default function IQ() {
  const [loader, setLoader] = useState(false);
  const [timeFinished, setTimeFinished] = useState(false);

  const [IQItems, setIQItems] = useState();
  const [minutes, _setMinutes] = useState(45);
  const [seconds, _setSeconds] = useState(59);

  const selector = useSelector((state) => state.websiteSlice);

  const dispatch = useDispatch();

  const intervalRef_S = useRef();
  const intervalRef_M = useRef();
  const minutesRef = useRef(minutes);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    let newIQItems = {};
    IQTestArray.forEach(
      (item) => (newIQItems[item.name] = { selected: "", point: "" })
    );
    setIQItems(newIQItems);
  }, []);

  const handleChange = (e, item, i) => {
    setIQItems((prev) => ({
      ...prev,
      [item.name]: { selected: i.number, point: e.target.value },
    }));
  };

  function setMinutes(x) {
    minutesRef.current = x;
    _setMinutes(x);
  }

  function setSeconds(y) {
    secondsRef.current = y;
    _setSeconds(y);
  }

  const submitForm = useCallback(async () => {
    setLoader(true);
    let total = 0;
    let i;
    for (i in IQItems) {
      if (IQItems[i].point) {
        total += Number(IQItems[i].point);
      }
    }
    try {
      const res = await axiosInstance({
        method: "PUT",
        url: "/api/assessment/iq-test",
        data: {
          _id: selector.user._id,
          IQ: {
            total,
            options: IQItems,
          },
        },
      });
      if (res.status === 200) {
        dispatch(setUserAction(res.data));
      }
    } catch (err) {
      console(err);
      toast.error(toast.error(err.response?.data?.message || err.message));
    }
    setLoader(false);
  }, [IQItems, dispatch, selector.user._id]);

  useEffect(() => {
    if (timeFinished) {
      submitForm();
    }
  }, [timeFinished, submitForm]);

  const countDownMinutes = () => {
    if (minutesRef.current === 0) {
      clearInterval(intervalRef_M.current);
    } else {
      console.log(minutesRef.current);
      setMinutes(minutesRef.current - 1);
    }
  };
  const countDownSeconds = () => {
    if (minutesRef.current === 0 && secondsRef.current === 8) {
      toast(
        "در حال انتقال به صفحه پرسشنامه 1. لطفا از بازگشت یا ریلود صفحه خودداری کنید.",
        {
          transition: Flip,
        }
      );
    }
    if (minutesRef.current === 0 && secondsRef.current === 1) {
      clearInterval(intervalRef_S.current);
      setTimeFinished(true);
    } else {
      setSeconds(secondsRef.current === 0 ? 59 : secondsRef.current - 1);
    }
  };

  useEffect(() => {
    intervalRef_M.current = setInterval(() => countDownMinutes(), 60000);
    intervalRef_S.current = setInterval(() => countDownSeconds(), 1000);
    return () => {
      clearInterval(intervalRef_M.current);
      clearInterval(intervalRef_S.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer rtl position="bottom-right" transition={Flip} />
      <div className={styles.header}>
        <div className={styles.descriptionContainer}>
          <span>
            این آزمون شامل ۶۰ سوال است. در هر سوال باید با توجه به الگوی داده
            شده قطعه گم شده را حدس بزنید.
          </span>
          <span>
            بعد از اتمام زمان پاسخگویی به این آزمون به طور خودکار وارد صفحه
            پرسشنامه ۱ خواهید شد.
          </span>
        </div>
      </div>
      <div className={styles.timerContainer}>
        {!loader &&
          convertEnToPe(String(secondsRef.current).padStart(2, 0)) +
            " : " +
            convertEnToPe(String(minutesRef.current).padStart(2, 0))}
        {loader && <div className={styles.loader}></div>}
      </div>
      <div className={styles.itemsContainer}>
        {IQTestArray.map((item) => (
          <div className={styles.itemContainer}>
            <span className={styles.itemNumber}>{item.symbol}</span>
            <div className={styles.itemImageWrapper}>
              <img
                src={item.image}
                alt="raven item"
                className={styles.itemImage}
              />
            </div>
            <div className={styles.radiosContainer}>
              {IQItems &&
                item.options.map((i, index) => {
                  return (
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={item.name}
                        value={i.point}
                        checked={
                          IQItems[item.name].selected === index + 1
                            ? true
                            : false
                        }
                        onChange={(e) => handleChange(e, item, i)}
                      />
                      <span>{i.symbol}.</span>
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
