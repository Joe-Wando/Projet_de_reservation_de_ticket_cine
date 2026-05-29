import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFilms } from "../hooks/useFilms"

export default function Films() {
  const naviguer = useNavigate()
  const { films, chargement } = useFilms()
  const [recherche, setRecherche] = useState("")

  const filmsFiltres = films.filter(function(film) {
    return film.titre.toLowerCase().includes(recherche.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">

      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-gray-400 text-sm mb-1">Catalogue complet</p>
        <h1 className="text-4xl font-bold mb-6">Nos films 🎬</h1>

        {/* Barre de recherche */}
        <div className="relative max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition"
          />
          {recherche && (
            <button onClick={() => setRecherche("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              ✕
            </button>
          )}
        </div>

        <p className="text-gray-400 text-sm mt-4">
          {filmsFiltres.length} film{filmsFiltres.length > 1 ? "s" : ""} trouvé{filmsFiltres.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Grille */}
      <div className="max-w-6xl mx-auto">
        {chargement ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-5xl mb-4">🎬</p>
              <p className="text-gray-400">Chargement des films...</p>
            </div>
          </div>
        ) : filmsFiltres.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-gray-400 text-lg">Aucun film trouvé pour "{recherche}"</p>
            <button onClick={() => setRecherche("")}
              className="text-red-400 hover:underline text-sm mt-3 inline-block">
              Effacer la recherche
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filmsFiltres.map(function(film) {
              return (
                <div key={film.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300">

                  {/* Vraie affiche TMDB */}
                  <img
                    src={film.affiche}
                    alt={film.titre}
                    className="w-full h-72 object-cover"
                  />

                  {/* Badge note */}
                  <span className="absolute top-3 right-3 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-full font-bold">
                    ⭐ {film.note.toFixed(1)}
                  </span>

                  {/* Infos en bas */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="font-bold text-white text-sm leading-tight">{film.titre}</p>
                  </div>

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <p className="text-white text-xs text-center line-clamp-4">{film.synopsis}</p>
                    <button
                      onClick={() => naviguer("/reservation/" + film.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
                      Réserver
                    </button>
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