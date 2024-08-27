import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

export default function BalanceCard({
  SOLBalance,
  USDBalance,
}: {
  SOLBalance: number;
  USDBalance: number;
}) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Current balance in your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-semibold">
            {SOLBalance.toFixed(2)} SOL
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${USDBalance.toFixed(2)} USD
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
