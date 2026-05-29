import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Connexion() {
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargement, setChargement] = useState(false)
  const navigate = useNavigate()

  async function connecter() {
    setErreur("")
    setChargement(true)
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse)
      navigate('/dashboard')
    } catch (e: any) {
      setErreur("Email ou mot de passe incorrect.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#050B18' }}>

      {/* Gauche — Formulaire */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold mb-10" style={{ color: '#00D4FF' }}>
          SENECINE 🎬
        </Link>

        <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Bon retour parmi nous !</p>
        <h1 className="text-4xl font-bold text-white mb-8">Connexion</h1>

        {erreur && (
          <div className="text-sm px-4 py-3 rounded-xl mb-6 border"
            style={{ backgroundColor: '#FF4D4D10', borderColor: '#FF4D4D30', color: '#FF4D4D' }}>
            {erreur}
          </div>
        )}

        {/* Champ email */}
        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Email</label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}
          />
        </div>

        {/* Champ mot de passe */}
        <div className="mb-2">
          <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}
          />
        </div>

        {/* Mot de passe oublié */}
        <div className="text-right mb-6">
          <Link to="/reinitialisation" className="text-sm hover:underline" style={{ color: '#00D4FF' }}>
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton */}
        <button
          onClick={connecter}
          disabled={chargement}
          className="w-full text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
          {chargement ? "Connexion..." : "Se connecter"}
        </button>

        {/* Lien inscription */}
        <p className="text-sm text-center mt-6" style={{ color: '#8899AA' }}>
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="font-semibold hover:underline" style={{ color: '#00D4FF' }}>
            S'inscrire
          </Link>
        </p>

      </div>

      {/* Droite — Illustration */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 text-center"
        style={{ background: 'linear-gradient(135deg, #0D1526, #00D4FF20)' }}>
        <div className="text-8xl mb-6">🎬</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Le cinéma sénégalais à portée de clic
        </h2>
        <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Réservez vos places pour les meilleurs films africains et internationaux.
        </p>

        {/* Cartes décoratives */}
        <div className="mt-10 flex gap-4">
          <div className="backdrop-blur rounded-xl p-4 text-left w-36"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #1A2940' }}>
            <p className="text-2xl mb-1">🎥</p>
            <p className="text-white font-semibold text-sm">30+ Films</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>disponibles</p>
          </div>
          <div className="backdrop-blur rounded-xl p-4 text-left w-36"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #1A2940' }}>
            <p className="text-2xl mb-1">⚡</p>
            <p className="text-white font-semibold text-sm">Réservation</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>en 5 minutes</p>
          </div>
        </div>
      </div>

    </div>
  )
}