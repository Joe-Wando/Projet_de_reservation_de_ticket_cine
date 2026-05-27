import { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function ReinitialisationMotDePasse() {
  const [email, setEmail] = useState("")
  const [envoye, setEnvoye] = useState(false)

  async function reinitialiser() {
    await sendPasswordResetEmail(auth, email)
    setEnvoye(true)
  }

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>

      {envoye ? (
        <p>Un email de réinitialisation a été envoyé à votre adresse email !</p>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={function(e) { setEmail(e.target.value) }}
          />
          <button onClick={reinitialiser}>
            Envoyer le lien
          </button>
        </div>
      )}
    </div>
  )
}