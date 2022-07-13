import { Nft } from "@metaplex-foundation/js";
import NFTItem from "./NFTItem";

type NFTPickerProps = {
  nfts: Nft[];
};

const NFTPicker = ({ nfts }: NFTPickerProps) => {
  return (
    <ul className="flex flex-row justify-start items-center overflow-x-scroll gap-4">
      {nfts.map((nft) => (
        <li key={nft.name}>
          <NFTItem nft={nft} />
        </li>
      ))}
    </ul>
  );
};

export default NFTPicker;
