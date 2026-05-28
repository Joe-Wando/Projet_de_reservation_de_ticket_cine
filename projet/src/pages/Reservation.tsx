import { useParams } from "react-router-dom"
import films from "../films"
import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"
import { auth } from '../firebase'

export default function Reservation() {
  const { id } = useParams()

  const film = films.find(function(f) {
    return f.id === Number(id)
  })

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")

  async function confirmerReservation() {
    await addDoc(collection(db, "reservations"), {
      filmId: id,
      filmTitre: film?.titre,
      nom: nom,
      prenom: prenom,
      email: email,
      date: new Date().toLocaleDateString()
    })

    await emailjs.send(
      "service_4zcakd1",
      "template_mahkm92",
      {
        nom: nom,
        prenom: prenom,
        email: email,
        film_titre: film?.titre,
        date: new Date().toLocaleDateString()
      },
      "LXcpyZm3pWLch4zM0"
    )

    setReserve(true)
  }

  return (
    <div>
      <h1>Réservation</h1>
      <p>Vous avez choisi : {film?.titre}</p>

      {reserve ? (
        <p>Réservation confirmée !</p>
      ) : (
        <div>
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
          <button onClick={confirmerReservation}>
            Confirmer la réservation
          </button>
        </div>
      )}
    </div>
  )
}