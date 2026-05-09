import Header from './components/Header'
import Section from './components/Section'
import About from './components/About'
import Rules from './components/Rules'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header name="Null SMP" />
      <Section />
      <About />
      <Rules />
      <Footer />
    </div>
  )
}