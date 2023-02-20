import styles from './App.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home'
import IQ from './pages/IQ'
import SH from './pages/SH'
import PF from './pages/PF'
import Results from './pages/Results';
import InitialData from './pages/InitialData';
import LogIn from './pages/LogIn';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const websiteSelector = useSelector(state => state.websiteSlice)

  const navigate = useNavigate()

  useEffect(() => {
    if (websiteSelector.user.step === "1") {
      navigate('/initial-data')
    }
    if (websiteSelector.user.step === "2") {
      navigate('/E1')
    }
    if (websiteSelector.user.step === "3") {
      navigate('/Q1')
    }
    if (websiteSelector.user.step === "4") {
      navigate('/Q2')
    }
    if (websiteSelector.user.step === "5") {
      navigate('/results')
    }
  },[websiteSelector.user.step, navigate])
  
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/log-in' element={<LogIn/>}/>
        <Route path='/initial-data' element={<InitialData/>}/>
        <Route path='/E1' element={<IQ/>}/>
        <Route path='/Q1' element={<SH/>}/>
        <Route path='/Q2' element={<PF/>}/>
        <Route path='/results' element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;