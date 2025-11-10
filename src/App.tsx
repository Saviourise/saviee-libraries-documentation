import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import UseTimedFlow from "./pages/libraries/useTimedFlow/use-timed-flow.library";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/libraries/use-timed-flow" element={<UseTimedFlow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
