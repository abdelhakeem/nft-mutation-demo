import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  bundlrStorage,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useMemo } from "react";

const useMetaplex = () => {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  return useMemo(
    () =>
      wallet
        ? Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet.adapter))
            .use(
              bundlrStorage({
                address: "https://devnet.bundlr.network",
              })
            )
        : undefined,
    [connection, wallet]
  );
};

export default useMetaplex;
