import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function Navbar() {
  const [connecte, setConnecte] = useState(false)
  const navigate = useNavigate()

  useEffect(function() {
    const desabonner = auth.onAuthStateChanged(function(user) {
      setConnecte(!!user)
    })
    return desabonner
  }, [])

  async function deconnecter() {
    await signOut(auth)
    navigate('/')
  }

  return (
    <nav className="bg-black border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-wider">
        SENECINE
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-sm text-gray-300 hover:text-white transition">Accueil</Link>
        <Link to="/Films" className="text-sm text-gray-300 hover:text-white transition">Films</Link>

        {connecte ? (
          <>
            <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition">Mon espace</Link>
            <button onClick={deconnecter}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded font-semibold transition">
              Deconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/connexion" className="text-sm text-gray-300 hover:text-white transition">Connexion</Link>
            <Link to="/inscription"
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded font-semibold transition">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}