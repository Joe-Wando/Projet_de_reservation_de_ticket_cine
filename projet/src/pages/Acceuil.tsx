import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useFilms } from "../hooks/useFilms"

export default function Acceuil() {
  const { films, chargement } = useFilms()
  const [filmHero, setFilmHero] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(function() {
    if (films.length > 0) {
      setFilmHero(films[0])
    }
  }, [films])

  useEffect(function() {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return function() { window.removeEventListener("scroll", handleScroll) }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAVBAR transparente qui devient sombre au scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black" : "bg-transparent"}`}>
        <div className="flex items-center justify-between px-8 py-4">
          <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-wider">
            SENECINE
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition">Accueil</Link>
            <Link to="/Films" className="text-sm text-gray-300 hover:text-white transition">Films</Link>
            <Link to="/connexion" className="text-sm text-gray-300 hover:text-white transition">Connexion</Link>
            <Link to="/inscription"
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded font-semibold transition">
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — grand fond avec affiche du premier film */}
      {filmHero && (
        <div className="relative h-screen">

          {/* Image de fond */}
          <img
            src={filmHero.affiche}
            alt={filmHero.titre}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dégradés */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Contenu hero */}
          <div className="relative z-10 flex flex-col justify-end pb-32 px-12 h-full max-w-2xl">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
              Film a l'affiche
            </span>
            <h1 className="text-6xl font-extrabold leading-tight mb-4">
              {filmHero.titre}
            </h1>
            <p className="text-gray-300 text-base leading-relaxed mb-8 line-clamp-3">
              {filmHero.synopsis}
            </p>
            <div className="flex gap-4">
              <Link to={`/reservation/${filmHero.id}`}
                className="bg-white text-black px-8 py-3 rounded font-bold text-sm hover:bg-gray-200 transition">
                Reserver maintenant
              </Link>
              <Link to="/Films"
                className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded font-bold text-sm hover:bg-white/30 transition">
                Voir tous les films
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* SECTION — Films populaires */}
      <section className="px-8 py-12 -mt-16 relative z-10">
        <h2 className="text-xl font-bold mb-6">Films populaires</h2>

        {chargement ? (
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map(function(_, i) {
              return <div key={i} className="bg-gray-800 rounded-lg w-40 h-60 animate-pulse flex-shrink-0"></div>
            })}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {films.slice(0, 20).map(function(film) {
              return (
                <div key={film.id}
                  className="group relative flex-shrink-0 w-40 cursor-pointer">
                  <img
                    src={film.affiche}
                    alt={film.titre}
                    className="w-full h-60 object-cover rounded-lg group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-lg transition duration-300 flex items-center justify-center">
                    <Link to={`/reservation/${film.id}`}
                      className="opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-bold px-4 py-2 rounded transition duration-300">
                      Reserver
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* SECTION — Les mieux notes */}
      <section className="px-8 py-12">
        <h2 className="text-xl font-bold mb-6">Les mieux notes</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {films
            .slice()
            .sort((a, b) => b.note - a.note)
            .slice(0, 20)
            .map(function(film) {
              return (
                <div key={film.id}
                  className="group relative flex-shrink-0 w-40 cursor-pointer">
                  <img
                    src={film.affiche}
                    alt={film.titre}
                    className="w-full h-60 object-cover rounded-lg group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    {film.note.toFixed(1)}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-lg transition duration-300 flex items-center justify-center">
                    <Link to={`/reservation/${film.id}`}
                      className="opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-bold px-4 py-2 rounded transition duration-300">
                      Reserver
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      </section>

      {/* SECTION — Pourquoi SENECINE */}
      <section className="px-8 py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Pourquoi choisir <span className="text-red-500">SENECINE</span> ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-800 rounded-2xl p-8">
              <p className="text-red-500 font-bold text-lg mb-3">100+ Films</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Un catalogue riche entre films africains, blockbusters et animes.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <p className="text-red-500 font-bold text-lg mb-3">Reservation rapide</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Reservez votre place en moins de 5 minutes depuis n'importe quel appareil.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <p className="text-red-500 font-bold text-lg mb-3">Confirmation email</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Recevez votre billet instantanement par email apres chaque reservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xl font-extrabold text-red-500">SENECINE</p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link to="/" className="hover:text-white transition">Accueil</Link>
            <Link to="/Films" className="hover:text-white transition">Films</Link>
            <Link to="/connexion" className="hover:text-white transition">Connexion</Link>
            <Link to="/inscription" className="hover:text-white transition">Inscription</Link>
          </div>
          <p className="text-gray-600 text-xs">2026 SENECINE. Tous droits reserves.</p>
        </div>
      </footer>

    </div>
  )
}