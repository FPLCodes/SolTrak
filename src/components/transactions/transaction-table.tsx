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
import { PublicKey } from "@solana/web3.js";

interface TransactionTableProps {
  transactions: any[];
  address: string;
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

const transformTransactions = async (
  transactions: any[],
  publicKey: PublicKey
) => {
  const transformedTransactions = await Promise.all(
    transactions.map(async (tx) => {
      console.log(tx);
      // Format date to DD-MM-YYYY
      const date = new Date(tx.blockTime * timeConversionFactor);
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      // Find the account index that matches the user's public key
      const accountIndex = tx.transaction.message.staticAccountKeys.findIndex(
        (key: string) => {
          try {
            return new PublicKey(key).equals(publicKey);
          } catch (error) {
            console.error(`Invalid public key: ${key}`, error);
            return false;
          }
        }
      );

      if (accountIndex === -1) {
        // If the user's public key is not involved in this transaction, skip it
        return null;
      }

      // Calculate the difference in balance for the user's account
      const preBalance = tx.meta.preBalances[accountIndex];
      const postBalance = tx.meta.postBalances[accountIndex];
      const balanceChangeSol = (postBalance - preBalance) / solConversionFactor;

      const amountUsd =
        (await getHistoricalPrice(formattedDate)) * Math.abs(balanceChangeSol);

      return {
        time: date.toLocaleString(),
        amountSol: balanceChangeSol,
        amountUsd: balanceChangeSol > 0 ? `+${amountUsd}` : `-${amountUsd}`,
        signature: tx.transaction.signatures[0],
        status: tx.meta.err === null ? "Success" : "Failed",
      };
    })
  );

  return transformedTransactions.filter((tx) => tx !== null); // Filter out any null transactions
};

const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
  address,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState(5); // State to track the selected limit
  const [statusFilter, setStatusFilter] = useState<string>("All"); // State for status filter

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const publicKey = new PublicKey(address.trim());

      const transformedData = await transformTransactions(
        transactions,
        publicKey
      );

      const filteredData = transformedData.filter((tx) =>
        statusFilter === "All" ? true : tx.status === statusFilter
      );

      // Apply limit after filtering
      const limitedData = filteredData.slice(0, limit);
      setData(limitedData);
    };

    fetchData();
  }, [address, limit, statusFilter, transactions]);

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
