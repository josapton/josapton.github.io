import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  )
}
