"use client";

import { FC } from "react";
import { DataTable } from "./data-table";
import { tokenColumns } from "./tokensColumns";

interface TokensTableProps {
  tokens: any[];
}

const TokensTable: FC<TokensTableProps> = ({ tokens }) => {
  const data = tokens.map((token) => ({
    name: token.name,
    symbol: token.symbol,
    amount: token.amount,
  }));

  return (
    <div>
      <h1 className="text-sm mb-3 text-muted-foreground">Token Holdings</h1>
      <DataTable columns={tokenColumns} data={data} />
    </div>
  );
};

export default TokensTable;
