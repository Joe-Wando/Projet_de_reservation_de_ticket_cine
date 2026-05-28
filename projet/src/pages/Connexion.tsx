import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Connexion() {
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
const navigate = useNavigate()

async function connecter() {
  await signInWithEmailAndPassword(auth, email, motDePasse)
 navigate('/dashboard')
}


return (
  <div>
    <h1>Connexion</h1>

    <input
      type="email"
      placeholder="Votre email"
      value={email}
      onChange={function(e) { setEmail(e.target.value) }}
    />

    <input
      type="password"
      placeholder="Votre mot de passe"
      value={motDePasse}
      onChange={function(e) { setMotDePasse(e.target.value) }}
    />

    <button onClick={connecter}>
      Se connecter
    </button>
  </div>
)
}