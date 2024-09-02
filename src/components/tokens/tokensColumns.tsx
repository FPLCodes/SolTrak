"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Token = {
  associatedTokenAddress: string;
  mint: string;
  amount: string;
  decimals: string;
  name: string;
  symbol: string;
};

export const tokenColumns: ColumnDef<Token>[] = [
  {
    accessorKey: "name",
    header: "Token",
    cell: ({ row }) => {
      return <span className="text-primary">{row.original.name}</span>;
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
