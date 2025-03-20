import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Test from './Test.jsx';
import Interval from './Interval.jsx';// Ensure the component is named Test
import New from './New.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <New Bookname='Zainab' Aurthorname={90}/>
    {/* <Test name='zainu' age={90} /> */}
    <Interval/>
  </StrictMode>
);
