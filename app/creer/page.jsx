"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SiteModele from "../../components/SiteModele";
import { donneesParDefaut } from "../../lib/psychologue";

const CLE = "projet-site-v1";

export default function Creer() {
  const [d, setD] = useState(donneesParDefaut);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(CLE);
      if (s) setD({ ...donneesParDefaut, ...JSON.parse(s) });
    } catch (e) {}
    setPret(true);
  }, []);
  useEffect(() => {
    if (pret) try { localStorage.setItem(CLE, JSON.stringify(d)); } catch (e) {}
  }, [d, pret]);

  const maj = (champ) => (e) =>
    setD({ ...d, [champ]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const texte = (champ, label, aide, type = "text") => (
    <div key={champ}>
      <label htmlFor={champ}>{label}</label>
      <input id={champ} type={type} value={d[champ]} onChange={maj(champ)} />
      {aide && <p className="aide">{aide}</p>}
    </div>
  );
  const zone = (champ, label) => (
    <div key={champ}>
      <label htmlFor={champ}>{label}</label>
      <textarea id={champ} value={d[champ]} onChange={maj(champ)} />
    </div>
  );

  return (
    <div className="editeur">
      <aside className="panneau">
        <Link href="/">← Accueil</Link>
        <h2>Identité</h2>
        {texte("prenom", "Prénom")}
        {texte("nom", "Nom")}
        {texte("titre", "Titre", "Ex. : psychologue clinicienne, neuropsychologue")}
        {texte("adeli", "Numéro ADELI ou RPPS", "Obligatoire pour afficher le titre de psychologue.")}
        {texte("siret", "Numéro SIRET")}

        <h2>Votre activité</h2>
        {texte("accroche", "Phrase d'accroche")}
        {zone("presentation", "Présentation")}
        {texte("approches", "Approches")}
        {texte("public", "Public reçu")}
        {texte("motifs", "Motifs de consultation", "Séparés par des virgules.")}
        {zone("premiereSeance", "Déroulement de la première séance")}
        {zone("parcours", "Parcours et formation")}

        <h2>Tarif et cabinet</h2>
        {texte("tarif", "Tarif de la séance (€)")}
        {texte("duree", "Durée (minutes)")}
        {texte("adresse", "Adresse du cabinet")}
        {zone("acces", "Accès et accessibilité")}
        <div className="case">
          <input id="visio" type="checkbox" checked={d.visio} onChange={maj("visio")} />
          <label htmlFor="visio" style={{ margin: 0 }}>Je propose la visioconsultation</label>
        </div>
        {zone("horaires", "Horaires (une ligne par jour)")}

        <h2>Contact</h2>
        {texte("telephone", "Téléphone", null, "tel")}
        {texte("email", "Email", null, "email")}
        {texte("lienRdv", "Lien de prise de rendez-vous", "Doctolib, Resalib… (facultatif)")}
        <p className="aide" style={{ marginTop: 24 }}>Vos modifications sont enregistrées automatiquement dans ce navigateur.</p>
        <button className="bouton clair" onClick={() => { if (confirm("Tout effacer et recommencer ?")) setD(donneesParDefaut); }}>Réinitialiser</button>
      </aside>
      <main className="zone-apercu">
        <div className="barre"><strong>Aperçu de votre site</strong></div>
        <div className="cadre"><SiteModele d={d} /></div>
      </main>
    </div>
  );
}
