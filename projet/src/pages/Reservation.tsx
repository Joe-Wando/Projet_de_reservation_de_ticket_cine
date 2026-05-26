import { useParams } from "react-router-dom"
import films from "../films" 
import { useState } from "react"

export default function Reservation() {
  const { id } = useParams()
const film = films.find(function(f) {
  return f.id === Number(id)
})
const [reserve, setReserve] = useState(false)
function confirmerReservation() {
  setReserve(true)
}

  return (
<div><h1>Réservation</h1>
<p>Vous avez choisi : {film?.titre}</p>

{reserve ? (
  <p>Réservation confirmée !</p>
) : (
  <button onClick={confirmerReservation}>
    Confirmer la réservation
  </button>
)}</div>

  )
}