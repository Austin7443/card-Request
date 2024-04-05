import React from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Request from "./pages/Request";
import { Box, Text } from "@chakra-ui/react";
import Container from "./components/Container";
function App() {
  return (
    <Box h={"100vh"} overflowY={"scroll"} w={"100%"} background={"white"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-card" element={<Request />} />
        </Routes>
      </BrowserRouter>
      <Container>
        <Text
          position={"absolute"}
          textAlign={"end"}
          bottom={"20px"}
          px={["30px", "50px"]}
          color={"black"}
        >
          Powered by MyEstate.ng
        </Text>
      </Container>
    </Box>
  );
}

export default App;
