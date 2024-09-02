"use client";

import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "./transactions/transaction-table";
import WalletSearch from "./WalletSearch";

interface WalletTabsProps {
  balance: number | null;
  transactions: any[];
}

const WalletTabs: FC<WalletTabsProps> = ({ balance, transactions }) => {
  return (
    <Tabs defaultValue="wallet">
      <TabsList className="bg-transparent flex w-full justify-evenly mb-6">
        <TabsTrigger
          value="wallet"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-accent-foreground text-xl hover:bg-accent border border-border rounded-lg"
        >
          Wallet
        </TabsTrigger>
        <TabsTrigger
          value="search"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-accent-foreground text-xl hover:bg-accent border border-border rounded-lg"
        >
          Search Wallet
        </TabsTrigger>
      </TabsList>
      <TabsContent value="wallet">
        <div>
          <BalanceCard SOLBalance={balance ? balance : 69} />
          <div className="mt-3">
            <TransactionTable transactions={transactions} address="" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="search">
        <WalletSearch />
      </TabsContent>
    </Tabs>
  );
};

export default WalletTabs;
