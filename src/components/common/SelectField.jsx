const SelectField = ({label,name,value,onChange,options,error}) => {
  return (
    <div className="mb-4" >
      <label className="block mb-1 font-medium text-gray-700">{label}</label><br />
      <div className="relative">
      <select 
        name={name} 
        value={value} 
        onChange={onChange}
        className={`w-full border rounded-lg p-2 bg-white appearance-none focus:outline-none focus:ring-2 
        ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        
      </select>
       {/* 🔽 Custom Arrow */}
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        ▼
      </span>
      </div>
        
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SelectField;