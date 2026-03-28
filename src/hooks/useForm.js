import { useState } from "react";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

    //To reset the form after successful submit
    const resetForm = () => {
        setFormData(initialState);
        setErrors({});
    };
     //To handle input values 
  const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = type === "checkbox" ? checked : value;

        // Restrict phone & age to digits only
        if (name === "phone" || name === "age") {
            newValue = value.replace(/\D/g, "");
        }

        // Normalize whitespace for address
        if (name === "address") {
            newValue = value.replace(/\s+/g, " ");
        }

        // 👇 Create UPDATED form data FIRST
        let updatedFormData = {
            ...formData,
            [name]: newValue
        };

        // 👇 Reset vegType if meal changes
        if (name === "meal" && newValue !== "veg") {
            updatedFormData.vegType = "";
        }

        // 👇 Update state ONCE
        setFormData(updatedFormData);

        let updatedErrors = {
            ...errors,
            [name]: validate(name, newValue, updatedFormData)
        };

        // ✅ ONLY special dependent case
        if (name === "infant") {
            updatedErrors.baggage = validate(
            "baggage",
            updatedFormData.baggage,
            updatedFormData
            );
        }

        setErrors(updatedErrors);
    };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    resetForm
  };
};

export default useForm;