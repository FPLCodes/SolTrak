import "./globals.css";
import WalletContext from "./WalletContext";

export const metadata = {
  title: "Solana Wallet App",
  description: "View and manage your Solana assets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContext>{children}</WalletContext>
      </body>
    </html>
  );
}
