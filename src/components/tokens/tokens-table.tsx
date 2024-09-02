"use client";

import { FC } from "react";
import { DataTable } from "./data-table";
import { tokenColumns } from "./tokensColumns";

interface TokensTableProps {
  tokens: {
    associatedTokenAddress: string;
    mint: string;
    amount: string;
    decimals: string;
    name: string;
    symbol: string;
  }[];
}

const TokensTable: FC<TokensTableProps> = ({ tokens }) => {
  return (
    <div className="mt-8">
      <h2 className="text-sm text-muted-foreground mb-2">Tokens</h2>
      <DataTable columns={tokenColumns} data={tokens} />
    </div>
  );
};

export default TokensTable;
