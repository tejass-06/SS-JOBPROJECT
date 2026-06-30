import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './Components/LandingPage'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import AboutPage from './Pages/AboutPage'
import ServicesPage from './Pages/ServicesPage'
import IndustriesPage from './Components/IndustriesPage'
import BlogPage from './Pages/BlogPage'
import CaseStudiesPage from './Pages/CaseStudiesPage'
import ContactPage from './Pages/ContactPage'
import JobDetailsPage from './Pages/JobDetailsPage'
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ProfilePage from './Pages/ProfilePage'
import EmployerDashboard from './Pages/EmployerDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import SettingsPage from './Pages/SettingsPage'
import SubscriptionPage from './Pages/SubscriptionPage'
import MobilePayPage from './Pages/MobilePayPage'
import ResumeBuilderPage from './Pages/ResumeBuilderPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/services' element={<ServicesPage/>}/>
      <Route path='/industries' element={<IndustriesPage/>}/>
      <Route path='/insights/blogs' element={< BlogPage/>}/>
      <Route path='/insights/case-studies' element={< CaseStudiesPage/>}/>
      <Route path='/contact' element={< ContactPage/>}/>
      <Route path="/job-details/:id" element={<JobDetailsPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/employer/dashboard' element={<EmployerDashboard />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='/pro' element={<SubscriptionPage />} />
      <Route path='/pay' element={<MobilePayPage />} />
      <Route path='/resume-builder' element={<ResumeBuilderPage />} />
    </Routes>
    {/* Hide navbar/footer on /pay mobile page */}
    {window.location.pathname !== '/pay' && <Footer/>}
    </BrowserRouter>
     
    </>
  )
}

export default App
