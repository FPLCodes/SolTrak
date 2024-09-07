import React from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "@/components/transactions/transaction-table";
import useWalletData from "@/lib/useWalletData";
import { useWallet } from "@solana/wallet-adapter-react";
import TokensTable from "./tokens/tokens-table";

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
        <TokensTable tokens={tokens} />
      </div>
    </div>
  );
};

export default UserWallet;
