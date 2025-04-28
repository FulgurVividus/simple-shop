import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import Navbar from "./app-components/Navbar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Box minH={"100vh"} bg={"gray.200"} _dark={{ bg: "gray.900" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
