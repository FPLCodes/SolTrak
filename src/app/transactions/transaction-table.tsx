import { FC, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [limit, setLimit] = useState(5); // State to track the selected limit

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const transformedData = await transformTransactions(transactions);
      setData(transformedData.slice(0, limit));
    };

    fetchData();
  }, [limit, transactions]);

  return (
    <div className="my-10">
      <div className="flex space-x-3 mb-3 justify-end">
        <h1 className="self-center">Limit</h1>
        <Select onValueChange={handleLimitChange}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
