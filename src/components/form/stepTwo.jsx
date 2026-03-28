import SelectField from "../common/SelectField";

const StepTwo = ({ formData, errors, handleChange, handleNext, handleBack, setFormData }) => {
   
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Step 2: Preferences</h2>

    {/* suing reusable component SelectFiled instead of select tag for clean and scalable code */}
    <div  className="mb-4">
        <SelectField
            label="Meal"
            name="meal"
            value={formData.meal}
            onChange={handleChange}
            options={[
                { label: "Veg", value: "veg" },
                { label: "Non-Veg", value: "nonveg" }
            ]}
            error={errors.meal}
    />
    </div>
  
     {/* <select
        name="meal"
        value={formData.meal || ""}
        onChange={handleChange}
    >
        <option value="">Select Meal</option>
        <option value="veg">Veg</option>
        <option value="nonveg">Non-Veg</option>
      </select>
      <br></br>
      {errors.meal && <p style={{color : 'red'}}>{errors.meal}</p>} */}

      {formData.meal === "veg" && 
      <div className="mb-4">
         <SelectField
            label="Veg Type"
            name="vegType"
            onChange={handleChange}
            options={[
                {label: "Jain", value: "jain"},
                {label: "Vegan", value: "vegan"}
            ]}
             error={errors.meal}
        />
      </div>
      }

      <div className="mb-4">
        <SelectField
          label="Seat"
          name="seat"
          value={formData.seat || ""}
          onChange={handleChange}
          options={[
              {label: "Window" ,value: "window"},
              {label: "Aisle", value: "asile"}
          ]}
          error= {errors.seat}
      />
      </div>
    
      <div className="mb-4">
          <SelectField
            label="Baggage"
            name="baggage"
            value={formData.baggage || ""}
            onChange={handleChange}
            options={[
                {label: "15kg", value: "15kg"},
                {label: "20kg", value: "20kg"}
            ]}
            error={!formData.infant ? errors.baggage : ""}
        />
      </div>
      
      <label className="flex items-center gap-2 mb-4">
            <input
                type="checkbox"
                name="infant"
                checked={formData.infant}
                onChange={handleChange}
            />  Travelling with Infant
      </label>

      <br /><br />

       <div className="flex justify-between mt-6">
      <button
        onClick={handleBack}
        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Back
      </button>

      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Next
      </button>
    </div>
    </div>
  );
};

export default StepTwo;