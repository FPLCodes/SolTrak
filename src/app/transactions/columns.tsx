"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  signature: string;
  slot: number;
  blockTime: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "signature",
    header: "Signature",
  },
  {
    accessorKey: "slot",
    header: "Slot",
  },
  {
    accessorKey: "blockTime",
    header: "Block Time",
  },
];
