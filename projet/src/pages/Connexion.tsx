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
      navigate('/')
    } catch (e: any) {
      setErreur("Email ou mot de passe incorrect.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#050B18" }}>

      <div className="w-full max-w-md rounded-2xl p-10 shadow-2xl"
        style={{ backgroundColor: "#0D1526", border: "1px solid #1A2940" }}>

        {/* Logo */}
        <p className="text-2xl font-extrabold tracking-wider mb-8"
          style={{ color: "#00D4FF" }}>
          SENECINE
        </p>

        <p className="text-sm mb-1" style={{ color: "#8899AA" }}>Bon retour parmi nous</p>
        <h1 className="text-3xl font-bold text-white mb-8">Connexion</h1>

        {erreur && (
          <div className="px-4 py-3 rounded-xl mb-6 text-sm"
            style={{ backgroundColor: "#FF000010", border: "1px solid #FF000030", color: "#FF6B6B" }}>
            {erreur}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Email</label>
          <input type="email" placeholder="votre@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
        </div>

        <div className="mb-2">
          <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Mot de passe</label>
          <input type="password" placeholder="••••••••"
            value={motDePasse} onChange={e => setMotDePasse(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
        </div>

        <div className="text-right mb-8">
          <Link to="/reinitialisation"
            className="text-sm hover:underline transition"
            style={{ color: "#00D4FF" }}>
            Mot de passe oublie ?
          </Link>
        </div>

        <button onClick={connecter} disabled={chargement}
          className="w-full py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          style={{ backgroundColor: "#00D4FF", color: "#050B18" }}>
          {chargement ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-sm text-center mt-6" style={{ color: "#8899AA" }}>
          Pas encore de compte ?{" "}
          <Link to="/inscription"
            className="font-semibold hover:underline"
            style={{ color: "#00D4FF" }}>
            S'inscrire
          </Link>
        </p>

      </div>
    </div>
  )
}