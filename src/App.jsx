import MultiStepForm from "./pages/MultiStepForm";

//library use for Toast notification
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <Toaster position="top-right" reverseOrder={false} />
        <MultiStepForm />
      </div>

    </div>
  );
}

export default App;