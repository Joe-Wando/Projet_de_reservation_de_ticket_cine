import { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link } from 'react-router-dom'

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
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#050B18' }}>
      <div className="w-full max-w-md rounded-2xl p-10 shadow-xl"
        style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}>

        <Link to="/" className="text-xl font-extrabold block mb-8"
          style={{ color: '#00D4FF' }}>
          SENECINE
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Mot de passe oublié ?</h1>
        <p className="text-sm mb-8" style={{ color: '#8899AA' }}>
          Entrez votre email et on vous envoie un lien de réinitialisation.
        </p>

        {erreur && (
          <div className="text-sm px-4 py-3 rounded-xl mb-6 border"
            style={{ backgroundColor: '#FF4D4D10', borderColor: '#FF4D4D30', color: '#FF4D4D' }}>
            {erreur}
          </div>
        )}

        {envoye ? (
          <div className="px-4 py-4 rounded-xl text-center border"
            style={{ backgroundColor: '#00D4FF10', borderColor: '#00D4FF30', color: '#00D4FF' }}>
            <p className="font-semibold">Email envoyé !</p>
            <p className="text-sm mt-1" style={{ color: '#00D4FF70' }}>
              Vérifiez votre boîte mail.
            </p>
            <Link to="/connexion" className="text-sm mt-4 inline-block hover:underline"
              style={{ color: '#00D4FF' }}>
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Email</label>
              <input type="email" placeholder="votre@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }} />
            </div>

            <button onClick={reinitialiser} disabled={chargement}
              className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-50"
              style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
              {chargement ? "Envoi..." : "Envoyer le lien"}
            </button>

            <p className="text-center mt-6">
              <Link to="/connexion" className="text-sm transition hover:text-white"
                style={{ color: '#8899AA' }}>
                Retour à la connexion
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  )
}