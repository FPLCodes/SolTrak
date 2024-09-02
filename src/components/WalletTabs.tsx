"use client";

import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletSearch from "@/components/WalletSearch";
import UserWallet from "@/components/UserWallet";

const WalletTabs: FC = () => {
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
        <UserWallet />
      </TabsContent>
      <TabsContent value="search">
        <WalletSearch />
      </TabsContent>
    </Tabs>
  );
};

export default WalletTabs;
