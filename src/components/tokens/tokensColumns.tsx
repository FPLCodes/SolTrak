"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Token = {
  name: string;
  mint: string;
  symbol: string;
  amount: string;
};

export const tokenColumns: ColumnDef<Token>[] = [
  {
    accessorKey: "name",
    header: "Token",
    cell: ({ row }) => {
      return <p className="text-primary">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "mint",
    header: "Mint",
    cell: ({ row }) => {
      return (
        <a
          className="text-accent hover:text-primary transition-all"
          href={`https://explorer.solana.com/address/${row.original.mint}`}
          target="_blank"
          rel="noreferrer"
        >
          {row.original.mint.substring(0, 9)}...
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
