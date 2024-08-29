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
import { SelectLabel } from "@radix-ui/react-select";

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
  const [typeFilter, setTypeFilter] = useState<string>("All"); // State for type filter
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transformedData = await transformTransactions(transactions);

      const filteredData = transformedData.filter((tx) =>
        typeFilter === "All" ? true : tx.status === typeFilter
      );

      setData(filteredData.slice(0, limit));
      setLoading(false);
    };

    fetchData();
  }, [limit, typeFilter, transactions]);

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
          <SelectTrigger className="w-24">
            <SelectValue placeholder={typeFilter} />
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default TransactionTable;
