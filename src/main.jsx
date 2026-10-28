import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './components/pages/HomePage.jsx'
import { ServicePage } from './components/pages/ServicePage.jsx'
import { LoginPage } from './components/pages/LoginPage.jsx'
import { RegisterPage } from './components/pages/RegisterPage.jsx'
import { ContactPage } from './components/pages/ContactPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/iniciar-sesion" element={<LoginPage />} />
    <Route path='/registro' element={<RegisterPage />} />
    <Route path='/contacto' element={<ContactPage />} />
    <Route path="/:nombreCategoria" element={<ServicePage />} />
   </Routes>
   
   </BrowserRouter>

  </StrictMode>,
)
