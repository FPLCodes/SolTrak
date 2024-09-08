"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const WalletConnection: FC = () => {
  const [mounted, setMounted] = useState(false);

  // Track mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component is not mounted yet, don't render anything
  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky py-2 top-0 z-50 w-full border-b border-border/40 bg-card shadow-lg">
      <div className="container flex h-14 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/SolTrak.png"
              alt="SolTrak Logo"
              width={32}
              height={32}
            />
            <span className="font-bold">SolTrak</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/your-wallet">Your Wallet</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/search-wallets">Search Wallets</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default WalletConnection;
