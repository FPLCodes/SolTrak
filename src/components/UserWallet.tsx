import React from "react";
import BalanceCard from "@/components/balanceCard";
import TransactionTable from "@/components/transactions/transaction-table";
import useWalletData from "@/lib/useWalletData";

const UserWallet = () => {
  const { balance, transactions } = useWalletData();

  return (
    <div className="mx-auto">
      <BalanceCard SOLBalance={balance == null ? 0 : balance} />
      <TransactionTable transactions={transactions} address="" />
    </div>
  );
};

export default UserWallet;
