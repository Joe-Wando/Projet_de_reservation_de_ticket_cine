import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [utilisateur, setUtilisateur] = useState<any>(null)
  const [reservations, setReservations] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(function() {
    const desabonner = auth.onAuthStateChanged(function(user) {
      setUtilisateur(user)
    })
    return desabonner
  }, [])

  useEffect(function() {
    if (!utilisateur) return

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
      setChargement(false)
    }

    chargerReservations()
  }, [utilisateur])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* En-tête */}
      <div className="mb-10">
        <p className="text-gray-400 text-sm mb-1">Tableau de bord</p>
        <h1 className="text-4xl font-bold">
          Bonjour {utilisateur?.displayName || utilisateur?.email} 👋
        </h1>
        <p className="text-gray-400 mt-2">Voici un résumé de votre activité sur SENECINE</p>
      </div>

      {/* Cartes de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Carte 1 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
          <p className="text-white/70 text-sm mb-1">Films réservés</p>
          <p className="text-5xl font-bold">{reservations.length}</p>
          <p className="text-white/60 text-xs mt-3"> Total de vos réservations</p>
        </div>

        {/* Carte 2 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          <p className="text-white/70 text-sm mb-1">Dernière réservation</p>
          <p className="text-2xl font-bold mt-2">
            {reservations.length > 0
              ? reservations[reservations.length - 1].date
              : "—"}
          </p>
          <p className="text-white/60 text-xs mt-3">📅 Date de votre dernière séance</p>
        </div>

        {/* Carte 3 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
          <p className="text-white/70 text-sm mb-1">Statut</p>
          <p className="text-2xl font-bold mt-2">Membre actif ✅</p>
          <p className="text-white/60 text-xs mt-3"> Merci pour votre fidélité</p>
        </div>

      </div>

      {/* Liste des réservations */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Mes réservations</h2>
          <Link to="/Films"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm transition">
            + Réserver un film
          </Link>
        </div>

        {chargement ? (
          <p className="text-gray-400">Chargement...</p>
        ) : reservations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">🎬</p>
            <p className="text-gray-400">Aucune réservation pour le moment.</p>
            <Link to="/Films" className="text-red-400 hover:underline text-sm mt-2 inline-block">
              Voir les films disponibles →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {reservations.map(function(reservation) {
              return (
                <div key={reservation.id}
                  className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-full text-xl">
                      🎥
                    </div>
                    <div>
                      <p className="font-semibold">{reservation.filmTitre}</p>
                      <p className="text-sm text-gray-400">Réservé le {reservation.date}</p>
                    </div>
                  </div>
                  <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
                    Confirmé
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}