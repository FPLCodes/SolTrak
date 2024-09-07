"use client";

import React from "react";
import WalletSearch from "@/components/WalletSearch";

const SearchWalletsPage = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Search Wallets</h1>
      <WalletSearch />
    </div>
  );
};

export default SearchWalletsPage;
