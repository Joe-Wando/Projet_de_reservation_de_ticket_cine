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
    <div className="min-h-screen text-white p-8"
      style={{ backgroundColor: '#050B18' }}>

      {/* En-tête */}
      <div className="mb-10">
        <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Tableau de bord</p>
        <h1 className="text-4xl font-bold">
          Bonjour {utilisateur?.displayName || utilisateur?.email}
        </h1>
        <p className="mt-2" style={{ color: '#8899AA' }}>
          Voici un résumé de votre activité sur SENECINE
        </p>
      </div>

      {/* Cartes de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="rounded-2xl p-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #00D4FF20, #00D4FF10)', border: '1px solid #00D4FF30' }}>
          <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Films réservés</p>
          <p className="text-5xl font-bold" style={{ color: '#00D4FF' }}>
            {reservations.length}
          </p>
          <p className="text-xs mt-3" style={{ color: '#8899AA' }}>Total de vos réservations</p>
        </div>

        <div className="rounded-2xl p-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7B61FF20, #7B61FF10)', border: '1px solid #7B61FF30' }}>
          <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Dernière réservation</p>
          <p className="text-2xl font-bold mt-2 text-white">
            {reservations.length > 0
              ? reservations[reservations.length - 1].date
              : "—"}
          </p>
          <p className="text-xs mt-3" style={{ color: '#8899AA' }}>Date de votre dernière séance</p>
        </div>

        <div className="rounded-2xl p-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #00D4FF15, #7B61FF15)', border: '1px solid #1A2940' }}>
          <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Statut</p>
          <p className="text-2xl font-bold mt-2 text-white">Membre actif</p>
          <p className="text-xs mt-3" style={{ color: '#8899AA' }}>Merci pour votre fidélité</p>
        </div>

      </div>

      {/* Liste des réservations */}
      <div className="rounded-2xl shadow-lg p-6"
        style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Mes réservations</h2>
          <Link to="/films"
            className="px-4 py-2 rounded-lg text-sm transition font-semibold"
            style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
            + Réserver un film
          </Link>
        </div>

        {chargement ? (
          <p style={{ color: '#8899AA' }}>Chargement...</p>
        ) : reservations.length === 0 ? (
          <div className="text-center py-10">
            <p style={{ color: '#8899AA' }}>Aucune réservation pour le moment.</p>
            <Link to="/films" className="text-sm mt-2 inline-block hover:underline"
              style={{ color: '#00D4FF' }}>
              Voir les films disponibles
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: '#1A2940' }}>
            {reservations.map(function(reservation) {
              return (
                <div key={reservation.id}
                  className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#00D4FF20', border: '1px solid #00D4FF30' }}>
                      <span style={{ color: '#00D4FF' }}>▶</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{reservation.filmTitre}</p>
                      <p className="text-sm" style={{ color: '#8899AA' }}>
                        Réservé le {reservation.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: '#00D4FF15', color: '#00D4FF', border: '1px solid #00D4FF30' }}>
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