import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routes/Router";
import { Toaster } from "@/components/ui/toaster";
const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
