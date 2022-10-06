import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import './styles/reset.css';
import './styles/global.css';
import Shelf from './components/Shelf/Shelf.js';

export default function App() {
  const [userName, setUserName] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home setUserName={setUserName} userName={userName} />}
          />
          <Route
            path={`/:user_name/shelf`}
            element={<Shelf userName={userName} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
