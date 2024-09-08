"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for route detection

export default function BalanceCard({ SOLBalance }: { SOLBalance: number }) {
  const [solToUsdRate, setSolToUsdRate] = useState<number>(0);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const fetchConversionRate = async () => {
      const now = new Date().getTime();

      // Check if the conversion rate is already cached and it's still valid (within the last hour)
      const cachedRate = localStorage.getItem("solToUsdRate");
      const cachedTimestamp = localStorage.getItem("solToUsdRateTimestamp");

      if (cachedRate && cachedTimestamp) {
        const oneHour = 60 * 60 * 1000; // One hour in milliseconds
        const lastFetched = parseInt(cachedTimestamp, 10);

        if (now - lastFetched < oneHour) {
          setSolToUsdRate(parseFloat(cachedRate));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        const rate = data.solana.usd;

        // Cache the conversion rate with the current timestamp
        localStorage.setItem("solToUsdRate", rate.toString());
        localStorage.setItem("solToUsdRateTimestamp", now.toString());

        setSolToUsdRate(rate);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, []);

  return (
    <Card
      className={cn(
        "min-w-[300px] min-h-[250px] lg:min-h-fit card bg-primary rounded-xl"
      )}
    >
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Current balance in your wallet</CardDescription>
        {/* Conditionally render WalletMultiButton only if on the /your-wallet page */}
        {pathname === "/your-wallet" && (
          <WalletMultiButton className="wallet-adapter-button mt-2" />
        )}
      </CardHeader>
      <CardContent className="mt-3">
        <div className="flex h-full items-center justify-between">
          <div className="text-4xl font-semibold text-primary">
            {SOLBalance.toFixed(2)} SOL
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${(SOLBalance * solToUsdRate).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
