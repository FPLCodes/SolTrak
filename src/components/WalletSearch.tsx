import { PublicKey, Connection } from "@solana/web3.js";
import { useState } from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "./transactions/transaction-table";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Moralis from "moralis";
import TokensTable from "./tokens/tokens-table";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const solConversionFactor = 1e9;

const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/" +
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

Moralis.start({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
});

const WalletSearch = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [historicalData, setHistoricalData] = useState<any[]>([]); // State for historical balance data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWalletData = async () => {
    setLoading(true);
    setError(null);

    // Fetch portfolio data
    try {
      const response = await Moralis.SolApi.account.getSPL({
        network: "mainnet",
        address,
      });

      const data = response.toJSON();
      setTokens(data);
    } catch (err) {
      setError("Invalid address or unable to fetch data.");
      console.error("Error in fetchWalletData:", err);
    }

    // Fetch transaction and balance history
    try {
      const publicKey = new PublicKey(address.trim());

      // Fetch SOL balance
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / solConversionFactor);

      // Fetch recent transaction signatures
      const signatures = await connection.getSignaturesForAddress(publicKey, {
        limit: 30,
      });

      const transactionDetailsPromises = signatures.map(
        async (signatureInfo) => {
          const transaction = await connection.getTransaction(
            signatureInfo.signature,
            { maxSupportedTransactionVersion: 2 }
          );
          return transaction;
        }
      );

      const transactions = await Promise.all(transactionDetailsPromises);
      setTransactions(transactions);

      // Calculate historical balance based on transactions
      const historicalBalances = calculateHistoricalBalances(
        transactions,
        balance / solConversionFactor
      );
      setHistoricalData(historicalBalances); // Set the historical data for chart
    } catch (err) {
      setError("Invalid address or unable to fetch data.");
      console.error("Error in fetchBalance:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate historical balances
  const calculateHistoricalBalances = (
    transactions: any[],
    currentBalance: number
  ) => {
    const balanceHistory: {
      time: string; // Convert blockTime to human-readable date
      balance: number;
    }[] = [];
    let runningBalance = currentBalance;

    // Sort transactions by block time
    const sortedTransactions = transactions
      .filter((tx) => tx !== null)
      .sort((a, b) => b.blockTime - a.blockTime); // Sort descending (newest to oldest)

    // Calculate balance changes
    sortedTransactions.forEach((transaction) => {
      const { meta, blockTime } = transaction;

      const preBalance = meta.preBalances[0] / solConversionFactor;
      const postBalance = meta.postBalances[0] / solConversionFactor;

      const balanceChange = postBalance - preBalance;

      // Save balance at each block time
      runningBalance -= balanceChange;
      balanceHistory.push({
        time: new Date(blockTime * 1000).toISOString(), // Convert blockTime to human-readable date
        balance: runningBalance,
      });
    });

    return balanceHistory.reverse(); // Return in chronological order
  };

  return (
    <div className="mx-auto w-11/12 md:w-3/4 lg:w-2/3 my-8">
      <div className="flex justify-between mt-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="p-2 w-full mr-4 rounded-md border border-input bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <button
          onClick={() => fetchWalletData()}
          className="button rounded-lg px-2"
        >
          <SearchIcon />
        </button>
      </div>

      {!loading && !error && balance == null && (
        <p className="mt-24 text-2xl text-muted text-center">
          Enter a wallet address to get started
        </p>
      )}
      {error && !loading && balance == null && (
        <p className="text-red-500 mt-24 text-2xl text-center">{error}</p>
      )}
      {loading ? (
        <div className="mt-4">
          <Skeleton className="w-[380px] h-[180px] rounded-lg"></Skeleton>
          <div className="mt-12 flex flex-col w-full">
            <Skeleton className="w-24 h-10 self-end"></Skeleton>
            <Skeleton className="w-full h-10 mt-2"></Skeleton>
            <Skeleton className="w-full h-10 mt-1"></Skeleton>
            <Skeleton className="w-full h-10 mt-1"></Skeleton>
            <Skeleton className="w-full h-10 mt-1"></Skeleton>
          </div>
        </div>
      ) : (
        balance !== null &&
        tokens !== null && (
          <div className="mt-4 w-full">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-4">
                <BalanceCard SOLBalance={balance} />
                <PieChart tokens={tokens} />
              </div>
              {historicalData.length > 0 && (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Balance Over Time</CardTitle>
                    <CardDescription>
                      Balance of the wallet over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex w-full mt-6">
                    <LineChart data={historicalData} />
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="mt-4">
              <TransactionTable transactions={transactions} address={address} />
            </div>
            <div className="flex space-x-4 mt-4">
              {tokens.length > 0 && <TokensTable tokens={tokens} />}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WalletSearch;
