import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../components/Nav";
import { COLORS } from "../components/colors";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [residentId, setResidentId] = useState(null);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://backend.myestate.ng/api/v1/verify-tenant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setIsValidPhoneNumber(true);
        setResidentId(data);
        console.log(data.tenant._id, "data", data);
        navigate("/request-card", { state: data });
      } else {
        alert("Phone number not found. Please enter a valid phone number.");
        setIsValidPhoneNumber(false);
        console.log("Phone number is not valid.");
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Nav />
      <Flex justify={"center"} color={"#000"} w={"100%"} px={["30px", "50px"]}>
        <Box>
          <Text
            fontSize={"40px"}
            fontWeight={"semibold"}
            textAlign={"center"}
            mt={"100px"}
            pb={"50px"}
          >
            ID card registration form
          </Text>
          <Text fontSize={"18px"}>
            Enter phone number to validate that you are a member of Abraham
            Adesanya Housing Estate
          </Text>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            _placeholder={{ opacity: 1, color: "black" }}
            bg={"#d5f2de"}
            h={"50px"}
            border="none"
            borderRadius="10px"
          />
          <Flex justify={"center"}>
            <Button
              bg={COLORS.green}
              color={"white"}
              mt={"30px"}
              w="130px"
              _hover={{ backgroundColor: `${COLORS.green}` }}
              onClick={handleNextClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </Flex>
          {/* Show message based on validation */}
          {isValidPhoneNumber && (
            <Text mt={4} color="green.500" textAlign="center">
              Phone number is valid. Proceeding...
            </Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

