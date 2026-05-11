import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Section from './components/Section'
import About from './components/About'
import Rules from './components/Rules'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import './App.css'

function MainSite() {
  return (
    <div className="app">
      <Header name="Null SMP" />
      <Section />
      <About />
      <Rules />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}