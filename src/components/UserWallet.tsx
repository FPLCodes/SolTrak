import React from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "@/components/transactions/transaction-table";
import useWalletData from "@/lib/useWalletData";
import { useWallet } from "@solana/wallet-adapter-react";

const UserWallet = () => {
  const { publicKey } = useWallet();
  const { balance, transactions, tokens, nfts } = useWalletData();

  // If the user has not connected their wallet, display a message.
  if (!publicKey) {
    return (
      <div className="text-center mt-28 text-2xl">
        <h2>Please connect your wallet to view your details.</h2>
      </div>
    );
  }

  // If the wallet is connected, display the wallet data.
  return (
    <div className="mx-auto">
      <BalanceCard SOLBalance={balance == null ? 0 : balance} />
      <TransactionTable transactions={transactions} address="" />
      <div className="mt-4">
        <h2 className="text-xl font-bold">Tokens</h2>
        <ul>
          {tokens.map((token) => (
            <li key={token.mint}>
              {token.amount} {token.mint}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">NFTs</h2>
        <ul>
          {nfts.map((nft) => (
            <li key={nft.mintAddress.toBase58()}>{nft.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserWallet;
