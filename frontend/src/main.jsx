import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";
import { Provider } from "./components/ui/provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <Provider>
            <App />
          </Provider>
        </ColorModeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
