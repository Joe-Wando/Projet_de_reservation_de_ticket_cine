import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-10 px-8" style={{ borderTop: '1px solid #1A2940', backgroundColor: '#050B18' }}>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

          {/* Colonne 1 — Marque */}
          <div>
            <p className="text-xl font-extrabold mb-2" style={{ color: '#00D4FF' }}>SENECINE</p>
            <p className="text-sm" style={{ color: '#8899AA' }}>
              La billetterie cinema du Senegal. Reservez vos places en ligne en quelques clics.
            </p>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <p className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigation</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-white transition" style={{ color: '#8899AA' }}>Accueil</Link>
              <Link to="/Films" className="text-sm hover:text-white transition" style={{ color: '#8899AA' }}>Films</Link>
              <Link to="/dashboard" className="text-sm hover:text-white transition" style={{ color: '#8899AA' }}>Mon espace</Link>
            </div>
          </div>

          {/* Colonne 3 — Contact */}
          <div>
            <p className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Service client</p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8899AA' }}>Telephone</p>
                <a href="tel:+221771234567"
                  className="text-sm font-semibold hover:underline transition"
                  style={{ color: '#00D4FF' }}>
                  +221 78 526 82 08
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8899AA' }}>Email</p>
                <a href="mailto:contact@senecine.sn"
                  className="text-sm font-semibold hover:underline transition"
                  style={{ color: '#00D4FF' }}>
                  jonathan6wando@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8899AA' }}>Horaires</p>
                <p className="text-sm" style={{ color: '#8899AA' }}>Lun - Sam : 9h00 - 20h00</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid #1A2940' }}>
          <p className="text-xs" style={{ color: '#1A2940' }}>
            2026 SENECINE. Tous droits reserves.
          </p>
          <p className="text-xs" style={{ color: '#1A2940' }}>
            Pour annuler une reservation, contactez notre service client.
          </p>
        </div>

      </div>
    </footer>
  )
}