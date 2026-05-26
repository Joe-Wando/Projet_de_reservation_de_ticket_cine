import { useParams } from "react-router-dom"

export default function Reservation() {
  const { id } = useParams()

  return (
    <div>
      <h1>Vos réservations</h1>
      <p>Vous avez choisi le film numéro : {id}</p>
    </div>
  )
}