import { Nft } from "@metaplex-foundation/js";
import Image from "next/image";
import { useEffect, useState } from "react";

type NFTItemProps = {
  nft: Nft;
};

const NFTItem = ({ nft }: NFTItemProps) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (nft.metadataTask.isPending()) {
      setFetched(false);
      nft.metadataTask.onSuccess(() => setFetched(true));
      nft.metadataTask.run();
    }
  }, [nft, fetched]);

  if (!fetched) {
    return <div className="loading"></div>;
  }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="relative w-64 h-64 mx-auto">
        <Image
          src={nft.metadata.image ?? "/placeholder.svg"}
          layout="fill"
          objectFit="scale-down"
          alt="NFT"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{nft.metadata.name}</h2>
        <p>{nft.metadata.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
