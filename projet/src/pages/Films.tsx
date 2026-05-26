import { useNavigate } from "react-router-dom"
import films from "../films"

export default function Films() {
  const naviguer = useNavigate()

  function allerAReservation(id: number) {
    naviguer("/reservation/" + id)
  }

  return (
    <div>
      <h1>Voici nos films</h1>

      {films.map(function(film) {
        return (
          <div key={film.id}>
            <h2>{film.titre}</h2>
            <button onClick={function() { allerAReservation(film.id) }}>
              Réserver
            </button>
          </div>
        )
      })}
    </div>
  )
}