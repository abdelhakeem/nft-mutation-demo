import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

type NavbarProps = {
  network: WalletAdapterNetwork;
  updateNetwork: Function;
};

const Navbar = ({ network, updateNetwork }: NavbarProps) => {
  return (
    <div className="bg-primary text-primary-content w-full">
      <div className="container mx-auto py-2 flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold">NFT Mutator</h1>
        <div className="flex flex-row justify-start items-center gap-2">
          <select
            className="select"
            value={network}
            onChange={(e) => updateNetwork(e.target.value)}
          >
            <option value={WalletAdapterNetwork.Devnet}>Devnet</option>
            <option value={WalletAdapterNetwork.Testnet}>Testnet</option>
            <option value={WalletAdapterNetwork.Mainnet}>Mainnet</option>
          </select>
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
