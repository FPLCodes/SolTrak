"use client";

import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "./transactions/transaction-table";
import WalletSearch from "./WalletSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const addressSignaturesLimit = 5;
const solConversionFactor = 1e9;

const WalletConnection: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBalanceAndTransactions = async () => {
      if (publicKey) {
        // Fetch wallet balance
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / solConversionFactor); // Convert Lamports to SOL

        // Fetch recent transaction signatures using the updated method
        const signatures = await connection.getSignaturesForAddress(publicKey, {
          limit: addressSignaturesLimit,
        });

        // Fetch details for each transaction
        const transactionDetailsPromises = signatures.map(
          async (signatureInfo) => {
            const transaction = await connection.getTransaction(
              signatureInfo.signature
            );
            return transaction;
          }
        );

        const transactions = await Promise.all(transactionDetailsPromises);
        console.log(transactions);
        setTransactions(transactions);
      }
    };

    fetchBalanceAndTransactions();
  }, [publicKey, connection]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex justify-between">
        <h1>SolTrak</h1>
        <WalletMultiButton />
      </div>
      <div className="mt-4">
        <Tabs defaultValue="wallet">
          <TabsList className="bg-transparent flex w-full justify-evenly mb-6">
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-accent-foreground text-xl"
            >
              Wallet
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-accent-foreground text-xl"
            >
              Search Wallet
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wallet">
            <div>
              <BalanceCard
                SOLBalance={balance ? balance : 69}
                USDBalance={balance ? balance : 420}
              />
              <div className="mt-3">
                <TransactionTable transactions={transactions} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search">
            <WalletSearch />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WalletConnection;
