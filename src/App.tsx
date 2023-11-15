
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Fbb from "./pages/Fbb";
import NoPage from "./pages/NoPage";
import { useState } from "react";

export default function App() {
  
  const authUrl = 'https://localhost:3000/start';
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState('');

  const getAuth = () => {
    console.log("hit button")
    axios.get(authUrl).then((res: any) => {
      const callbackUrl = res.request.responseURL;
      console.log(callbackUrl);
      window.open(callbackUrl);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout 
            getAuth={getAuth}
            authToken={authToken}
          />}
        >
          <Route index element={<Home />} />
          <Route path="auth" element={
            <Auth 
              setAuthToken={setAuthToken}
              setRefreshToken={setRefreshToken}
              />} 
          />
          <Route path="fbb" element={
            <Fbb 
              authToken={authToken} 
              refreshToken={refreshToken}
            />} 
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}