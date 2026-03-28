const InputField = ({label,name,value,onChange,error,type = "text",...props}) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label className="block mb-1 font-medium text-gray-700">{label}</label><br />

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
         className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 
      ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;