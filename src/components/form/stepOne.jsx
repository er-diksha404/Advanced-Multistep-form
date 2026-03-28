import InputField from "../common/InputField"

const StepOne = ({formData, errors, handleChange, handleNext}) => {
    return (
        <div className="mb-3">
                <h2 className="text-lg font-semibold mb-4">Step 1: Personal Details</h2>
               
               {/* Use reusable InputField component instead of input field to make the code more clean */}
               <InputField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
               />
                {/* <input 
                    name = "fullName" 
                    placeholder="Full Name" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                />
                {errors.fullName && <p style={{color: 'red'}}> {errors.fullName} </p>} */}
        

            <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

           <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
            />

            <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                maxLength = {10}
                type="tel"
            />

            <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                type="number"
                min = "18"
                max = "110"
            />
          

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            type="button" onClick={handleNext}>Next</button>
       
        </div>
    )
}

export default StepOne