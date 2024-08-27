import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Inter as FontSans } from "next/font/google";
import WalletContext from "./WalletContext";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <WalletContext>{children}</WalletContext>
      </body>
    </html>
  );
}
