import { createSlice } from "@reduxjs/toolkit";


const setScore = (state, action) => {
    state[action.payload.section]['options'][action.payload.item] = { o: action.payload.option, p: action.payload.point }
}

const setSchoolName = (state, action) => {
    state.schoolName = action.payload.schoolName
}
const setGrade = (state, action) => {
    state.grade = action.payload.grade
}
const setBirthDay = (state, action) => {
    state.birthday.day = action.payload.birthDay
}
const setBirthMonth = (state, action) => {
    state.birthday.month = action.payload.birthMonth
}
const setBirthYear = (state, action) => {
    state.birthday.year = action.payload.birthYear
}

const setTotals = (state, action) => {
    state.IQ.t = action.payload.iq

    state.SH.t = action.payload.sh
    state.SH.rh = action.payload.rh
    state.SH.eh = action.payload.eh

    state.PF.of = action.payload.of
    state.PF.cf = action.payload.cf
    state.PF.ef = action.payload.ef 
    state.PF.af = action.payload.af
    state.PF.nf = action.payload.nf
}

const setIQTestPassed = (state, action) => {
    state.IQTestPassed = action.payload.passed
}


const initialState = { 
    IQ: {
        t: '',
        options: {
            i1: { o: '', p: '' }, i2: { o: '', p: '' }, i3: { o: '', p: '' }, i4: { o: '', p: '' }, i5: { o: '', p: '' }, i6: { o: '', p: '' }, i7: { o: '', p: '' }, i8: { o: '', p: '' }, i9: { o: '', p: '' }, i10: { o: '', p: '' },
            i11: { o: '', p: '' }, i12: { o: '', p: '' }, i13: { o: '', p: '' }, i14: { o: '', p: '' }, i15: { o: '', p: '' }, i16: { o: '', p: '' }, i17: { o: '', p: '' }, i18: { o: '', p: '' }, i19: { o: '', p: '' }, i20: { o: '', p: '' },
            i21: { o: '', p: '' }, i22: { o: '', p: '' }, i23: { o: '', p: '' }, i24: { o: '', p: '' }, i25: { o: '', p: '' }, i26: { o: '', p: '' }, i27: { o: '', p: '' }, i28: { o: '', p: '' }, i29: { o: '', p: '' }, i30: { o: '', p: '' },
            i31: { o: '', p: '' }, i32: { o: '', p: '' }, i33: { o: '', p: '' }, i34: { o: '', p: '' }, i35: { o: '', p: '' }, i36: { o: '', p: '' }, i37: { o: '', p: '' }, i38: { o: '', p: '' }, i39: { o: '', p: '' }, i40: { o: '', p: '' },
            i41: { o: '', p: '' }, i42: { o: '', p: '' }, i43: { o: '', p: '' }, i44: { o: '', p: '' }, i45: { o: '', p: '' }, i46: { o: '', p: '' }, i47: { o: '', p: '' }, i48: { o: '', p: '' }, i49: { o: '', p: '' }, i50: { o: '', p: '' },
            i51: { o: '', p: '' }, i52: { o: '', p: '' }, i53: { o: '', p: '' }, i54: { o: '', p: '' }, i55: { o: '', p: '' }, i56: { o: '', p: '' }, i57: { o: '', p: '' }, i58: { o: '', p: '' }, i59: { o: '', p: '' }, i60: { o: '', p: '' },
        }
    },
    IQTestPassed:false,
    SH: {
        t: '',
        rh: '',
        eh: '',
        options: {
            i1: { o: '', p: '' }, i2: { o: '', p: '' }, i3: { o: '', p: '' }, i4: { o: '', p: '' }, i5: { o: '', p: '' }, i6: { o: '', p: '' }, i7: { o: '', p: '' }, i8: { o: '', p: '' }, i9: { o: '', p: '' }, i10: { o: '', p: '' },
            i11: { o: '', p: '' }, i12: { o: '', p: '' }, i13: { o: '', p: '' }, i14: { o: '', p: '' }, i15: { o: '', p: '' }, i16: { o: '', p: '' }, i17: { o: '', p: '' }, i18: { o: '', p: '' }, i19: { o: '', p: '' }, i20: { o: '', p: '' },
        }
    },
    PF: {
        of: '',
        cf: '',
        ef: '',
        af: '',
        nf: '',
        options: {
            i1: { o: '', p: '' }, i2: { o: '', p: '' }, i3: { o: '', p: '' }, i4: { o: '', p: '' }, i5: { o: '', p: '' }, i6: { o: '', p: '' }, i7: { o: '', p: '' }, i8: { o: '', p: '' }, i9: { o: '', p: '' }, i10: { o: '', p: '' },
            i11: { o: '', p: '' }, i12: { o: '', p: '' }, i13: { o: '', p: '' }, i14: { o: '', p: '' }, i15: { o: '', p: '' }, i16: { o: '', p: '' }, i17: { o: '', p: '' }, i18: { o: '', p: '' }, i19: { o: '', p: '' }, i20: { o: '', p: '' },
            i21: { o: '', p: '' }, i22: { o: '', p: '' }, i23: { o: '', p: '' }, i24: { o: '', p: '' }, i25: { o: '', p: '' }, i26: { o: '', p: '' }, i27: { o: '', p: '' }, i28: { o: '', p: '' }, i29: { o: '', p: '' }, i30: { o: '', p: '' },
            i31: { o: '', p: '' }, i32: { o: '', p: '' }, i33: { o: '', p: '' }, i34: { o: '', p: '' }, i35: { o: '', p: '' }, i36: { o: '', p: '' }, i37: { o: '', p: '' }, i38: { o: '', p: '' }, i39: { o: '', p: '' }, i40: { o: '', p: '' },
            i41: { o: '', p: '' }, i42: { o: '', p: '' }, i43: { o: '', p: '' }, i44: { o: '', p: '' }, i45: { o: '', p: '' }, i46: { o: '', p: '' }, i47: { o: '', p: '' }, i48: { o: '', p: '' }, i49: { o: '', p: '' }, i50: { o: '', p: '' },
            i51: { o: '', p: '' }, i52: { o: '', p: '' }, i53: { o: '', p: '' }, i54: { o: '', p: '' }, i55: { o: '', p: '' }, i56: { o: '', p: '' }, i57: { o: '', p: '' }, i58: { o: '', p: '' }, i59: { o: '', p: '' }, i60: { o: '', p: '' },
        }
    },
    schoolName: '',
    grade: '',
    birthday: {
        day: '',
        month: '',
        year: ''
    }
}

const websiteSlice = createSlice({
  name: "websiteSlice",
  initialState,
  reducers: {
    setUser,
  },
});

export const { setUser: setUserAction } = websiteSlice.actions;

        setSchoolName,
        setGrade,
        setBirthDay,
        setBirthMonth,
        setBirthYear,

        setTotals
    }
})

export const {
    setScore: setScoreAction,

    setIQTestPassed: setIQTestPassedAction,

    setSchoolName: setSchoolNameAction,
    setGrade: setGradeAction,
    setBirthDay: setBirthDayAction,
    setBirthMonth: setBirthMonthAction,
    setBirthYear: setBirthYearAction,

    setTotals: setTotalsAction
} = websiteSlice.actions

export default websiteSlice.reducer


