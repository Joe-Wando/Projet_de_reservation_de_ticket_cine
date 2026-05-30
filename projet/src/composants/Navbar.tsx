import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { LogoPetit } from './Logo'



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
      style={{ backgroundColor: '#111111', borderBottom: '1px solid #222222' }}>

<Link to="/">
  <LogoPetit />
</Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-sm transition hover:text-white"
          style={{ color: '#888888' }}>
          Accueil
        </Link>
        <Link to="/films" className="text-sm transition hover:text-white"
          style={{ color: '#888888' }}>
          Films
        </Link>

        {connecte ? (
          <>
            <Link to="/dashboard" className="text-sm transition hover:text-white"
              style={{ color: '#888888' }}>
              Mon espace
            </Link>
            <button onClick={deconnecter}
              className="text-sm px-5 py-2 rounded font-semibold transition"
              style={{ backgroundColor: '#00A651', color: '#0A0A0A' }}>
              Deconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/connexion" className="text-sm transition hover:text-white"
              style={{ color: '#888888' }}>
              Connexion
            </Link>
            <Link to="/inscription"
              className="text-sm px-5 py-2 rounded font-semibold transition"
              style={{ backgroundColor: '#00A651', color: '#0A0A0A' }}>
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}