"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  time: string;
  amountSol: number;
  amountUsd: number;
  signature: string;
  status: string;
  type: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.type === "Sent"
              ? "bg-accent text-accent-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {row.original.type}
        </span>
      );
    },
  },
  {
    accessorKey: "amountSol",
    header: "Amount (SOL)",
    cell: ({ row }) => {
      return `${row.original.amountSol.toFixed(5)}`;
    },
  },
  {
    accessorKey: "amountUsd",
    header: "Txn USD Value",
    cell: ({ row }) => {
      return `$${row.original.amountUsd.toFixed(2)}`;
    },
  },
  {
    accessorKey: "signature",
    header: "Signature",
    cell: ({ row }) => {
      return (
        <a
          href={`https://explorer.solana.com/tx/${row.original.signature}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary text-accent transition-all"
        >
          {row.original.signature.substring(0, 5)}...
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "Success"
              ? "bg-green-600 text-green-50"
              : "bg-red-600 text-red-50"
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
];
