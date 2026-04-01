import { Toaster } from "react-hot-toast"


const StepThree = ({formData, handleBack, handleSubmit, loading, apiResponse, apiError, isSubmitted}) => {
     
    return(
        <div className="relative">
                <h2>Step 3: Review</h2>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Full Name</span>
                    <span>{formData.fullName}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Email</span>
                    <span>{formData.email}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Address</span>
                    <span className="text-right max-w-[60%]">{formData.address}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Phone</span>
                    <span>{formData.phone}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Age</span>
                    <span>{formData.age}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Meal</span>
                    <span>{formData.meal}</span>
                </div>

                {formData.meal === "veg" && (
                    <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Veg Type</span>
                    <span>{formData.vegType}</span>
                    </div>
                )}

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Seat</span>
                    <span>{formData.seat}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Baggage</span>
                    <span>{formData.infant ? "Not Required" : formData.baggage}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Infant</span>
                    <span>{formData.infant ? "Yes" : "No"}</span>
                </div>

                </div>

                 <div className="flex justify-between mt-6">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={handleBack} disabled={loading || isSubmitted}>Back</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={handleSubmit} disabled={loading || isSubmitted}>
                        {loading? "Submitting...": "Submit"}
                    </button>
                </div>


                {/* If use Toaster */}
                {/* <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "14px",
                        },
                    }}
                /> */}
                {apiResponse && (
                    <p className="text-green-600 font-semibold mt-2">
                        {apiResponse.message}
                    </p>
                )}

                {apiError && (
                    <p className="text-green-600 font-semibold mt-2">
                        {apiError}
                    </p>
                )}
        </div>
    )
}

export default StepThree