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
    <nav className="px-8 py-4 flex items-center justify-between"
      style={{ backgroundColor: '#0D1526', borderBottom: '1px solid #1A2940' }}>

      <Link to="/" className="text-2xl font-extrabold tracking-wider"
        style={{ color: '#00D4FF' }}>
        SENECINE
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-sm transition hover:text-white"
          style={{ color: '#8899AA' }}>
          Accueil
        </Link>
        <Link to="/films" className="text-sm transition hover:text-white"
          style={{ color: '#8899AA' }}>
          Films
        </Link>

        {connecte ? (
          <>
            <Link to="/dashboard" className="text-sm transition hover:text-white"
              style={{ color: '#8899AA' }}>
              Mon espace
            </Link>
            <button onClick={deconnecter}
              className="text-sm px-5 py-2 rounded font-semibold transition"
              style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
              Deconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/connexion" className="text-sm transition hover:text-white"
              style={{ color: '#8899AA' }}>
              Connexion
            </Link>
            <Link to="/inscription"
              className="text-sm px-5 py-2 rounded font-semibold transition"
              style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}