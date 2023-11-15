
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Fbb from "./pages/Fbb";
import NoPage from "./pages/NoPage";

export default function App() {
  
  const authUrl = 'https://localhost:3000/start';

  const getAuth = () => {
    console.log("hit button")
    axios.get(authUrl)
    .catch(error => {
      console.error('Error:', error);
    });
    
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout getAuth={getAuth}/>}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="fbb" element={<Fbb />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
