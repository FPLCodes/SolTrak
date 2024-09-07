import WalletContext from "@/components/WalletContext";
import UserWallet from "@/components/UserWallet";

export default function YourWalletPage() {
  return (
    <WalletContext>
      <UserWallet />
    </WalletContext>
  );
}
