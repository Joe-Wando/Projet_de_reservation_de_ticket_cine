import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import Navbar from './composants/Navbar'
import Acceuil from './pages/Acceuil'
import Films from './pages/Films'
import Reservation from './pages/Reservation'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import ReinitialisationMotDePasse from './pages/ReinitialisationMotDePasse'
import RouteProtegee from './composants/RouteProtegee'
import Admin from './pages/Admin'

export default function App() {
  const [connecte, setConnecte] = useState<boolean | null>(null)

  useEffect(function() {
    const desabonner = auth.onAuthStateChanged(function(user) {
      setConnecte(!!user)
    })
    return desabonner
  }, [])

  // On attend la réponse de Firebase avant d'afficher quoi que ce soit
  if (connecte === null) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#050B18" }}>
        <p style={{ color: "#8899AA" }}>Chargement...</p>
      </div>
    )
  }

  return (
    <>
      {/* Navbar uniquement si connecté et pas sur la landing */}
      {connecte && <Navbar />}

      <Routes>
        {/* Pages publiques — auth seulement */}
        <Route path="/connexion" element={
          connecte ? <Navigate to="/" /> : <Connexion />
        } />
        <Route path="/inscription" element={
          connecte ? <Navigate to="/" /> : <Inscription />
        } />
        <Route path="/reinitialisation" element={
          connecte ? <Navigate to="/" /> : <ReinitialisationMotDePasse />
        } />

        {/* Pages protégées */}
        <Route path="/" element={
          connecte ? <Acceuil /> : <Navigate to="/connexion" />
        } />
        <Route path="/Films" element={
          <RouteProtegee><Films /></RouteProtegee>
        } />
        <Route path="/reservation/:id" element={
          <RouteProtegee><Reservation /></RouteProtegee>
        } />
        <Route path="/dashboard" element={
          <RouteProtegee><Dashboard /></RouteProtegee>
        } />
{/* Route Admin */}
<Route path="/admin" element={
  <RouteProtegee><Admin /></RouteProtegee>
} />

        {/* Toute autre URL redirige vers connexion */}
        <Route path="*" element={<Navigate to="/connexion" />} />
      </Routes>
    </>
  )
}