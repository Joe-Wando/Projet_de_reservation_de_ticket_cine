import {Routes, Route} from 'react-router-dom'
import Acceuil from './pages/Acceuil'
import Films from './pages/Films'
import Reservation from './pages/Reservation'
export default function App(){
  return(
      <Routes>
        <Route path="/" element ={<Acceuil/>}/>
        <Route path="/Films" element={<Films />}/>
        <Route path="/Reservation" element={<Reservation />}/>      
      </Routes>

)
}