import { useState } from "react"
import { useEffect } from "react";
import StepOne from "../components/form/stepOne"
import StepTwo from "../components/form/stepTwo"
import StepThree from "../components/form/stepThree"
import useForm from "../hooks/useForm"

//library use
import toast from "react-hot-toast"

//Controlled component
const MultiStepForm = () => {
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [apiError, setApiError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

   // const [step, setStep] = useState(1)                                 //For storing the page navigation number
    const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("formStep");
    return savedStep ? Number(savedStep) : 1;
    });
    const stepFields = {                                                //Fields to validate at each step
        1: ["fullName", "email", "address", "phone", "age"],
        2: ["meal", "seat", "baggage"]
    };                                                               

      //to submit form with Toast notification 
    // const submitForm = async (data) => {
    // setLoading(true);

    //     try {
    //         await new Promise((resolve) => setTimeout(resolve, 1500));

    //         // ✅ SUCCESS TOAST
    //         toast.success("Form submitted successfully!");

    //         // ✅ RESET FORM
    //         setTimeout(() => {
    //         setFormData(initialState);
    //         setStep(1);
    //         }, 1000);

    //     } catch (error) {
    //         // ❌ ERROR TOAST
    //         toast.error("Something went wrong!");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    //To submit form and Add Api function
    const submitForm = async (data) => {
        setLoading(true)
        setIsSubmitted(true);
        setApiResponse(null)
        setApiError('')

        try{
            await new Promise((resolve) => setTimeout(resolve, 2000 ))
                const response = {
                    status: 200,
                    message: "Form submitted successfully!",
                    data
                }

                setShowSuccess(true)

                // ✅ RESET FORM AFTER SUCCESS
                setTimeout(() => {
                // setFormData(initialState); Or call resetForm()
                resetForm()
                setStep(1);

                setApiResponse(null)            //on submit state needs to get empty, so that message for form submission does not appear.
                setApiError("")
                setIsSubmitted(false)
                }, 1500);                       // delay so user can see success message
            }catch(error){
                setApiError("Something went wrong")
                setIsSubmitted(false)
            }finally{
                setLoading(false)
            }
    }

  
    //Add Submit button function
    const handleSubmit = () => {
        let newErrors = {};

        const allFields = [
            ...stepFields[1],
            ...stepFields[2],
            "vegType"
        ];

        allFields.forEach((field) => {
            const error = validate(field, formData[field], formData);
            if (error) newErrors[field] = error;

        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            submitForm(formData);
        }
    };

    //Validation logic
    const validate = (name, value, data = formData) => {
 
        let error = "";

        if (name === "fullName") {
            if (!value) error = "Full Name is required";
            else if (value.length < 3) error = "Minimum 3 characters required";
        }

        if (name === "email") {
            if (!value) error = "Email is required";
            else if (!value.includes("@")) error = "Invalid Email Format";
        }

        if (name === "address") {
           
            if (!value.trim()) error = "Address is required";
            else if (value.trim().length < 10) error = "Address is too short";
            else if (value.length > 150) error = "Address is too long";
            else if (!/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
            error = "Invalid characters in address";
            }
        }

        if (name === "phone") {
            if (!value) error = "Phone no is required";
            else if (!/^\d{10}$/.test(value)) {
            error = "Phone must be exactly 10 digits";
            }
        }

        if (name === "age") {
            if (!value) {
            error = "Age is required";
            } else if (!/^\d+$/.test(value)) {
            error = "Age must be a number";
            } else if (Number(value) < 18 || Number(value) > 110) {
            error = "Age must be between 18 and 110";
            }
        }

        if (name === "meal") {
            if (!value) error = "Meal is required";
        }

        if (name === "seat") {
            if (!value) error = "Seat is required";
        }

        // ✅ FIXED baggage logic (with infant dependency)
        if (name === "baggage") {
            if (!data?.infant && !value) {
            error = "Baggage is required";
            }
        }

        // // ✅ FIXED vegType logic (with meal dependency)
        // if (name === "vegType") {
        //     if (data?.meal === "veg" && !value) {
        //     error = "Veg type is required";
        //     }
        // }

        return error;
    };


    //To handle back button
    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1)); // ✅ LIMIT
    };

    //Next button functionality 
    const handleNext = () => {
        let newErrors = {};

        const fieldsToValidate = [...stepFields[step]];

        //   // ✅ Add conditional validation
        // if (step === 2 && formData.meal === "veg") {
        //     if (!fieldsToValidate.includes("vegType")) {
        //         fieldsToValidate.push("vegType");
        //     }
        // }

        fieldsToValidate.forEach((field) => {
            const error = validate(field, formData[field], formData);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
             // ✅ Clear old API messages when moving forward
            setApiResponse(null);
            setApiError("");
            setStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const getInitialState = () => {
    const savedData = localStorage.getItem("formData");
    return savedData
        ? JSON.parse(savedData)
        : {
            fullName: "",
            email: "",
            address: "",
            phone: "",
            age: "",
            meal: "",
            seat: "",
            baggage: "",
            vegType: "",
            infant: false,
        };
    };
        
    const {formData,setFormData,errors,setErrors,handleChange, resetForm} = useForm(getInitialState, validate);           //useForm custom hook

    useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
    localStorage.setItem("formStep", step);
    }, [step]);

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            
            {showSuccess ? (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                ✅ Form Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                Thank you for your submission.
                </p>

                <button
                onClick={() => {
                    resetForm();
                    localStorage.removeItem("formData")
                    localStorage.removeItem("formStep")
                    setStep(1);
                    setShowSuccess(false);
                }}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                >
                Fill Again
                </button>
            </div>
            ) : (
            <>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Multi-Step Booking Form
                </h2>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((s, index) => (
                    <div key={s} className="flex items-center w-full">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium 
                        ${step >= s ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}
                    >
                        {s}
                    </div>

                    {index < 2 && (
                        <div
                        className={`flex-1 h-1 mx-2 
                        ${step > s ? "bg-blue-500" : "bg-gray-300"}`}
                        />
                    )}
                    </div>
                ))}
                </div>

                {/* Steps */}
                {step === 1 && (
                <StepOne
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleNext={handleNext}
                />
                )}

                {step === 2 && (
                <StepTwo
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setFormData={setFormData}
                />
                )}

                {step === 3 && (
                <StepThree
                    formData={formData}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    apiResponse={apiResponse}
                    apiError={apiError}
                    isSubmitted={isSubmitted}
                />
                )}
            </>
            )}
        </div>
    );
    }

//Uncontrolled component
// const MultiStepForm = () =>{
//     return(
//         <div style={{ maxWidth: "500px", margin: "auto" }}>
//             <h2>Step 1: Personal Details</h2>
            
//             <form>
//                 <input placeholder="Full Name"/><br></br>
//                 <input placeholder="Email"/><br></br>
//                 <input placeholder="Address"/><br></br>
//                 <input placeholder="Phone"/><br></br>
//                 <input placeholder="Age"/><br></br>

//                 <button type="button"> Next </button>
//             </form>
//         </div>
//     )
// }

export default MultiStepForm