import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://backend.myestate.ng/api/v1/user/verify-tenant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (
        response.ok &&
        data.result.success &&
        data.result.data.tenant.length > 0
      ) {
        const tenant = data.result.data.tenant[0];
        console.log(tenant, "tenant");
        setIsValidPhoneNumber(true);
        setResidentId(tenant._id);
        console.log(tenant._id, "tenant data", tenant);
        navigate("/request-card", { state: tenant });
      } else {
        onOpen();
        setIsValidPhoneNumber(false);
        console.log(
          "Phone number is not valid or response structure is unexpected."
        );
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeClick = () => {
    onClose();
    navigate("/request-card");
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

      {/* Modal for phone number not found */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader textAlign={"center"}>Phone Number Not Found</ModalHeader>
          <ModalBody>
            <Text>
              Please note that you are not actively registered as a resident in
              Abraham Adesanya Estate. This may be because you have some
              outstanding dues to pay. Please ensure you reach out to the Estate
              manager to sort out the outstanding balance. <br />Also please note that
              you will be allowed to proceed with your ID card registration but
              your card will remain inactive till you sort out the outstanding. <br /><br />
              Please click "I Agree" below in order to proceed with your ID card
              registration.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={COLORS.green}
              _hover={{ backgroundColor: `${COLORS.green}` }}
              color="white"
              onClick={handleAgreeClick}
            >
              I Agree
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

// import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { Nav } from "../components/Nav";
// import { COLORS } from "../components/colors";
// import Container from "../components/Container";
// import { useNavigate } from "react-router-dom";

// export const Home = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [residentId, setResidentId] = useState(null);
//   const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleNextClick = async () => {
//     if (!phoneNumber) {
//       alert("Please enter a phone number.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://backend.myestate.ng/api/v1/user/verify-tenant`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ phoneNumber }),
//         }
//       );

//       const data = await response.json();
//       console.log("Response data:", data);

//       if (
//         response.ok &&
//         data.result.success &&
//         data.result.data.tenant.length > 0
//       ) {
//         const tenant = data.result.data.tenant[0];
//         console.log(tenant, "tenant")
//         setIsValidPhoneNumber(true);
//         setResidentId(tenant._id);
//         console.log(tenant._id, "tenant data", tenant);
//         navigate("/request-card", { state: tenant });
//       } else {
//         alert("Phone number not found. Please enter a valid phone number.");
//         setIsValidPhoneNumber(false);
//         console.log(
//           "Phone number is not valid or response structure is unexpected."
//         );
//       }
//     } catch (error) {
//       console.error("Error checking phone number:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Nav />
//       <Flex justify={"center"} color={"#000"} w={"100%"} px={["30px", "50px"]}>
//         <Box>
//           <Text
//             fontSize={"40px"}
//             fontWeight={"semibold"}
//             textAlign={"center"}
//             mt={"100px"}
//             pb={"50px"}
//           >
//             ID card registration form
//           </Text>
//           <Text fontSize={"18px"}>
//             Enter phone number to validate that you are a member of Abraham
//             Adesanya Housing Estate
//           </Text>
//           <Input
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             _placeholder={{ opacity: 1, color: "black" }}
//             bg={"#d5f2de"}
//             h={"50px"}
//             border="none"
//             borderRadius="10px"
//           />
//           <Flex justify={"center"}>
//             <Button
//               bg={COLORS.green}
//               color={"white"}
//               mt={"30px"}
//               w="130px"
//               _hover={{ backgroundColor: `${COLORS.green}` }}
//               onClick={handleNextClick}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Next"}
//             </Button>
//           </Flex>
//           {/* Show message based on validation */}
//           {isValidPhoneNumber && (
//             <Text mt={4} color="green.500" textAlign="center">
//               Phone number is valid. Proceeding...
//             </Text>
//           )}
//         </Box>
//       </Flex>
//     </Container>
//   );
// };

// import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { Nav } from "../components/Nav";
// import { COLORS } from "../components/colors";
// import Container from "../components/Container";
// import { useNavigate } from "react-router-dom";

// export const Home = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [residentId, setResidentId] = useState(null);
//   const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleNextClick = async () => {
//     if (!phoneNumber) {
//       alert("Please enter a phone number.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://backend.myestate.ng/api/v1/user/verify-tenant`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ phoneNumber }),
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setIsValidPhoneNumber(true);
//         setResidentId(data);
//         console.log(data.tenant._id, "data", data);
//         navigate("/request-card", { state: data });
//       } else {
//         alert("Phone number not found. Please enter a valid phone number.");
//         setIsValidPhoneNumber(false);
//         console.log("Phone number is not valid.");
//       }
//     } catch (error) {
//       console.error("Error checking phone number:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Nav />
//       <Flex justify={"center"} color={"#000"} w={"100%"} px={["30px", "50px"]}>
//         <Box>
//           <Text
//             fontSize={"40px"}
//             fontWeight={"semibold"}
//             textAlign={"center"}
//             mt={"100px"}
//             pb={"50px"}
//           >
//             ID card registration form
//           </Text>
//           <Text fontSize={"18px"}>
//             Enter phone number to validate that you are a member of Abraham
//             Adesanya Housing Estate
//           </Text>
//           <Input
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             _placeholder={{ opacity: 1, color: "black" }}
//             bg={"#d5f2de"}
//             h={"50px"}
//             border="none"
//             borderRadius="10px"
//           />
//           <Flex justify={"center"}>
//             <Button
//               bg={COLORS.green}
//               color={"white"}
//               mt={"30px"}
//               w="130px"
//               _hover={{ backgroundColor: `${COLORS.green}` }}
//               onClick={handleNextClick}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Next"}
//             </Button>
//           </Flex>
//           {/* Show message based on validation */}
//           {isValidPhoneNumber && (
//             <Text mt={4} color="green.500" textAlign="center">
//               Phone number is valid. Proceeding...
//             </Text>
//           )}
//         </Box>
//       </Flex>
//     </Container>
//   );
// };
