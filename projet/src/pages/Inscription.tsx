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
      navigate('/')
    } catch (e: any) {
      if (e.code === "auth/email-already-in-use") {
        setErreur("Cet email est deja utilise.")
      } else if (e.code === "auth/weak-password") {
        setErreur("Le mot de passe doit faire au moins 6 caracteres.")
      } else {
        setErreur("Une erreur est survenue. Reessayez.")
      }
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#050B18" }}>

      <div className="w-full max-w-md rounded-2xl p-10 shadow-2xl"
        style={{ backgroundColor: "#0D1526", border: "1px solid #1A2940" }}>

        <p className="text-2xl font-extrabold tracking-wider mb-8"
          style={{ color: "#00D4FF" }}>
          SENECINE
        </p>

        <p className="text-sm mb-1" style={{ color: "#8899AA" }}>Bienvenue !</p>
        <h1 className="text-3xl font-bold text-white mb-8">Inscription</h1>

        {erreur && (
          <div className="px-4 py-3 rounded-xl mb-6 text-sm"
            style={{ backgroundColor: "#FF000010", border: "1px solid #FF000030", color: "#FF6B6B" }}>
            {erreur}
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Prenom</label>
            <input type="text" placeholder="Moussa"
              value={prenom} onChange={e => setPrenom(e.target.value)}
              className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
              style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
          </div>
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Nom</label>
            <input type="text" placeholder="Diallo"
              value={nom} onChange={e => setNom(e.target.value)}
              className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
              style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Email</label>
          <input type="email" placeholder="votre@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
        </div>

        <div className="mb-8">
          <label className="text-sm mb-1 block" style={{ color: "#8899AA" }}>Mot de passe</label>
          <input type="password" placeholder="••••••••"
            value={motDePasse} onChange={e => setMotDePasse(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#050B18", border: "1px solid #1A2940" }} />
        </div>

        <button onClick={inscrire} disabled={chargement}
          className="w-full py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          style={{ backgroundColor: "#00D4FF", color: "#050B18" }}>
          {chargement ? "Inscription..." : "S'inscrire"}
        </button>

        <p className="text-sm text-center mt-6" style={{ color: "#8899AA" }}>
          Deja un compte ?{" "}
          <Link to="/connexion"
            className="font-semibold hover:underline"
            style={{ color: "#00D4FF" }}>
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  )
}