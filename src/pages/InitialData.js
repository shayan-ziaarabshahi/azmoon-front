import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "jalaali-react-date-picker";
import "jalaali-react-date-picker/lib/styles/index.css";
import PN from "persian-number";
import moment from "moment-jalaali"; 

import styles from "./InitialData.module.css";
import CustomSelect from "./../components/CustomSelect";
import genders from "../data/genders";
import schoolTypes from "../data/schoolTypes";
import schoolGrades from "../data/schoolGrades";
import axiosInstance from "../_axios";
import { setUserAction } from "../redux/slices/websiteSlice";

export default function InitialData() {
  const [loader, setLoader] = useState(false);

  const [gender, setGender] = useState();
  const [schoolType, setSchoolType] = useState();
  const [schoolGrade, setSchoolGrade] = useState();
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.websiteSlice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (schoolType && schoolGrade && birthday && gender) {
      try {
        const res = await axiosInstance({
          url: "/api/assessment/initial-data",
          method: "PUT",
          data: {
            _id : selector.user._id,
            schoolType: schoolType.id,
            schoolGrade: schoolGrade.id,
            birthday: birthday._d,
            gender: gender.id,
          },
        });
        if (res.status === 200) {
          dispatch(setUserAction(res.data));
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    } else {
        toast.error('لطفا ابتدا تمام قسمت ها را پر کنید.')
    }
    setLoader(false);
  };


  return (
    <div className={styles.container}>
      <ToastContainer rtl theme="dark" transition={Flip} />

      <div className={styles.innerContainer}>
        <span className={styles.description}>
          لطفا موارد زیر را تکمیل کرده و در نهایت روی دکمه مرحله بعد کلیک کنید.
        </span>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldContainer}>
              <label htmlFor="grade">تاریخ تولد</label>
              <div className={styles.datPickerContainer}>
                <div
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={styles.datePickerField}
                >
                  {birthday?._d && (
                    <div className={styles.datePickerShowContainer}>
                      {PN.convertEnToPe(
                        moment(birthday._d).format("jYYYY/jM/jD")
                      )}{" "}
                    </div>
                  )}
                  <div className={styles.calenderIcon}>
                    <i className="bi bi-calendar"></i>
                  </div>
                </div>
                <div className={styles.datePickerWrapper}>
                  {showDatePicker && (
                    <DatePicker
                      onChange={(data) => {
                        setBirthday(data);
                        setShowDatePicker(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.fieldContainer}>
              <label htmlFor="schoolName">جنسیت</label>
              <CustomSelect
                listItems={genders}
                currentValue={gender}
                setCurrentValue={setGender}
              />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="schoolName">نوع مدرسه</label>
              <CustomSelect
                listItems={schoolTypes}
                currentValue={schoolType}
                setCurrentValue={setSchoolType}
              />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="grade">مقطع تحصیلی</label>
              <CustomSelect
                listItems={schoolGrades}
                currentValue={schoolGrade}
                setCurrentValue={setSchoolGrade}
              />
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
