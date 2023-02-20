import React, { useEffect, useState } from "react";
import styles from "./PF.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PFTestArray } from "../data/PF";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../_axios";
import { setUserAction } from "../redux/slices/websiteSlice";

export default function PF() {
  const [loader, setLoader] = useState(false)
  const [PFItems, setPFItems] = useState();

  useEffect(() => {
    let newPFItems = {};
    PFTestArray.forEach(
      (item) => (newPFItems[item.name] = { selected: "", point: "" })
    );
    setPFItems(newPFItems);
  }, []);

  const handleChange = (e, item, i) => {
    setPFItems((prev) => ({
      ...prev,
      [item.name]: { selected: i.number, point: e.target.value },
    }));
  };

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.websiteSlice);


  const handleTransfer = async () => {
    setLoader(true)
    if (Object.values(PFItems).some((i) => i.p === "")) {
      toast.error(
        "به نظر می رسد به برخی از پرسش های بالا پاسخ نداده اید. لطفا ابتدا پرسش نامه جاری را تکمیل کنید.",
        {
          transition: Flip,
        }
      );
      setLoader(false)
      return;
    }

    try {
      let total = 0;
      let OFactor = 0;
      let CFactor = 0;
      let EFactor = 0;
      let AFactor = 0;
      let NFactor = 0;

      let i;
      for (i in PFItems) {
        if (PFItems[i].point) {
          total += Number(PFItems[i].point);
          if (i.substr(1) % 5 === 0) {
            CFactor += Number(PFItems[i].point);
          }
          if (i.substr(1) % 5 === 1) {
            NFactor += Number(PFItems[i].point);
          }
          if (i.substr(1) % 5 === 2) {
            EFactor += Number(PFItems[i].point);
          }
          if (i.substr(1) % 5 === 3) {
            OFactor += Number(PFItems[i].point);
          }
          if (i.substr(1) % 5 === 4) {
            AFactor += Number(PFItems[i].point);
          }
        }
      }

      const res = await axiosInstance({
        method: "PUT",
        url: "/api/assessment/pf-test",
        data: {
          _id: selector.user._id,
          PF: {
            total,
            OFactor,
            CFactor,
            EFactor,
            AFactor,
            NFactor,
            options: PFItems,
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
            این پرسشنامه شامل ۶۰ سوال است. شما باید با توجه به شناختی که از خود
            دارید گزینه ای که در حال حاضر موافق با احوال تان است را انتخاب کنید.
          </span>
          <span>
            لطفا به تمام پرسش ها پاسخ دهید و در نهایت روی دکمه انتقال به بخش
            پایانی کلیک کنید.
          </span>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {PFTestArray.map((item) => (
          <div className={styles.itemContainer}>
            <div className={styles.itemNumber}>{item.symbol}</div>
            <div className={styles.itemHeaderContainer}>
              <span>{item.question}</span>
            </div>
            <div className={styles.radiosContainer}>
              {PFItems &&
                item.options.map((i, index) => (
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name={item.name}
                      value={i.point}
                      checked={
                        PFItems[item.name].selected === index + 1 ? true : false
                      }
                      onChange={(e) => handleChange(e, item, i)}
                    />
                    <span>{i.title}.</span>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.linksContainer}>
        {!loader && (
          <div onClick={handleTransfer} className={styles.nextLink}>
            انتقال به بخش پایانی
          </div>
        )}
        {loader && <div className={styles.loader}></div>}
      </div>
    </div>
  );
}
