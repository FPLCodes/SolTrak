import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const addressSignaturesLimit = 20;
const solConversionFactor = 1e9;

const useWalletData = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    const fetchWalletData = async () => {
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

          // Fetch token accounts
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            {
              programId: TOKEN_PROGRAM_ID,
            }
          );

          const tokenDetails = tokenAccounts.value.map((accountInfo) => {
            const accountData = accountInfo.account.data.parsed.info;
            return {
              mint: accountData.mint,
              amount: accountData.tokenAmount.uiAmount,
            };
          });
          setTokens(tokenDetails);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    };

    fetchWalletData();
  }, [publicKey, connection]);

  return { balance, transactions, tokens };
};

export default useWalletData;
