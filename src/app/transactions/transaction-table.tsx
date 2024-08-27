import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";

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
  ];
}

export default function TransactionTable() {
  const data = getData();

  return (
    <div className="py-10">
      <h3>Recent Transactions</h3>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
