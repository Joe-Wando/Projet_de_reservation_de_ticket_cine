import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function Dashboard() {
  const utilisateur = auth.currentUser
  const [reservations, setReservations] = useState([])

useEffect(function() {
  async function chargerReservations() {
    const requete = query(
      collection(db, 'reservations'),
      where('email', '==', utilisateur?.email)
    )
    const resultats = await getDocs(requete)
    const liste = resultats.docs.map(function(doc) {
      return { id: doc.id, ...doc.data() }
    })
    setReservations(liste)
  }
  chargerReservations()
}, [])

  return (
  <div>
    <h1>Bonjour {utilisateur?.email} </h1>

    <h2>Mes réservations</h2>

    {reservations.map(function(reservation) {
      return (
        <div key={reservation.id}>
          <p>Film : {reservation.filmTitre}</p>
          <p>Date : {reservation.date}</p>
        </div>
      )
    })}
  </div>
)
}