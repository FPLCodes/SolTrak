import { FC, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

interface TransactionTableProps {
  transactions: any[];
}

const priceCache: { [key: string]: number } = {}; // Cache for historical prices

const getHistoricalPrice = async (date: string) => {
  if (priceCache[date]) {
    return priceCache[date];
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/solana/history?date=${date}`
    );
    const data = await response.json();
    const price = data.market_data.current_price.usd;
    priceCache[date] = price;
    return price;
  } catch (error) {
    console.error("Error fetching historical price:", error);
    return null;
  }
};

const solConversionFactor = 1e9;
const timeConversionFactor = 1000;

const transformTransactions = async (transactions: any[]) => {
  const transformedTransactions = await Promise.all(
    transactions.map(async (tx) => {
      // Format date to DD-MM-YYYY
      const date = new Date(tx.blockTime * timeConversionFactor);
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      // Calculate amount in SOL and USD
      const preBalance = tx.meta.preBalances[0];
      const postBalance = tx.meta.postBalances[0];
      const amountSol = (preBalance - postBalance) / solConversionFactor;
      const amountUsd = (await getHistoricalPrice(formattedDate)) * amountSol;

      // Determine transaction type
      const isSender = preBalance > postBalance;
      const transactionType = isSender ? "Sent" : "Received";

      return {
        time: date.toLocaleString(),
        amountSol: amountSol,
        amountUsd: amountUsd,
        signature: tx.transaction.signatures[0],
        status: tx.meta.err === null ? "Success" : "Failed",
        type: transactionType,
      };
    })
  );

  return transformedTransactions;
};

const TransactionTable: FC<TransactionTableProps> = ({ transactions }) => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState(5); // State to track the selected limit
  const [statusFilter, setStatusFilter] = useState<string>("All"); // State for status filter
  const [typeFilter, setTypeFilter] = useState<string>("All"); // State for type filter

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const transformedData = await transformTransactions(transactions);

      const filteredData = transformedData.filter(
        (tx) =>
          (statusFilter === "All" ? true : tx.status === statusFilter) &&
          (typeFilter === "All" ? true : tx.type === typeFilter)
      );

      // Apply limit after filtering
      const limitedData = filteredData.slice(0, limit);
      setData(limitedData);
    };

    fetchData();
  }, [limit, statusFilter, typeFilter, transactions]);

  return (
    <div>
      <div className="flex space-x-3 mb-3 justify-end">
        <h1 className="self-center">Limit</h1>
        <Select onValueChange={handleLimitChange}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <h1 className="self-center">Type</h1>
        <Select onValueChange={handleTypeFilterChange}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder={typeFilter} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <h1 className="self-center">Status</h1>
        <Select onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder={statusFilter} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
