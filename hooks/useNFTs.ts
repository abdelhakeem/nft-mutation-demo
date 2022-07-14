import { Metaplex } from "@metaplex-foundation/js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
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

  const mints = (
    await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
      programId: TOKEN_PROGRAM_ID,
    })
  ).value
    .map(({ account }) => account.data.parsed.info)
    .filter(
      (info) => info.tokenAmount.decimals === 0 && +info.tokenAmount.amount > 0
    )
    .map((info) => new PublicKey(info.mint));

  return (await metaplex.nfts().findAllByMintList(mints)).filter(
    (nft) => nft !== null && nft.updateAuthority.equals(wallet.publicKey)
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
