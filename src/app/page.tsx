import WalletConnection from "../components/WalletConnection";
import Moralis from "moralis";

export default function Home() {
  return (
    <div className="px-20 py-12">
      <WalletConnection />
    </div>
  );
}
