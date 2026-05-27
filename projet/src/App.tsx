import {Routes, Route} from 'react-router-dom'
import Acceuil from './pages/Acceuil'
import Films from './pages/Films'
import Reservation from './pages/Reservation'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'

export default function App(){
  return(
      <Routes>
        <Route path="/" element ={<Acceuil/>}/>
        <Route path="/Films" element={<Films />}/>
        <Route path="/reservation/:id" element={<Reservation />} />   
      <Route path="/inscription" element={<Inscription />} />
<Route path="/connexion" element={<Connexion />} />
      </Routes>

)
}