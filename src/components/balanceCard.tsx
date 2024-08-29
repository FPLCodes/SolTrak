import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BalanceCard({ SOLBalance }: { SOLBalance: number }) {
  const [solToUsdRate, setSolToUsdRate] = useState<number>(0);

  useEffect(() => {
    // Fetch SOL to USD conversion rate from CoinGecko
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        setSolToUsdRate(data.solana.usd);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, []);

  return (
    <Card className={cn("w-[380px] card bg-primary rounded-2xl")}>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Current balance in your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-semibold text-primary">
            {SOLBalance.toFixed(2)} SOL
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${SOLBalance * solToUsdRate} USD
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
