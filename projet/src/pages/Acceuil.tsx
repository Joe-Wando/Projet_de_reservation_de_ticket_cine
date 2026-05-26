import { Link } from "react-router-dom"
export default function Acceuil(){
return (
     <div>
       <h1>Bienvenu sur SENECINE</h1>
        <p>Chez nous, vous trouverez les meilleurs films et séries et n'oubliez de faire votre reservation à l'avance.</p>
        <Link to="/Films">Voir les films</Link>
     </div>


)
}