import { FC, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface TransactionTableProps {
  transactions: any[];
}

const getHistoricalPrice = async (date: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/solana/history?date=${date}`
    );
    const data = await response.json();
    return data.market_data.current_price.usd;
  } catch (error) {
    console.error("Error fetching historical price:", error);
    return null;
  }
};

const transformTransactions = async (transactions: any[]) => {
  const transformedTransactions = await Promise.all(
    transactions.map(async (tx) => {
      const date = new Date(tx.blockTime * 1000);
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      const amountSol =
        (tx.meta.preBalances[0] - tx.meta.postBalances[0]) / 1e9;
      const amountUsd = (await getHistoricalPrice(formattedDate)) * amountSol;

      return {
        time: date.toLocaleString(),
        amountSol: amountSol,
        amountUsd: amountUsd,
        signature: tx.transaction.signatures[0],
        status: tx.meta.err === null ? "Success" : "Failed",
      };
    })
  );

  return transformedTransactions;
};

const TransactionTable: FC<TransactionTableProps> = ({ transactions }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const transformedData = await transformTransactions(transactions);
      setData(transformedData);
    };

    fetchData();
  }, [transactions]);

  return <DataTable columns={columns} data={data} />;
};

export default TransactionTable;
