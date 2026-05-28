import { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function ReinitialisationMotDePasse() {
  const [email, setEmail] = useState("")
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState("")
  const [chargement, setChargement] = useState(false)

  async function reinitialiser() {
    setErreur("")
    setChargement(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setEnvoye(true)
    } catch (e: any) {
      setErreur("Aucun compte trouvé avec cet email.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}

      {envoye ? (
        <p>Un email de réinitialisation a été envoyé !</p>
      ) : (
        <div>
          <input type="email" placeholder="Votre email"
            value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={reinitialiser} disabled={chargement}>
            {chargement ? "Envoi..." : "Envoyer le lien"}
          </button>
        </div>
      )}
    </div>
  )
}