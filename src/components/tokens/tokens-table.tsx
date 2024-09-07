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
    mint: token.mint,
    symbol: token.symbol,
    amount: token.amount,
  }));

  return <DataTable columns={tokenColumns} data={data} />;
};

export default TokensTable;
