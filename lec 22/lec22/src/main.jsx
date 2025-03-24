import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Test from './Test.jsx';
import Interval from './Interval.jsx';// Ensure the component is named Test
import Friend from './Friend.jsx';
import FriendList from './FriendList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FriendList/>
  </StrictMode>
);
