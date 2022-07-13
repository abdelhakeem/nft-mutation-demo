import { useAnchorWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import NFTPicker from "../components/NFTPicker";
import Status from "../components/Status";
import useNFTs from "../hooks/useNFTs";

const Home: NextPage = () => {
  const wallet = useAnchorWallet();
  const { data, error } = useNFTs();

  if (!wallet) {
    return <Status type="info" msg="Please connect your wallet to proceed" />
  }

  if (error) {
    return <Status type="error" msg={error.message} />
  }

  if (!data) {
    return <Status type="info" msg="Loading NFTs..." />
  }

  return <NFTPicker nfts={data} />
};

export default Home;
