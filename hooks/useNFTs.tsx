import {
  bundlrStorage,
  Metaplex,
  Nft,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import {
  Key,
  Metadata,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import bs58 from "bs58";
import { useMemo } from "react";
import useSWR from "swr";

const fetcher = async (
  connection: Connection,
  wallet: AnchorWallet | undefined,
  metaplex: Metaplex | undefined
) => {
  if (!wallet || !metaplex) {
    return undefined;
  }

  return (
    await connection.getProgramAccounts(PROGRAM_ID, {
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: bs58.encode(Buffer.from([Key.MetadataV1])),
          },
        },
        {
          memcmp: {
            offset: 1,
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ],
    })
  ).map(
    ({ account, pubkey }) =>
      new Nft(
        {
          ...account,
          publicKey: pubkey,
          data: Metadata.deserialize(account.data)[0],
        },
        metaplex
      )
  );
};

const useNFTs = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const metaplex = useMemo(
    () =>
      wallet
        ? Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet))
            .use(
              bundlrStorage({
                address: "https://devnet.bundlr.network",
              })
            )
        : undefined,
    [connection, wallet]
  );

  return useSWR(`${wallet?.publicKey}/nfts`, () =>
    fetcher(connection, wallet, metaplex)
  );
};

export default useNFTs;
