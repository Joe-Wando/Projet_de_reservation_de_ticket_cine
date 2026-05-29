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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 rounded-2xl p-10 w-full max-w-md shadow-xl">

        <Link to="/" className="text-xl font-extrabold text-red-500 block mb-8">
          SENECINE 
        </Link>

        <div className="text-5xl mb-4"></div>
        <h1 className="text-3xl font-bold text-white mb-2">Mot de passe oublié ?</h1>
        <p className="text-gray-400 text-sm mb-8">
          Entrez votre email et on vous envoie un lien de réinitialisation.
        </p>

        {erreur && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {erreur}
          </div>
        )}

        {envoye ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-4 rounded-xl text-center">
            <p className="text-2xl mb-2"></p>
            <p className="font-semibold">Email envoyé !</p>
            <p className="text-sm mt-1 text-green-400/70">Vérifiez votre boîte mail.</p>
            <Link to="/connexion" className="text-red-400 hover:underline text-sm mt-4 inline-block">
              Retour à la connexion →
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-1 block">Email</label>
              <input type="email" placeholder="votre@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition" />
            </div>

            <button onClick={reinitialiser} disabled={chargement}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
              {chargement ? "Envoi..." : "Envoyer le lien"}
            </button>

            <p className="text-center mt-6">
              <Link to="/connexion" className="text-gray-400 text-sm hover:text-white transition">
                ← Retour à la connexion
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  )
}