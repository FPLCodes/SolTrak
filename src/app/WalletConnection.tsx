"use client";

import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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
        setBalance(balance / 1e9); // Convert Lamports to SOL

        // Fetch recent transaction signatures using the updated method
        const signatures = await connection.getSignaturesForAddress(publicKey, {
          limit: 5,
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
    <div>
      <WalletMultiButton />
      {publicKey && (
        <div>
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : "Fetching..."}</p>
          <h3>Recent Transactions:</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <p>Signature: {transaction?.transaction.signatures[0]}</p>
                <p>Slot: {transaction?.slot}</p>
                <p>
                  Block Time:{" "}
                  {transaction?.blockTime
                    ? new Date(transaction.blockTime * 1000).toLocaleString()
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
