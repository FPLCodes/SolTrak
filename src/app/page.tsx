import WalletConnection from "./WalletConnection";

export default function Home() {
  return (
    <div className="px-20 py-12">
      <h1>SolTrak</h1>
      <WalletConnection />
    </div>
  );
}
