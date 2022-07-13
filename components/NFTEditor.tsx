import { JsonMetadata, Nft } from "@metaplex-foundation/js";
import { FormEvent, useEffect, useState } from "react";
import useMetaplex from "../hooks/useMetaplex";
import NFTEditorTextField from "./NFTEditorTextField";
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
      setStatus("error");
      setMsg(`Failed to update NFT metadata: ${error.message}`);
    }
  };

  const handleUpdateMetadata = (name: string, value: string) => {
    setMetadata({
      ...metadata,
      [name]: value,
    });
  };

  const handleReset = () => {
    setMetadata(nft.metadata);
  };

  if (!metadata) {
    return null;
  }

  return (
    <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
      {status !== "idle" ? <Status type={status} msg={msg} /> : null}
      <NFTEditorTextField
        name="name"
        value={metadata.name ?? ""}
        updateMetadata={handleUpdateMetadata}
      />
      <NFTEditorTextField
        name="symbol"
        value={metadata.symbol ?? ""}
        updateMetadata={handleUpdateMetadata}
      />
      <NFTEditorTextField
        name="description"
        value={metadata.description ?? ""}
        updateMetadata={handleUpdateMetadata}
      />
      <NFTEditorTextField
        name="external_url"
        value={metadata.external_url ?? ""}
        updateMetadata={handleUpdateMetadata}
      />
      <div className="flex flex-row justify-end items-center gap-2 my-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          Mutate
        </button>
      </div>
    </form>
  );
};

export default NFTEditor;
