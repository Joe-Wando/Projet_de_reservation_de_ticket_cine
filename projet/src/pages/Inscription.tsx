import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Inscription() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")

async function inscrire() {
  await createUserWithEmailAndPassword(auth, email, motDePasse)
}
return (
  <div>
    <h1>Inscription</h1>

    <input
      type="text"
      placeholder="Votre nom"
      value={nom}
      onChange={function(e) { setNom(e.target.value) }}
    />

    <input
      type="text"
      placeholder="Votre prénom"
      value={prenom}
      onChange={function(e) { setPrenom(e.target.value) }}
    />

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

    <button onClick={inscrire}>
      S'inscrire
    </button>
  </div>
)
}