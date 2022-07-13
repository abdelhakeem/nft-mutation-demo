import { Nft } from "@metaplex-foundation/js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useState } from "react";
import NFTEditor from "../components/NFTEditor";
import NFTPicker from "../components/NFTPicker";
import Status from "../components/Status";
import useNFTs from "../hooks/useNFTs";

const Home: NextPage = () => {
  const [pickedNFT, setPickedNFT] = useState({} as Nft);
  const wallet = useAnchorWallet();
  const { data, error } = useNFTs();

  const handlePickNFT = (nft: Nft) => {
    setPickedNFT(nft);
  }

  if (!wallet) {
    return <Status type="info" msg="Please connect your wallet to proceed" />
  }

  if (error) {
    return <Status type="error" msg={error.message} />
  }

  if (!data) {
    return <Status type="info" msg="Loading NFTs..." />
  }

  return (
    <>
      <NFTPicker nfts={data} pickNFT={handlePickNFT} />
      <NFTEditor nft={pickedNFT} />
    </>
  );
};

export default Home;
