import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <h1>Connexion</h1>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}

      <input type="email" placeholder="Votre email"
        value={email} onChange={e => setEmail(e.target.value)} />

      <input type="password" placeholder="Votre mot de passe"
        value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />

      <button onClick={connecter} disabled={chargement}>
        {chargement ? "Connexion..." : "Se connecter"}
      </button>
    </div>
  )
}