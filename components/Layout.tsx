import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactElement } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactElement;
  network: WalletAdapterNetwork;
  updateNetwork: Function;
};

const Layout = ({ children, network, updateNetwork }: LayoutProps) => {
  return (
    <WalletModalProvider>
      <Navbar network={network} updateNetwork={updateNetwork} />
      <div className="container mx-auto my-8">{children}</div>
    </WalletModalProvider>
  );
};

export default Layout;
