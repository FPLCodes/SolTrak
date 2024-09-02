"use client";

import { FC, useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletTabs from "./WalletTabs";

const WalletConnection: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex justify-between">
        <h1>SolTrak</h1>
        <WalletMultiButton />
      </div>
      <div className="mt-4">
        <WalletTabs />
      </div>
    </div>
  );
};

export default WalletConnection;
