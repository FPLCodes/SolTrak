import "./styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import WalletContext from "../components/WalletContext";
import WalletConnection from "@/components/WalletConnection"; // Import the navbar

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WalletContext>
            <WalletConnection />
            <main>{children}</main>
          </WalletContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
