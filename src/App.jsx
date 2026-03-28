import MultiStepForm from "./pages/MultiStepForm";

//library use for Toast notification
import { Toaster } from "react-hot-toast";

function App() {
  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <Toaster position="top-right" reverseOrder={false} />
      <MultiStepForm />
    </div>
  </div>
  );
}

export default App;