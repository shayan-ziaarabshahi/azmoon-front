import React, { useEffect, useState } from "react";
import styles from "./SH.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setScoreAction, setUserAction } from "./../redux/slices/websiteSlice";
import { SHTestArray } from "../data/SH";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../_axios";

export default function SH() {
  const [loader, setLoader] = useState(false)
  const [SHItems, setSHItems] = useState();

  useEffect(() => {
    let newSHItems = {};
    SHTestArray.forEach(
      (item) => (newSHItems[item.name] = { selected: "", point: "" })
    );
    setSHItems(newSHItems);
  }, []);

  const handleChange = (e, item, i) => {
    setSHItems((prev) => ({
      ...prev,
      [item.name]: { selected: i.number, point: e.target.value },
    }));
  };

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.websiteSlice);

  const navigate = useNavigate();

  const handleTransfer = async () => {

    setLoader(true)
    if (Object.values(SHItems).some((i) => i.point === "")) {
      console.log('hey')
      toast.error(
        "به نظر می رسد به برخی از پرسش های بالا پاسخ نداده اید. لطفا ابتدا پرسش نامه جاری را تکمیل کنید.",
        {
          transition: Flip,
        } 
      );

      setLoader(false)
      return
    }

    try {
      let total = 0;
      let religiousHealth = 0;
      let existentialHealth = 0;
      let i;
      for (i in SHItems) { 
        if (SHItems[i].point) {
          total += Number(SHItems[i].point);
          if (i.substr(1) % 2 === 0) {
            religiousHealth += Number(SHItems[i].point);
          }
          if (i.substr(1) % 2 === 1) {
            existentialHealth += Number(SHItems[i].point);
          }
        }
      }

      const res = await axiosInstance({
        method: "PUT",
        url: "/api/assessment/sh-test",
        data: {
          _id: selector.user._id,
          SH: {
            total,
            religiousHealth,
            existentialHealth,
            options: SHItems,
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

    setLoader(false)
  };


  return (
    <div className={styles.container}>
      <ToastContainer
        rtl
        theme="dark"
        position="bottom-right"
        transition={Flip}
      />
      <div className={styles.header}>
        <div className={styles.descriptionContainer}>
          <span>
            این پرسشنامه شامل ۲۰ سوال است. شما باید با توجه به شناختی که از خود
            دارید گزینه ای که در حال حاضر موافق با احوال تان است را انتخاب کنید.
          </span>
          <span>
            لطفا به تمام پرسش ها پاسخ دهید و در نهایت روی دکمه انتقال به
            پرسشنامه ۲ کلیک کنید.
          </span>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {SHTestArray.map((item) => (
          <div className={styles.itemContainer}>
            <div className={styles.itemNumber}>{item.symbol}</div>
            <div className={styles.itemHeaderContainer}>
              <span>{item.question}</span>
            </div>
            <div className={styles.radiosContainer}>
              {SHItems &&
                item.options.map((i, index) => {
                  return (
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={item.name}
                        value={i.point}
                        checked={
                          SHItems[item.name].selected === index + 1
                            ? true
                            : false
                        }
                        onChange={(e) => handleChange(e, item, i)}
                      />
                      <span>{i.title}.</span>
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.linksContainer}>
        <div onClick={handleTransfer} className={styles.nextLink}>
          انتقال به پرسشنامه ۲
        </div>
      </div>
    </div>
  );
}
