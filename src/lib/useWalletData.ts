import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const addressSignaturesLimit = 20;
const solConversionFactor = 1e9;

const useWalletData = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);

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

          // Fetch NFTs using Metaplex
          const metaplex = Metaplex.make(connection).use(
            walletAdapterIdentity({ publicKey })
          );

          const nftList = await metaplex.nfts().findAllByOwner({
            owner: publicKey, // The correct way to pass the owner
          });

          setNfts(nftList);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    };

    fetchWalletData();
  }, [publicKey, connection]);

  return { balance, transactions, tokens, nfts };
};

export default useWalletData;
