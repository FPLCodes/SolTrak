"use client";

import React, { useEffect, useState } from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "@/components/transactions/transaction-table";
import useWalletData from "@/lib/useWalletData";
import { useWallet } from "@solana/wallet-adapter-react";
import TokensTable from "./tokens/tokens-table";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Helper function to calculate historical balances
const calculateHistoricalBalances = (
  transactions: any[],
  currentBalance: number,
  solConversionFactor: number
) => {
  const balanceHistory: { time: string; balance: number }[] = [];
  let runningBalance = currentBalance;

  const sortedTransactions = transactions
    .filter((tx) => tx !== null)
    .sort((a, b) => b.blockTime - a.blockTime); // Sort descending (newest to oldest)

  sortedTransactions.forEach((transaction) => {
    const { meta, blockTime } = transaction;
    const preBalance = meta.preBalances[0] / solConversionFactor;
    const postBalance = meta.postBalances[0] / solConversionFactor;

    const balanceChange = postBalance - preBalance;

    runningBalance -= balanceChange;
    balanceHistory.push({
      time: new Date(blockTime * 1000).toISOString(),
      balance: runningBalance,
    });
  });

  return balanceHistory.reverse();
};

const solConversionFactor = 1e9;

const UserWallet = () => {
  const { publicKey } = useWallet();
  const { balance, transactions, tokens, nfts } = useWalletData();
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    if (transactions && balance !== null) {
      const historicalBalances = calculateHistoricalBalances(
        transactions,
        balance,
        solConversionFactor
      );
      setHistoricalData(historicalBalances);
    }
  }, [transactions, balance]);

  // If the user has not connected their wallet, display a message.
  if (!publicKey) {
    return (
      <div className="text-center mt-28 text-2xl mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-2/3 my-8">
        <h2 className="mt-2">Connect your wallet to view your details</h2>
        <p className="text-sm text-muted mt-4">
          Press the Select Wallet button on the top right to connect
        </p>
      </div>
    );
  }

  // If the wallet is connected, display the wallet data.
  return (
    <div className="mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-2/3 my-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="sm:flex lg:flex-col lg:space-y-4 sm:space-x-4 lg:space-x-0">
          <BalanceCard SOLBalance={balance == null ? 0 : balance} />
          <PieChart tokens={tokens} />
        </div>

        {historicalData.length > 0 ? (
          <Card className="w-full mt-4 lg:mt-0">
            <CardHeader>
              <CardTitle>Balance Over Time</CardTitle>
              <CardDescription>Balance of the wallet over time</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-full w-full">
              <LineChart data={historicalData} />
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full mt-4 lg:mt-0">
            <CardHeader>
              <CardTitle>Balance Over Time</CardTitle>
              <CardDescription>No historical data available</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full h-full">
              <Image
                src="/no-data-illustration.png"
                alt="No historical data available"
                width={450}
                height={450}
              />
              <p className="text-muted mt-4 text-sm">
                No historical data available for this wallet
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-4">
        <TransactionTable
          transactions={transactions}
          address={publicKey.toString()}
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <TokensTable tokens={tokens} />
      </div>
    </div>
  );
};

export default UserWallet;
