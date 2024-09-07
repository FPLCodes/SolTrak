"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Token = {
  name: string;
  symbol: string;
  amount: string;
};

export const tokenColumns: ColumnDef<Token>[] = [
  {
    accessorKey: "name",
    header: "Token",
    cell: ({ row }) => {
      return (
        <a
          className="text-primary"
          href={`https://solscan.io/token/${row.original.symbol}`}
          target="_blank"
          rel="noreferrer"
        >
          {row.original.name}
        </a>
      );
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
