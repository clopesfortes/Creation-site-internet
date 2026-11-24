import Link from "next/link";
export default function Accueil() {
  return (
    <main className="accueil">
      <h1>Votre site professionnel, prêt en quelques minutes</h1>
      <p>Renseignez vos informations, voyez votre site se construire en direct, puis publiez-le.</p>
      <Link className="bouton" href="/creer">Créer mon site</Link>
    </main>
  );
}
