// Modèle n°1 : lit les données du formulaire et affiche le site.
export default function SiteModele({ d }) {
  const lignes = (t) => (t || "").split("\n").filter(Boolean);
  const liste = (t) => (t || "").split(",").map((s) => s.trim()).filter(Boolean);
  const nom = `${d.prenom} ${d.nom}`.trim();
  return (
    <div>
      <header className="site-entete">
        <h1>{nom || "Votre nom"}</h1>
        <p>{d.titre}{d.adeli ? ` – ADELI ${d.adeli}` : ""}</p>
        <p>{d.accroche}</p>
      </header>
      <section className="site-section">
        <h2>Présentation</h2>
        <p>{d.presentation}</p>
        {d.approches && <p><strong>Approches :</strong> {d.approches}</p>}
        {d.public && <p><strong>Public reçu :</strong> {d.public}</p>}
      </section>
      {d.motifs && (
        <section className="site-section">
          <h2>Motifs de consultation</h2>
          <ul>{liste(d.motifs).map((m) => <li key={m}>{m}</li>)}</ul>
        </section>
      )}
      <section className="site-section">
        <h2>Première séance</h2>
        <p>{d.premiereSeance}</p>
        <p><strong>Tarif :</strong> {d.tarif} € · {d.duree} minutes</p>
      </section>
      <section className="site-section">
        <h2>Cabinet et horaires</h2>
        <p>{d.adresse}</p>
        {d.acces && <p>{d.acces}</p>}
        {d.visio && <p>Consultations également possibles en visioconférence.</p>}
        <p>{lignes(d.horaires).map((l, i) => <span key={i}>{l}<br /></span>)}</p>
      </section>
      {d.parcours && (
        <section className="site-section">
          <h2>Parcours et formation</h2>
          <p>{d.parcours}</p>
        </section>
      )}
      <div className="site-contact">
        {d.telephone && <a className="bouton" href={`tel:${d.telephone.replace(/\s/g, "")}`}>Appeler</a>}
        {d.email && <a className="bouton clair" href={`mailto:${d.email}`}>Écrire un email</a>}
        {d.lienRdv && <a className="bouton clair" href={d.lienRdv}>Prendre rendez-vous</a>}
        {d.adresse && <a className="bouton clair" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.adresse)}`}>Itinéraire</a>}
      </div>
      <footer className="site-pied">
        Mentions légales : {nom}, {d.titre}{d.adeli ? `, ADELI ${d.adeli}` : ""}{d.siret ? `, SIRET ${d.siret}` : ""}.{" "}
        Ce site ne remplace pas une consultation et n'est pas destiné aux urgences : en cas de détresse, appelez le 3114.
      </footer>
    </div>
  );
}
