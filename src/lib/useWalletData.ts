import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const addressSignaturesLimit = 5;
const solConversionFactor = 1e9;

const useWalletData = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchBalanceAndTransactions = async () => {
      if (publicKey) {
        try {
          // Fetch wallet balance
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / solConversionFactor); // Convert Lamports to SOL

          // Fetch recent transaction signatures
          const signatures = await connection.getSignaturesForAddress(
            publicKey,
            {
              limit: addressSignaturesLimit,
            }
          );

          // Fetch details for each transaction
          const transactionDetailsPromises = signatures.map(
            async (signatureInfo) => {
              const transaction = await connection.getTransaction(
                signatureInfo.signature,
                {
                  maxSupportedTransactionVersion: 2,
                }
              );
              return transaction;
            }
          );

          const transactions = await Promise.all(transactionDetailsPromises);
          setTransactions(transactions);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    };

    fetchBalanceAndTransactions();
  }, [publicKey, connection]);

  return { balance, transactions };
};

export default useWalletData;
