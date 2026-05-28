import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Inscription() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargement, setChargement] = useState(false)
  const navigate = useNavigate()   // nouveau

  async function inscrire() {
    setErreur("")
    setChargement(true)

    try {
      const resultat = await createUserWithEmailAndPassword(auth, email, motDePasse)

      // On enregistre le nom complet dans le profil Firebase
      await updateProfile(resultat.user, {
        displayName: prenom + " " + nom
      })

      navigate('/dashboard')   // nouveau : on redirige après succès
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
    <div>
      <h1>Inscription</h1>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}

      <input type="text" placeholder="Votre nom"
        value={nom} onChange={e => setNom(e.target.value)} />
      <input type="text" placeholder="Votre prénom"
        value={prenom} onChange={e => setPrenom(e.target.value)} />
      <input type="email" placeholder="Votre email"
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Votre mot de passe"
        value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />

      <button onClick={inscrire} disabled={chargement}>
        {chargement ? "Inscription..." : "S'inscrire"}
      </button>
    </div>
  )
}