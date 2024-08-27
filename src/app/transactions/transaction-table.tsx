"use client";

import { useState } from "react";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";

const transactionBlockTimeMultiplier = 1000;

function getData(): Transaction[] {
  return [
    {
      signature: "5Fxd3WLVU8PVKmHx1Gtrb6BqBjeVaxuWrfNSd7XwKdsG",
      slot: 12345678,
      blockTime: new Date(
        169300800 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "2xJrgK3F8M5q2jq5Tf2DSndUF2jHwXcYsPZHp4hTHdVm",
      slot: 12345679,
      blockTime: new Date(
        169301160 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "3ZyVoLb7FPqr7xn8SsFyEGdHVw2k9RbUdCrdC3kFAx3B",
      slot: 12345680,
      blockTime: new Date(
        169301520 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "7fFaGjVfP2q4asXcSsLPLgJnD9BRp2gTwDjyUQWg8VYm",
      slot: 12345681,
      blockTime: new Date(
        169301880 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "9aErvSBFpPZk4bRzDdf6L6R6FpVb8hXk8zJbZMLa1kXm",
      slot: 12345682,
      blockTime: new Date(
        169302240 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "4Fxd3WLVU8PVKmHx1Gtrb6BqBjeVaxuWrfNSd7XwKdsG",
      slot: 12345683,
      blockTime: new Date(
        169302600 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "1xJrgK3F8M5q2jq5Tf2DSndUF2jHwXcYsPZHp4hTHdVm",
      slot: 12345684,
      blockTime: new Date(
        169302960 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "2ZyVoLb7FPqr7xn8SsFyEGdHVw2k9RbUdCrdC3kFAx3B",
      slot: 12345685,
      blockTime: new Date(
        169303320 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "6fFaGjVfP2q4asXcSsLPLgJnD9BRp2gTwDjyUQWg8VYm",
      slot: 12345686,
      blockTime: new Date(
        169303680 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
    {
      signature: "8aErvSBFpPZk4bRzDdf6L6R6FpVb8hXk8zJbZMLa1kXm",
      slot: 12345687,
      blockTime: new Date(
        169304040 * transactionBlockTimeMultiplier
      ).toLocaleString(),
    },
  ];
}

export default function TransactionTable() {
  const [limit, setLimit] = useState(5); // State to track the selected limit
  const data = getData().slice(0, limit); // Slice data based on the selected limit

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value)); // Update the limit based on user selection
  };

  return (
    <div>
      <Select onValueChange={handleLimitChange}>
        <div className="flex space-x-3 mb-3 justify-end">
          <h1 className="self-center">Limit</h1>
          <SelectTrigger className="w-16">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
