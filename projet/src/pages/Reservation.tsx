import { useParams } from "react-router-dom"
import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"
import { useFilms } from "../hooks/useFilms"

export default function Reservation() {
  const { id } = useParams()
  const { films } = useFilms()

  const film = films.find(function(f) {
    return f.id === Number(id)
  })

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")

  async function confirmerReservation() {
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#050B18' }}>
      <div className="w-full max-w-md rounded-2xl p-10 shadow-xl"
        style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}>

        <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Réservation</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {film?.titre || "Chargement..."}
        </h1>
        <p className="text-sm mb-8" style={{ color: '#8899AA' }}>
          Remplissez le formulaire pour confirmer votre réservation.
        </p>

        {reserve ? (
          <div className="px-4 py-6 rounded-xl text-center border"
            style={{ backgroundColor: '#00D4FF10', borderColor: '#00D4FF30', color: '#00D4FF' }}>
            <p className="font-semibold text-lg">Réservation confirmée !</p>
            <p className="text-sm mt-2" style={{ color: '#8899AA' }}>
              Un email de confirmation vous a été envoyé.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Nom</label>
              <input
                type="text"
                placeholder="Diallo"
                value={nom}
                onChange={function(e) { setNom(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }}
              />
            </div>

            <div className="mb-8">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Prénom</label>
              <input
                type="text"
                placeholder="Moussa"
                value={prenom}
                onChange={function(e) { setPrenom(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }}
              />
            </div>

            <button
              onClick={confirmerReservation}
              className="w-full py-3 rounded-xl font-semibold text-lg transition"
              style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
              Confirmer la réservation
            </button>
          </div>
        )}

      </div>
    </div>
  )
}