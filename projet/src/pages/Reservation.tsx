import { useParams, useNavigate } from "react-router-dom"
import { useFilms } from "../hooks/useFilms"
import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"

export default function Reservation() {
  const { id } = useParams()
  const naviguer = useNavigate()
  const { films, chargement } = useFilms()

  const film = films.find(f => f.id === Number(id))

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargementReservation, setChargementReservation] = useState(false)

  const dateAujourdhui = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  })

  async function confirmerReservation() {
    if (!nom || !prenom) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }
    setErreur("")
    setChargementReservation(true)

    try {
      await addDoc(collection(db, "reservations"), {
        filmId: id,
        filmTitre: film?.titre,
        nom, prenom,
        email: auth.currentUser?.email,
        date: new Date().toLocaleDateString()
      })

      await emailjs.send(
        "service_4zcakd1", "template_mahkm92",
        {
          nom, prenom,
          email: auth.currentUser?.email,
          film_titre: film?.titre,
          date: new Date().toLocaleDateString()
        },
        "LXcpyZm3pWLch4zM0"
      )

      setReserve(true)
    } catch (e: any) {
      setErreur("La reservation a echoue. Reessayez.")
    } finally {
      setChargementReservation(false)
    }
  }

  if (chargement) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Chargement du film...</p>
      </div>
    )
  }

  // BILLET CONFIRME
  if (reserve) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Reservation confirmee !</h2>
            <p className="text-gray-400 mt-2">Votre billet a ete envoye par email</p>
          </div>

          <div className="flex rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-1/2 relative">
              <img src={film?.affiche} alt={film?.titre}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">SENECINE</p>
                <h3 className="text-xl font-extrabold text-white">{film?.titre}</h3>
                <p className="text-white/60 text-xs mt-1">{dateAujourdhui}</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center bg-gray-900">
              <div className="absolute -top-3 w-6 h-6 bg-gray-950 rounded-full"></div>
              <div className="border-l-2 border-dashed border-gray-600 h-full mx-3"></div>
              <div className="absolute -bottom-3 w-6 h-6 bg-gray-950 rounded-full"></div>
            </div>

            <div className="bg-gray-900 w-1/2 p-8 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Titulaire</p>
                <p className="text-white text-xl font-bold">{prenom} {nom}</p>
                <p className="text-gray-400 text-sm mt-1">{auth.currentUser?.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">N Billet</p>
                <p className="text-red-400 font-mono font-bold text-lg">
                  SCN-{Date.now().toString().slice(-6)}
                </p>
                <div className="flex gap-px mt-4">
                  {Array.from({ length: 30 }).map(function(_, i) {
                    return (
                      <div key={i} className="bg-white"
                        style={{
                          width: i % 3 === 0 ? "3px" : "2px",
                          height: "40px",
                          opacity: i % 2 === 0 ? 0.9 : 0.4
                        }}>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button onClick={() => naviguer("/Films")}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition">
              Voir d'autres films
            </button>
            <button onClick={() => naviguer("/dashboard")}
              className="border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold transition">
              Mon espace
            </button>
          </div>

        </div>
      </div>
    )
  }

  // FORMULAIRE
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">

        <p className="text-gray-400 text-sm mb-1">Vous etes sur le point de reserver</p>
        <h1 className="text-4xl font-bold text-white mb-8">Votre billet</h1>

        <div className="flex rounded-2xl overflow-hidden shadow-2xl mb-8">

          <div className="w-1/2 relative">
            <img src={film?.affiche} alt={film?.titre}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">SENECINE</p>
              <h3 className="text-xl font-extrabold text-white">{film?.titre}</h3>
              <p className="text-white/60 text-xs mt-1">{dateAujourdhui}</p>
            </div>
          </div>

          <div className="relative flex flex-col items-center bg-gray-900">
            <div className="absolute -top-3 w-6 h-6 bg-gray-950 rounded-full"></div>
            <div className="border-l-2 border-dashed border-gray-600 h-full mx-3"></div>
            <div className="absolute -bottom-3 w-6 h-6 bg-gray-950 rounded-full"></div>
          </div>

          <div className="bg-gray-900 w-1/2 p-8 flex flex-col justify-center gap-4">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Titulaire</p>

            <div>
              <label className="text-gray-400 text-xs block mb-1">Prenom</label>
              <input type="text" placeholder="Moussa"
                value={prenom} onChange={e => setPrenom(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-red-500 transition" />
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-1">Nom</label>
              <input type="text" placeholder="Diallo"
                value={nom} onChange={e => setNom(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-red-500 transition" />
            </div>

            <p className="text-gray-500 text-xs">{auth.currentUser?.email}</p>
          </div>

        </div>

        {erreur && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {erreur}
          </div>
        )}

        <button onClick={confirmerReservation} disabled={chargementReservation}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold text-lg transition disabled:opacity-50">
          {chargementReservation ? "Reservation en cours..." : "Confirmer ma reservation"}
        </button>

        <button onClick={() => naviguer("/Films")}
          className="w-full text-gray-400 hover:text-white text-sm mt-4 transition">
          Retour aux films
        </button>

      </div>
    </div>
  )
}