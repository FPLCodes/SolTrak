import React from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "@/components/transactions/transaction-table";
import useWalletData from "@/lib/useWalletData";

const UserWallet = () => {
  const { balance, transactions, tokens, nfts } = useWalletData();

  return (
    <div className="mx-auto">
      <BalanceCard SOLBalance={balance == null ? 0 : balance} />
      <TransactionTable transactions={transactions} address="" />
      <div>
        <h2>Tokens</h2>
        <ul>
          {tokens.map((token) => (
            <li key={token.mint}>
              {token.amount} {token.mint}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>NFTs</h2>
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
