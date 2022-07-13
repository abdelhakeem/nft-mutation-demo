import { JsonMetadata, Nft } from "@metaplex-foundation/js";
import { FormEvent, useEffect, useState } from "react";
import useMetaplex from "../hooks/useMetaplex";
import Status, { StatusType } from "./Status";

type NFTEditorProps = {
  nft: Nft;
};

const NFTEditor = ({ nft }: NFTEditorProps) => {
  const [metadata, setMetadata] = useState({} as JsonMetadata);
  const [status, setStatus] = useState("idle" as "idle" | StatusType);
  const [msg, setMsg] = useState("");
  const metaplex = useMetaplex();

  useEffect(() => {
    setMetadata(nft.metadata);
  }, [nft]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!metaplex) {
      setStatus("info");
      setMsg("Please connect your wallet to proceed");
      return;
    }

    try {
      setStatus("info");

      setMsg("Uploading metadata...");
      const { uri } = await metaplex.nfts().uploadMetadata(metadata);

      setMsg("Updating NFT...");
      await metaplex.nfts().update(nft, { uri });

      setStatus("success");
      setMsg("Successfully updated NFT metadata!");
    } catch (error: any) {
      setStatus("error")
      setMsg(`Failed to update NFT metadata: ${error.message}`);
    }
  };

  if (!metadata) {
    return <Status type="info" msg="Downloading metadata..." />
  }

  return (
    <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
      {status !== 'idle' ? <Status type={status} msg={msg} /> : null}
      {Object.entries(metadata)
        .filter(([key, value]) => key !== "image" && typeof value === "string")
        .map(([key, value]) => (
          <div key={key} className="form-control">
            <label className="label">{key}</label>
            <input
              type="text"
              className="input input-bordered"
              value={value as string}
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  [key]: e.target.value,
                })
              }
            />
          </div>
        ))}
      <button className="btn btn-primary my-2">Mutate</button>
    </form>
  );
};

export default NFTEditor;
