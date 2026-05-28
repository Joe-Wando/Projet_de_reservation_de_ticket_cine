import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function Navbar() {
  const [connecte, setConnecte] = useState(false)
  const navigate = useNavigate()

  useEffect(function() {
    const desabonner = auth.onAuthStateChanged(function(user) {
      setConnecte(!!user)  //  !! transforme user en true/false
    })
    return desabonner
  }, [])

  async function deconnecter() {
    await signOut(auth)
    navigate('/')
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-red-500">
        SENECINE
      </Link>

      {/* Liens */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-red-400">Accueil</Link>
        <Link to="/Films" className="hover:text-red-400">Films</Link>

        {connecte ? (
          // Connecté
          <>
            <Link to="/dashboard" className="hover:text-red-400">Mon espace</Link>
            <button onClick={deconnecter}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Déconnexion
            </button>
          </>
        ) : (
          //  Non connecté
          <>
            <Link to="/connexion" className="hover:text-red-400">Connexion</Link>
            <Link to="/inscription"
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}