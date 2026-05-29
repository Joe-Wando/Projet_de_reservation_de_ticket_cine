import { useParams } from "react-router-dom"
import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"
import { useFilms } from "../hooks/useFilms"

function genererNumeroTicket() {
  return "TK-" + Date.now().toString().slice(-6) + "-" + Math.floor(Math.random() * 1000)
}

export default function Reservation() {
  const { id } = useParams()
  const { films } = useFilms()

  const film = films.find(function(f) {
    return f.id === Number(id)
  })

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nbPlaces, setNbPlaces] = useState(1)
  const [horaire, setHoraire] = useState("14h00")
  const [dateSeance, setDateSeance] = useState("")

  async function confirmerReservation() {
    const numeroTicket = genererNumeroTicket()

    await addDoc(collection(db, "reservations"), {
      filmId: id,
      filmTitre: film?.titre,
      filmAffiche: film?.affiche,
      nom: nom,
      prenom: prenom,
      email: auth.currentUser?.email,
      nbPlaces: nbPlaces,
      horaire: horaire,
      dateSeance: dateSeance,
      numeroTicket: numeroTicket,
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
        film_affiche: film?.affiche,
        nb_places: nbPlaces,
        horaire: horaire,
        date_seance: dateSeance,
        numero_ticket: numeroTicket,
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

        {film?.affiche && (
          <img src={film.affiche} alt={film.titre}
            className="w-full h-48 object-cover rounded-xl mb-6" />
        )}

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
            <p className="font-semibold text-lg">Reservation confirmee !</p>
            <p className="text-sm mt-2" style={{ color: '#8899AA' }}>
              Un email de confirmation vous a ete envoye.
            </p>
          </div>
        ) : (
          <div>

            {/* Nom */}
            <div className="mb-4">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Nom</label>
              <input type="text" placeholder="Diallo"
                value={nom}
                onChange={function(e) { setNom(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }} />
            </div>

            {/* Prénom */}
            <div className="mb-4">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Prénom</label>
              <input type="text" placeholder="Moussa"
                value={prenom}
                onChange={function(e) { setPrenom(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }} />
            </div>

            {/* Date de séance */}
            <div className="mb-4">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Date de la séance</label>
              <input type="date"
                value={dateSeance}
                onChange={function(e) { setDateSeance(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940', colorScheme: 'dark' }} />
            </div>

            {/* Horaire */}
            <div className="mb-4">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>Horaire</label>
              <select
                value={horaire}
                onChange={function(e) { setHoraire(e.target.value) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }}>
                <option value="14h00">14h00</option>
                <option value="19h00">19h00</option>
                <option value="22h00">22h00</option>
              </select>
            </div>

            {/* Nombre de places */}
            <div className="mb-8">
              <label className="text-sm mb-1 block" style={{ color: '#8899AA' }}>
                Nombre de places (max 10)
              </label>
              <select
                value={nbPlaces}
                onChange={function(e) { setNbPlaces(Number(e.target.value)) }}
                className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
                style={{ backgroundColor: '#050B18', border: '1px solid #1A2940' }}>
                {[1,2,3,4,5,6,7,8,9,10].map(function(n) {
                  return <option key={n} value={n}>{n} place{n > 1 ? "s" : ""}</option>
                })}
              </select>
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