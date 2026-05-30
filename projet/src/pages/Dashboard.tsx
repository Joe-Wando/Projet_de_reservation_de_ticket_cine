import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [utilisateur, setUtilisateur] = useState<any>(null)
  const [reservations, setReservations] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)
  const [suppressionId, setSuppressionId] = useState<string | null>(null)

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

  async function supprimerReservation(id: string) {
    try {
      await deleteDoc(doc(db, 'reservations', id))
      setReservations(function(prev) {
        return prev.filter(r => r.id !== id)
      })
      setSuppressionId(null)
    } catch (e) {
      console.error("Erreur suppression", e)
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#050B18' }}>

      {/* En-tete */}
      <div className="mb-10">
        <p className="text-sm mb-1" style={{ color: '#8899AA' }}>Tableau de bord</p>
        <h1 className="text-4xl font-bold text-white">
          Bonjour {utilisateur?.displayName || utilisateur?.email}
        </h1>
        <p className="mt-2" style={{ color: '#8899AA' }}>
          Voici un resume de votre activite sur SENECINE
        </p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(135deg, #00D4FF, #0088AA)' }}>
          <p className="text-white/70 text-sm mb-1">Films reserves</p>
          <p className="text-5xl font-bold text-white">{reservations.length}</p>
          <p className="text-white/60 text-xs mt-3">Total de vos reservations</p>
        </div>

        <div className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(135deg, #7B61FF, #4A3AFF)' }}>
          <p className="text-white/70 text-sm mb-1">Derniere reservation</p>
          <p className="text-2xl font-bold text-white mt-2">
            {reservations.length > 0
              ? reservations[reservations.length - 1].date
              : "—"}
          </p>
          <p className="text-white/60 text-xs mt-3">Date de votre derniere seance</p>
        </div>

        <div className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(135deg, #00FF9D, #00AA66)' }}>
          <p className="text-white/70 text-sm mb-1">Statut</p>
          <p className="text-2xl font-bold text-white mt-2">Membre actif</p>
          <p className="text-white/60 text-xs mt-3">Merci pour votre fidelite</p>
        </div>
      </div>

      {/* Liste reservations */}
      <div className="rounded-2xl p-6"
        style={{ backgroundColor: '#0D1526', border: '1px solid #1A2940' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Mes reservations</h2>
          <Link to="/Films"
            className="text-sm px-4 py-2 rounded-lg font-semibold transition"
            style={{ backgroundColor: '#00D4FF', color: '#050B18' }}>
            + Reserver un film
          </Link>
        </div>

        {chargement ? (
          <p style={{ color: '#8899AA' }}>Chargement...</p>
        ) : reservations.length === 0 ? (
          <div className="text-center py-10">
            <p style={{ color: '#8899AA' }}>Aucune reservation pour le moment.</p>
            <Link to="/Films"
              className="text-sm mt-2 inline-block hover:underline"
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
                    {reservation.filmAffiche && (
                      <img src={reservation.filmAffiche} alt={reservation.filmTitre}
                        className="w-12 h-16 object-cover rounded-lg" />
                    )}
                    <div>
                      <p className="font-semibold text-white">{reservation.filmTitre}</p>
                      <p className="text-xs mt-1" style={{ color: '#8899AA' }}>
                        {reservation.dateSeance || reservation.date}
                        {reservation.horaire && ` — ${reservation.horaire}`}
                        {reservation.nbPlaces && ` — ${reservation.nbPlaces} place${reservation.nbPlaces > 1 ? 's' : ''}`}
                      </p>
                      {reservation.numeroTicket && (
                        <p className="text-xs font-mono mt-1" style={{ color: '#7B61FF' }}>
                          {reservation.numeroTicket}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: '#00D4FF15', color: '#00D4FF', border: '1px solid #00D4FF30' }}>
                      Confirme
                    </span>

                    {suppressionId === reservation.id ? (
                      <div className="flex gap-2 items-center">
                        <p className="text-xs" style={{ color: '#8899AA' }}>Confirmer ?</p>
                        <button onClick={() => supprimerReservation(reservation.id)}
                          className="text-xs px-3 py-1 rounded-lg font-semibold"
                          style={{ backgroundColor: '#FF000020', color: '#FF6B6B', border: '1px solid #FF000030' }}>
                          Oui
                        </button>
                        <button onClick={() => setSuppressionId(null)}
                          className="text-xs px-3 py-1 rounded-lg font-semibold"
                          style={{ backgroundColor: '#1A2940', color: '#8899AA' }}>
                          Non
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setSuppressionId(reservation.id)}
                        className="text-xs px-3 py-1 rounded-lg transition"
                        style={{ backgroundColor: '#FF000015', color: '#FF6B6B', border: '1px solid #FF000025' }}>
                        Supprimer
                      </button>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}