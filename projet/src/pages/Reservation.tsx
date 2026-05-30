import { useParams, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { db, auth } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import emailjs from "@emailjs/browser"
import { useFilms } from "../hooks/useFilms"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

function genererNumeroTicket() {
  return "TK-" + Date.now().toString().slice(-6) + "-" + Math.floor(Math.random() * 1000)
}

export default function Reservation() {
  const { id } = useParams()
  const naviguer = useNavigate()
  const { films, chargement } = useFilms()
  const ticketRef = useRef<HTMLDivElement>(null)

  const film = films.find(f => f.id === Number(id))

  const [reserve, setReserve] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nbPlaces, setNbPlaces] = useState(1)
  const [horaire, setHoraire] = useState("14h00")
  const [dateSeance, setDateSeance] = useState("")
  const [erreur, setErreur] = useState("")
  const [chargementReservation, setChargementReservation] = useState(false)
  const [numeroTicket, setNumeroTicket] = useState("")
  const [telechargement, setTelechargement] = useState(false)

  async function confirmerReservation() {
    if (!nom || !prenom || !dateSeance) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }
    setErreur("")
    setChargementReservation(true)

    try {
      const numero = genererNumeroTicket()
      setNumeroTicket(numero)

      await addDoc(collection(db, "reservations"), {
        filmId: id,
        filmTitre: film?.titre,
        filmAffiche: film?.affiche,
        nom, prenom,
        email: auth.currentUser?.email,
        nbPlaces, horaire, dateSeance,
        numeroTicket: numero,
        date: new Date().toLocaleDateString()
      })

      await emailjs.send(
        "service_4zcakd1",
        "template_mahkm92",
        {
          nom, prenom,
          email: auth.currentUser?.email,
          film_titre: film?.titre,
          film_affiche: film?.affiche,
          nb_places: nbPlaces,
          horaire,
          date_seance: dateSeance,
          numero_ticket: numero,
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

  async function telechargerTicket() {
    if (!ticketRef.current) return
    setTelechargement(true)
    try {
      const images = ticketRef.current.querySelectorAll("img")
      await Promise.all(Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })
      }))

      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#111111",
        scale: 2,
        useCORS: true
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("landscape", "mm", "a5")
      const largeur = pdf.internal.pageSize.getWidth()
      const hauteur = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, "PNG", 0, 0, largeur, hauteur)
      pdf.save(`billet-${numeroTicket}.pdf`)
    } catch (e) {
      console.error("Erreur telechargement", e)
    } finally {
      setTelechargement(false)
    }
  }

  if (chargement) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0A0A0A" }}>
        <p style={{ color: "#888888" }}>Chargement du film...</p>
      </div>
    )
  }

  if (reserve) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundColor: "#0A0A0A" }}>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Reservation confirmee !</h2>
          <p className="mt-2" style={{ color: "#888888" }}>
            Un email a ete envoye a {auth.currentUser?.email}
          </p>
        </div>

        {/* BILLET */}
        <div ref={ticketRef}
          className="w-full max-w-2xl rounded-2xl overflow-hidden flex shadow-2xl"
          style={{ backgroundColor: "#111111", border: "1px solid #222222" }}>

          <div className="w-2/5 relative">
            <img src={film?.affiche} alt={film?.titre}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent, #111111)" }}>
            </div>
          </div>

          <div className="relative flex flex-col items-center"
            style={{ backgroundColor: "#111111" }}>
            <div className="absolute -top-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: "#0A0A0A" }}></div>
            <div className="h-full mx-3"
              style={{ borderLeft: "2px dashed #222222" }}></div>
            <div className="absolute -bottom-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: "#0A0A0A" }}></div>
          </div>

          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "#00A651" }}>
                LAZONE
              </p>
              <h3 className="text-2xl font-extrabold text-white mb-4">{film?.titre}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#888888" }}>Titulaire</p>
                  <p className="text-white font-semibold">{prenom} {nom}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#888888" }}>Places</p>
                  <p className="text-white font-semibold">{nbPlaces} place{nbPlaces > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#888888" }}>Date</p>
                  <p className="text-white font-semibold">{dateSeance}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#888888" }}>Horaire</p>
                  <p className="text-white font-semibold">{horaire}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#888888" }}>N° Billet</p>
              <p className="font-mono font-bold text-lg" style={{ color: "#00A651" }}>
                {numeroTicket}
              </p>

              <div className="flex gap-px mt-3">
                {Array.from({ length: 40 }).map(function(_, i) {
                  return (
                    <div key={i} style={{
                      width: i % 3 === 0 ? "3px" : "2px",
                      height: "35px",
                      backgroundColor: "#ffffff",
                      opacity: i % 2 === 0 ? 0.9 : 0.3
                    }}></div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <button onClick={telechargerTicket} disabled={telechargement}
            className="px-8 py-3 rounded-full font-semibold transition disabled:opacity-50"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}>
            {telechargement ? "Generation en cours..." : "Telecharger mon billet"}
          </button>
          <button onClick={() => naviguer("/films")}
            className="px-8 py-3 rounded-full font-semibold transition"
            style={{ border: "1px solid #222222", color: "#888888" }}>
            Voir d'autres films
          </button>
          <button onClick={() => naviguer("/dashboard")}
            className="px-8 py-3 rounded-full font-semibold transition"
            style={{ border: "1px solid #00A651", color: "#00A651" }}>
            Mon espace
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#0A0A0A" }}>
      <div className="w-full max-w-md rounded-2xl p-10 shadow-xl"
        style={{ backgroundColor: "#111111", border: "1px solid #222222" }}>

        {film?.affiche && (
          <img src={film.affiche} alt={film.titre}
            className="w-full h-48 object-cover rounded-xl mb-6" />
        )}

        <p className="text-sm mb-1" style={{ color: "#888888" }}>Reservation</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {film?.titre || "Chargement..."}
        </h1>
        <p className="text-sm mb-8" style={{ color: "#888888" }}>
          Remplissez le formulaire pour confirmer votre reservation.
        </p>

        {erreur && (
          <div className="px-4 py-3 rounded-xl mb-6 text-sm"
            style={{ backgroundColor: "#E2001A10", border: "1px solid #E2001A30", color: "#E2001A" }}>
            {erreur}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#888888" }}>Nom</label>
          <input type="text" placeholder="Diallo" value={nom}
            onChange={e => setNom(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222" }} />
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#888888" }}>Prenom</label>
          <input type="text" placeholder="Moussa" value={prenom}
            onChange={e => setPrenom(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222" }} />
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#888888" }}>Date de la seance</label>
          <input type="date" value={dateSeance}
            onChange={e => setDateSeance(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222", colorScheme: "dark" }} />
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1 block" style={{ color: "#888888" }}>Horaire</label>
          <select value={horaire} onChange={e => setHoraire(e.target.value)}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222" }}>
            <option value="14h00">14h00</option>
            <option value="19h00">19h00</option>
            <option value="22h00">22h00</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="text-sm mb-1 block" style={{ color: "#888888" }}>
            Nombre de places (max 10)
          </label>
          <select value={nbPlaces} onChange={e => setNbPlaces(Number(e.target.value))}
            className="w-full text-white px-4 py-3 rounded-xl focus:outline-none transition"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222" }}>
            {[1,2,3,4,5,6,7,8,9,10].map(function(n) {
              return <option key={n} value={n}>{n} place{n > 1 ? "s" : ""}</option>
            })}
          </select>
        </div>

        <button onClick={confirmerReservation} disabled={chargementReservation}
          className="w-full py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
          style={{ backgroundColor: "#00A651", color: "#ffffff" }}>
          {chargementReservation ? "Reservation en cours..." : "Confirmer la reservation"}
        </button>

      </div>
    </div>
  )
}