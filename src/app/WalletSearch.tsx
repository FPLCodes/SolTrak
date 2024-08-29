import { PublicKey, Connection } from "@solana/web3.js";
import { useState, useEffect } from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "./transactions/transaction-table";
import { SearchIcon } from "lucide-react";

const solConversionFactor = 1e9;

// Replace <API KEY> with your actual Alchemy API key
const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/Gm-xaejXqLMg4DNz5NaM1_B6Q81Db5SV"
);

const WalletSearch = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const publicKey = new PublicKey(address.trim());
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / solConversionFactor);

      // Fetch recent transaction signatures
      const signatures = await connection.getSignaturesForAddress(publicKey, {
        limit: 5,
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
    } catch (err) {
      setError("Invalid address or unable to fetch data.");
      console.error("Error in fetchBalance:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between mt-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="border-border p-2 w-full mr-4 ring-ring"
        />
        <button
          onClick={() => fetchBalance()}
          className="button rounded-lg px-2"
        >
          <SearchIcon />
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {balance !== null && (
        <div className="mt-4">
          <BalanceCard SOLBalance={balance} />
          <div className="mt-3">
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSearch;
