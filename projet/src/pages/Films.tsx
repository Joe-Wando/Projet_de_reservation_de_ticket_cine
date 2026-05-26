import {useNavigate} from "react-router-dom"
export default function Films() {

const naviguer = useNavigate()
function allerAReservation(id: number) {
  naviguer("/reservation/" + id)
}
const films = [
  { id: 1, titre: "Avengers" },
  { id: 2, titre: "Cyberpunk 2029" },
  { id: 3, titre: "Made in Abyss" },
   { id: 4, titre: "Demon Slayer" },
{ id: 5, titre: "Batman the Dark night" },
] 


  return (
    <div>
       <h1>Voici la liste de nos Films</h1>
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