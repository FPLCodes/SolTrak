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
import { useWallet } from "@solana/wallet-adapter-react";

interface TransactionTableProps {
  transactions: any[];
  address: string;
}

const solConversionFactor = 1e9;
const timeConversionFactor = 1000;

const transformTransactions = async (
  transactions: any[],
  publicKey: PublicKey
) => {
  const transformedTransactions = await Promise.all(
    transactions.map(async (tx) => {
      const date = new Date(tx.blockTime * timeConversionFactor);

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
        return null;
      }

      const preBalance = tx.meta.preBalances[accountIndex];
      const postBalance = tx.meta.postBalances[accountIndex];
      const balanceChangeSol = (postBalance - preBalance) / solConversionFactor;

      return {
        time: date.toLocaleString(),
        amountSol:
          balanceChangeSol > 0
            ? `+${balanceChangeSol.toFixed(9)}`
            : balanceChangeSol.toFixed(9),
        signature: tx.transaction.signatures[0],
        status: tx.meta.err === null ? "Success" : "Failed",
      };
    })
  );

  return transformedTransactions.filter((tx) => tx !== null);
};

const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
  address,
}) => {
  const { publicKey } = useWallet();
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState(5);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let key: PublicKey;

      if (address.trim() === "" && publicKey) {
        key = publicKey;
      } else if (address.trim() !== "") {
        key = new PublicKey(address);
      } else {
        console.error("No public key provided or found.");
        return;
      }

      const transformedData = await transformTransactions(transactions, key);

      const filteredData = transformedData.filter((tx) =>
        statusFilter === "All" ? true : tx.status === statusFilter
      );

      const limitedData = filteredData.slice(0, limit);
      setData(limitedData);
    };

    fetchData();
  }, [limit, statusFilter, transactions, publicKey]);

  return (
    <div>
      <div className="flex justify-between items-end">
        <h1 className="text-sm mb-3 text-muted-foreground">Transactions</h1>
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
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
