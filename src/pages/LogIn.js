import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./LogIn.module.css";
import axiosInstance from "../_axios";
import { setUserAction } from "../redux/slices/websiteSlice";
import { validateEmail } from "../helpers/validations";

export default function InitialData() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.websiteSlice);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    /* validation start */
    if (!validateEmail(email)) {
      setEmailError(true);

      setLoader(false);
      return;
    } else {
      setEmailError(false);
    }
    /* validation end */
    try {
      const res = await axiosInstance({
        url: "/api/assessment/log-in",
        method: "POST",
        data: {
          email,
        },
      });
      if (res.status === 200) {
        dispatch(setUserAction(res.data));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
    setLoader(false);
  };

  return (
    <div className={styles.container}>
      <ToastContainer rtl theme="dark" transition={Flip} />

      <div className={styles.innerContainer}>
        <span className={styles.description}>
          لطفا ایمیل خود را وارد کرده و در نهایت روی دکمه مرحله بعد کلیک کنید.
        </span>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldContainer}>
              <label htmlFor="email">ایمیل</label>
              <input
                type="text"
                name="email"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {emailError && (
                <span className={styles.errorMessage}>ایمیل معتبر نیست</span>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {!loader && <input type="submit" value="مرحله بعد" />}
            {loader && <div className={styles.loader}></div>}
          </div>
        </form>
      </div>
    </div>
  );
}
