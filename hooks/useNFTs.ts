import {
  Metaplex,
  Nft,
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
import useSWR from "swr";
import useMetaplex from "./useMetaplex";

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
  const metaplex = useMetaplex();

  return useSWR(`${connection.rpcEndpoint}/${wallet?.publicKey}/nfts`, () =>
    fetcher(connection, wallet, metaplex)
  );
};

export default useNFTs;
