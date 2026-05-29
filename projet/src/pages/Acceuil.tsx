import { Link } from "react-router-dom"
import { useFilms } from "../hooks/useFilms"

export default function Acceuil() {
  const { films, chargement } = useFilms()
  const filmsAffiche = films.slice(0, 6)

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600 opacity-10 rounded-full blur-3xl"></div>

        <span className="bg-red-500/20 text-red-400 text-sm px-4 py-1 rounded-full mb-6 border border-red-500/30">
          La billetterie cinema du Senegal
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Vivez le cinema<br />
          <span className="text-red-500">autrement</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10">
          Reservez vos places en quelques clics. Films africains, blockbusters, animes — tout est la.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/Films"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition">
            Voir les films
          </Link>
          <Link to="/inscription"
            className="border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold text-lg transition">
            Creer un compte
          </Link>
        </div>

        <div className="flex gap-10 mt-16 flex-wrap justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">30+</p>
            <p className="text-gray-400 text-sm">Films disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">100%</p>
            <p className="text-gray-400 text-sm">En ligne</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">5 min</p>
            <p className="text-gray-400 text-sm">Pour reserver</p>
          </div>
        </div>
      </section>

      {/* FILMS A L'AFFICHE */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Films a l'affiche</h2>
            <p className="text-gray-400 mt-1">Une selection de nos meilleurs films</p>
          </div>
          <Link to="/Films" className="text-red-400 hover:underline text-sm">
            Voir tout
          </Link>
        </div>

        {chargement ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map(function(_, i) {
              return (
                <div key={i} className="bg-gray-800 rounded-2xl h-56 animate-pulse"></div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filmsAffiche.map(function(film) {
              return (
                <div key={film.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300">
                  <img
                    src={film.affiche}
                    alt={film.titre}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="font-bold text-white text-sm">{film.titre}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Link to={`/reservation/${film.id}`}
                      className="bg-red-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition">
                      Reserver
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Comment ca marche ?</h2>
          <p className="text-gray-400 mt-2">Reservez votre place en 3 etapes simples</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-2xl">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              Etape 1
            </div>
            <h3 className="font-bold text-lg mb-2">Choisissez un film</h3>
            <p className="text-gray-400 text-sm">
              Parcourez notre catalogue et trouvez celui qui vous correspond.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-2xl">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              Etape 2
            </div>
            <h3 className="font-bold text-lg mb-2">Creez un compte</h3>
            <p className="text-gray-400 text-sm">
              Inscrivez-vous gratuitement pour acceder a la reservation en ligne.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-2xl">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              Etape 3
            </div>
            <h3 className="font-bold text-lg mb-2">Recevez votre billet</h3>
            <p className="text-gray-400 text-sm">
              Votre confirmation arrive par email instantanement.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-gray-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-red-500">SENECINE</p>
            <p className="text-gray-400 text-sm mt-1">La billetterie cinema du Senegal</p>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
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