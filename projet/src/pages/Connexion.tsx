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
    <div className="min-h-screen bg-gray-950 flex">

      {/* Gauche — Formulaire */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-red-500 mb-10">
          SENECINE 
        </Link>

        <p className="text-gray-400 text-sm mb-1">Bon retour parmi nous !</p>
        <h1 className="text-4xl font-bold text-white mb-8">Connexion</h1>

        {erreur && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {erreur}
          </div>
        )}

        {/* Champ email */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Email</label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Champ mot de passe */}
        <div className="mb-2">
          <label className="text-gray-400 text-sm mb-1 block">Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Mot de passe oublié */}
        <div className="text-right mb-6">
          <Link to="/reinitialisation" className="text-red-400 text-sm hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton */}
        <button
          onClick={connecter}
          disabled={chargement}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50">
          {chargement ? "Connexion..." : "Se connecter"}
        </button>

        {/* Lien inscription */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="text-red-400 hover:underline font-semibold">
            S'inscrire
          </Link>
        </p>

      </div>

      {/* Droite — Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-red-600 to-gray-900 flex-col items-center justify-center p-12 text-center">
        <div className="text-8xl mb-6"></div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Le cinéma sénégalais à portée de clic
        </h2>
        <p className="text-white/60 text-lg">
          Réservez vos places pour les meilleurs films africains et internationaux.
        </p>

        {/* Cartes décoratives */}
        <div className="mt-10 flex gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left w-36">
            <p className="text-2xl mb-1"></p>
            <p className="text-white font-semibold text-sm">30+ Films</p>
            <p className="text-white/50 text-xs">disponibles</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left w-36">
            <p className="text-2xl mb-1"></p>
            <p className="text-white font-semibold text-sm">Réservation</p>
            <p className="text-white/50 text-xs">en 5 minutes</p>
          </div>
        </div>
      </div>

    </div>
  )
}