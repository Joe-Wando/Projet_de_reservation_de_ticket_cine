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
    <div className="min-h-screen flex" style={{ backgroundColor: '#050B18' }}>

      {/* Gauche — Illustration */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 text-center"
        style={{ background: 'linear-gradient(135deg, #0D1526, #7B61FF20)' }}>
        <h2 className="text-3xl font-bold text-white mb-4">
          Rejoignez SENECINE
        </h2>
        <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Créez votre compte et réservez vos billets en quelques secondes.
        </p>

        <div className="mt-10 flex gap-4">
          <div className="backdrop-blur rounded-xl p-4 text-left w-36"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #1A2940' }}>
            <p className="text-white font-semibold text-sm">Films africains</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>et internationaux</p>
          </div>
          <div className="backdrop-blur rounded-xl p-4 text-left w-36"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #1A2940' }}>
            <p className="text-white font-semibold text-sm">Confirmation</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>par email</p>
          </div>
        </div>
      </div>

      {/* Droite — Formulaire */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-16">

        <Link to="/" className="text-2xl font-extrabold mb-10" style={{ color: '#00D4FF' }}>
          SENECINE
        </Link>

        <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Bienvenue !</p>
        <h1 className="text-4xl font-bold text-white mb-8">Inscription</h1>

        {erreur && (
          <div className="text-sm px-4 py-3 rounded-xl mb-6 border"
            style={{ backgroundColor: '#FF4D4D10', borderColor: '#FF4D4D30', color: '#FF4D4D' }}>
            {erreur}
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Prénom</label>
            <input type="text" placeholder="Moussa"
              value={prenom} onChange={e => setPrenom(e.target.value)}
              className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
              style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }} />
          </div>
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Nom</label>
            <input type="text" placeholder="Diallo"
              value={nom} onChange={e => setNom(e.target.value)}
              className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
              style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }} />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Email</label>
          <input type="email" placeholder="votre@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }} />
        </div>

        <div className="mb-8">
          <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Mot de passe</label>
          <input type="password" placeholder="••••••••"
            value={motDePasse} onChange={e => setMotDePasse(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }} />
        </div>

        <button onClick={inscrire} disabled={chargement}
          className="w-full py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
          {chargement ? "Inscription..." : "S'inscrire"}
        </button>

        <p className="text-sm text-center mt-6" style={{ color: '#8899AA' }}>
          Déjà un compte ?{" "}
          <Link to="/connexion" className="font-semibold hover:underline" style={{ color: '#00D4FF' }}>
            Se connecter
          </Link>
        </p>

      </div>

    </div>
  )
}