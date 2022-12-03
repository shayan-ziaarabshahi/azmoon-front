import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IQ from './pages/IQ'
import SH from './pages/SH'
import PF from './pages/PF'
import Submit from './pages/Submit';
import Results from './pages/Results';



function App() {
  
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/E1' element={<IQ/>}/>
        <Route path='/Q1' element={<SH/>}/>
        <Route path='/Q2' element={<PF/>}/>
        <Route path='/submit' element={<Submit/>}/>
        <Route path='/results' element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;