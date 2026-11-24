import "./globals.css";
export const metadata = { title: "Création de site internet", description: "Créez votre site professionnel en quelques minutes." };
export default function RootLayout({ children }) {
  return (<html lang="fr"><body>{children}</body></html>);
}
