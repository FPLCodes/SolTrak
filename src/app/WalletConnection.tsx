"use client";

import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "./transactions/transaction-table";

const addressSignaturesLimit = 5;
const solConversionFactor = 1e9;
const transactionBlockTimeMultiplier = 1000;

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
        {/* {publicKey && <p>Wallet Address: {publicKey.toBase58()}</p>} */}
      </div>
      <div className="mt-4">
        <BalanceCard
          SOLBalance={balance ? balance : 69}
          USDBalance={balance ? balance : 420}
        />
        <TransactionTable />
      </div>
    </div>
  );
};

export default WalletConnection;
