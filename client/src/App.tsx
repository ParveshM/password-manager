import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routes/Router";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <MainRouter />
            <Toaster />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
