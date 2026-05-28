import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Section from './components/Section'
import About from './components/About'
import Rules from './components/Rules'
import Updates from './components/Updates'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminRoute from './components/admin/AdminRoute'
import './App.css'

function MainSite() {
  return (
    <div className="app">
      <Header name="Null SMP" />
      <Section />
      <About />
      <Rules />
      <Updates />
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
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}