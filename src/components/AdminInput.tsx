const AdminInput = ({
  input,
  type,
  handleChange,
  errorText,
  label,
}: {
  input: string;
  type?: string;
  handleChange: (s: string) => void;
  errorText?: string
  label: string;
}) => {
  return (
    <div className="w-full mb-3">
      <div className="text-primary font-semibold text-lg mb-2">{label}</div>
      <input
        type={type || "text"}
        min={0}
        value={input}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        className="w-full border-2 border-primary rounded-2xl py-3 px-2 text-primary font-semibold focus-visible:outline-none"
      />
      {errorText && <div className="text-red-600 ">{errorText}</div>}
    </div>
  );
};

export default AdminInput;
