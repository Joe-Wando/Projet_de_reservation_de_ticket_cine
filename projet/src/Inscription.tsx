import { useState } from "react"

export default function Inscription() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")

  return (
    <div>
      <h1>Inscription</h1>
    </div>
  )
}