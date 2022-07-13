type NFTEditorTextFieldProps = {
  name: string;
  value: string;
  updateMetadata: Function;
};

const NFTEditorTextField = ({
  name,
  value,
  updateMetadata,
}: NFTEditorTextFieldProps) => {
  return (
    <div className="form-control">
      <label className="label">{name}</label>
      <input
        type="text"
        className="input input-bordered"
        value={value}
        onChange={(e) => updateMetadata(name, e.target.value)}
      />
    </div>
  );
};

export default NFTEditorTextField;
