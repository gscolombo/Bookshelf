import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import "./styles/reset.css";
import "./styles/global.css";
import Shelf from "./components/Shelf/Shelf.js";

export default function App() {
  const [userName, setUserName] = useState("");
  const [credentials, setCredentials] = useState({});
  const [storage, setStorage] = useLocalStorage();

  useEffect(() => {
    const jwt = storage.getItem("jwt");
    const pkey = storage.getItem("publicKey");

    if (jwt && pkey) {
      setCredentials({ token: jwt, publicKey: pkey });
    }
  }, [setCredentials, storage]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setStorage={setStorage}
                setUserName={setUserName}
                userName={userName}
              />
            }
          />
          <Route
            path={`/:user_name/shelf`}
            element={<Shelf credentials={credentials} userName={userName} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
