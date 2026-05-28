import { useParams } from "react-router-dom"
import films from "../films"
import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"

export default function Reservation() {
  const { id } = useParams()

  const film = films.find(f => f.id === Number(id))

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargement, setChargement] = useState(false)

  async function confirmerReservation() {
    setErreur("")
    setChargement(true)

    try {
      await addDoc(collection(db, "reservations"), {
        filmId: id,
        filmTitre: film?.titre,
        nom: nom,
        prenom: prenom,
        email: auth.currentUser?.email,
        date: new Date().toLocaleDateString()
      })

      await emailjs.send(
        "service_4zcakd1",
        "template_mahkm92",
        {
          nom: nom,
          prenom: prenom,
          email: auth.currentUser?.email,
          film_titre: film?.titre,
          date: new Date().toLocaleDateString()
        },
        "LXcpyZm3pWLch4zM0"
      )

      setReserve(true)
    } catch (e: any) {
      setErreur("La réservation a échoué. Réessayez.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div>
      <h1>Réservation</h1>
      <p>Vous avez choisi : {film?.titre}</p>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}

      {reserve ? (
        <p>Réservation confirmée !</p>
      ) : (
        <div>
          <input type="text" placeholder="Votre nom"
            value={nom} onChange={e => setNom(e.target.value)} />
          <input type="text" placeholder="Votre prénom"
            value={prenom} onChange={e => setPrenom(e.target.value)} />
          <button onClick={confirmerReservation} disabled={chargement}>
            {chargement ? "Réservation en cours..." : "Confirmer la réservation"}
          </button>
        </div>
      )}
    </div>
  )
}