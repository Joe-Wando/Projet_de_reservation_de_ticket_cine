import { Routes, Route } from 'react-router-dom'
import Navbar from './composants/Navbar'        // nouveau
import Acceuil from './pages/Acceuil'
import Films from './pages/Films'
import Reservation from './pages/Reservation'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import ReinitialisationMotDePasse from './pages/ReinitialisationMotDePasse'
import RouteProtegee from './composants/RouteProtegee'

export default function App() {
  return (
    <>
      <Navbar />   {/* apparaît sur toutes les pages */}

      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/Films" element={<Films />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/reinitialisation" element={<ReinitialisationMotDePasse />} />
        <Route path="/dashboard" element={
          <RouteProtegee>
            <Dashboard />
          </RouteProtegee>
        } />
      </Routes>
    </>
  )
}