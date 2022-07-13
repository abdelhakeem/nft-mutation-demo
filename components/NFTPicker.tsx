import { Nft } from "@metaplex-foundation/js";
import { useState } from "react";
import NFTItem from "./NFTItem";

type NFTPickerProps = {
  nfts: Nft[];
  pickNFT: Function;
};

const NFTPicker = ({ nfts, pickNFT }: NFTPickerProps) => {
  const [pickedNFT, setPickedNFT] = useState({} as Nft);

  const handlePickNFT = (nft: Nft) => {
    setPickedNFT(nft);
    pickNFT(nft);
  };

  return (
    <ul className="flex flex-row justify-start items-center overflow-x-scroll gap-4">
      {nfts.map((nft) => (
        <li
          key={nft.name}
          className={pickedNFT.name === nft.name ? "opacity-50" : ""}
        >
          <NFTItem nft={nft} pickNFT={handlePickNFT} />
        </li>
      ))}
    </ul>
  );
};

export default NFTPicker;
