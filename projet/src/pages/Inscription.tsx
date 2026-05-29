import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Inscription() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargement, setChargement] = useState(false)
  const navigate = useNavigate()

  async function inscrire() {
    setErreur("")
    setChargement(true)
    try {
      const resultat = await createUserWithEmailAndPassword(auth, email, motDePasse)
      await updateProfile(resultat.user, {
        displayName: prenom + " " + nom
      })
      navigate('/dashboard')
    } catch (e: any) {
      if (e.code === "auth/email-already-in-use") {
        setErreur("Cet email est déjà utilisé.")
      } else if (e.code === "auth/weak-password") {
        setErreur("Le mot de passe doit faire au moins 6 caractères.")
      } else {
        setErreur("Une erreur est survenue. Réessayez.")
      }
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* Gauche — Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-red-900 flex-col items-center justify-center p-12 text-center">
        <div className="text-8xl mb-6">🎟️</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Rejoignez SENECINE
        </h2>
        <p className="text-white/60 text-lg">
          Créez votre compte et réservez vos billets en quelques secondes.
        </p>

        <div className="mt-10 flex gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left w-36">
            <p className="text-2xl mb-1"></p>
            <p className="text-white font-semibold text-sm">Films africains</p>
            <p className="text-white/50 text-xs">et internationaux</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left w-36">
            <p className="text-2xl mb-1"></p>
            <p className="text-white font-semibold text-sm">Confirmation</p>
            <p className="text-white/50 text-xs">par email</p>
          </div>
        </div>
      </div>

      {/* Droite — Formulaire */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-16">

        <Link to="/" className="text-2xl font-extrabold text-red-500 mb-10">
          SENECINE 
        </Link>

        <p className="text-gray-400 text-sm mb-1">Bienvenue !</p>
        <h1 className="text-4xl font-bold text-white mb-8">Inscription</h1>

        {erreur && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {erreur}
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-1 block">Prénom</label>
            <input type="text" placeholder="Moussa"
              value={prenom} onChange={e => setPrenom(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition" />
          </div>
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-1 block">Nom</label>
            <input type="text" placeholder="Diallo"
              value={nom} onChange={e => setNom(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Email</label>
          <input type="email" placeholder="votre@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition" />
        </div>

        <div className="mb-8">
          <label className="text-gray-400 text-sm mb-1 block">Mot de passe</label>
          <input type="password" placeholder="••••••••"
            value={motDePasse} onChange={e => setMotDePasse(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition" />
        </div>

        <button onClick={inscrire} disabled={chargement}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50">
          {chargement ? "Inscription..." : "S'inscrire"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Déjà un compte ?{" "}
          <Link to="/connexion" className="text-red-400 hover:underline font-semibold">
            Se connecter
          </Link>
        </p>

      </div>

    </div>
  )
}