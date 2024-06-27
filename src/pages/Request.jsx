// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   HStack,
//   Img,
//   Input,
//   Stack,
//   Text,
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
// } from "@chakra-ui/react";
// import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
// import Container from "../components/Container";
// import { Nav } from "../components/Nav";
// import { PaymentModal } from "../components/PaymentModal";
// import { COLORS } from "../components/colors";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// function Request({ onClose }) {
//   const location = useLocation();
//   const residentId = location.state?._id;
//   const tenantCode = location.state?.tenantCode;
//   const [isLoading, setIsLoading] = useState(false);
//   const [serviceCharge] = useState(3000);
//   const [requests, setRequests] = useState([]);
//   const [media, setMedia] = useState(null);
//   const [formValues, setFormValues] = useState({
//     mainName: "",
//     name: "",
//   });

//   const [isOpen, setIsOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImage = (event) => {
//     if (!event.target.files) return;

//     const file = event.target.files[0];
//     const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];

//     if (!acceptedImageTypes.includes(file.type)) {
//       alert("Please upload a valid image file (JPEG, PNG, GIF).");
//       // event.target.value = null; // Reset input
//       return;
//     }
//     setMedia(file);
//   };

//   const addRequest = () => {
//     if (requests.length >= 2) {
//       alert("Maximum number of requests is 2");
//       return;
//     }

//     if (!formValues.mainName || !media) {
//       // setErrorMessage(
//       //   "Please enter a name and upload an image before proceeding."
//       // );
//       setIsOpen(true);
//       return;
//     }

//     const newRequest = {
//       type: "Resident",
//       name: formValues.name || formValues.mainName,
//       passport: media,
//     };

//     setRequests([...requests, newRequest]);
//     clearForm();
//   };

//   const clearForm = () => {
//     setMedia(null);
//     setFormValues({ mainName: "", name: "" });
//   };

//   const removeRequest = (index) => {
//     const updatedRequests = [...requests];
//     updatedRequests.splice(index, 1);
//     setRequests(updatedRequests);
//   };

//   const makePayment = async () => {
//     setIsLoading(true);
//     try {
//       if (!requests || requests.length < 1) {
//         throw new Error("No requests available for payment.");
//       }

//       const formDataArray = requests.map((req) => {
//         const formData = new FormData();
//         formData.append("name", req.name);
//         formData.append("residentId", residentId);
//         formData.append("tenantCode", tenantCode);
//         formData.append("passport", req.passport);
//         return formData;
//       });

//       const paymentRequests = formDataArray.map((formData) => {
//         return axios.post(
//           "https://backend.myestate.ng/api/v1/card/request-card",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       });

//       await Promise.all(paymentRequests);
//       setIsSuccessOpen(true);
//       setIsLoading(false);
//       onClose();
//     } catch (error) {
//       console.error(
//         "Payment Error:",
//         error.response?.data?.message || error.message
//       );
//       setErrorMessage(error.response?.data?.message );
//       setIsOpen(true);
//       setIsLoading(false);
//     }
//   };

//   const inputStyle = {
//     bg: "#d5f2de",
//     rounded: "lg",
//     color: "black",
//     h: "50px",
//   };

//   return (
//     <Container>
//       <Nav />
//       <Box px={["30px", "50px"]}>
//         <FormControl h="100%" my="30px" color={"black"}>
//           <Stack spacing="20px">
//             <Text
//               color={"black"}
//               fontWeight={"bold"}
//               fontSize={["18px", "18px", "25px", "25px"]}
//             >
//               Upload name and passport photo to request for a new ID card
//             </Text>
//             <Box color={"black"}>
//               <Text fontSize={"18px"}>Resident ID</Text>
//               <Input
//                 {...inputStyle}
//                 placeholder="Resident ID"
//                 _placeholder={{ color: "#000" }}
//                 name="residentId"
//                 border="none"
//                 color={"black !important"}
//                 borderBottom="1px solid #ccc"
//                 borderRadius="10px"
//                 value={tenantCode || ""}
//                 readOnly
//               />
//             </Box>
//             <Box color={"black"}>
//               <Text fontSize={"18px"}>
//                 Enter your name as you want it to appear on the card
//               </Text>
//               <Input
//                 {...inputStyle}
//                 placeholder="Name"
//                 _placeholder={{ color: "#000" }}
//                 name="mainName"
//                 border="none"
//                 borderBottom="1px solid #ccc"
//                 borderRadius="10px"
//                 value={formValues.mainName}
//                 onChange={handleChange}
//               />
//             </Box>
//           </Stack>

//           <Stack>
//             <Box mt={["20px", "20px", "50px", "50px"]}>
//               <FormLabel htmlFor="media">
//                 <HStack cursor="pointer">
//                   <Text color={"black"} fontWeight="500">
//                     Upload passport photo
//                   </Text>
//                   <AiOutlineCloudUpload size={"1.5rem"} color={"black"} />
//                 </HStack>
//                 <Text color={"black"} fontSize={["14px", "16px"]}>
//                   Ensure that the photo is clear, taken in a bright place and
//                   your face is facing front, and fully visible.
//                 </Text>
//                 <Input
//                   type="file"
//                   display="none"
//                   id="media"
//                   onChange={handleImage}
//                 />
//               </FormLabel>
//             </Box>
//             {media && (
//               <Img
//                 w="70px"
//                 h="70px"
//                 m="2"
//                 borderRadius={"5px"}
//                 src={URL.createObjectURL(media)}
//                 alt="Passport"
//               />
//             )}
//           </Stack>
//           <Flex
//             flexWrap={"wrap"}
//             py="15px"
//             justify="space-between"
//             gap="1.5rem"
//           >
//             <Stack
//               {...inputStyle}
//               textAlign="center"
//               bg="#c7ebe2"
//               px="15px"
//               w="150px"
//             >
//               <Text as="small">Service Charge</Text>
//               <Text fontSize="0.9rem" fontWeight="700" m="0 !important">
//                 &#8358;{serviceCharge} Each
//               </Text>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={6}>
//               <Button
//                 variant="outline"
//                 size={"lg"}
//                 onClick={addRequest}
//                 disabled={!media}
//                 bg={COLORS.green}
//                 color={COLORS.white}
//                 w={["30%", "30%", "100%", "100%"]}
//                 _hover={{ backgroundColor: `${COLORS.green}` }}
//               >
//                 Continue
//               </Button>
//               <Button
//                 size={"lg"}
//                 w={["50%", "50%", "100%", "100%"]}
//                 onClick={addRequest}
//                 disabled={!media}
//                 borderColor={COLORS.green}
//                 color={COLORS.green}
//                 border={`2px solid ${COLORS.green}`}
//               >
//                 Add Extra Request
//               </Button>
//             </Stack>
//           </Flex>
//         </FormControl>

//         {requests.length > 0 && (
//           <Box my="30px" color={"#000"}>
//             <Text fontSize="20px" fontWeight="bold" mb="10px">
//               Requests:
//             </Text>
//             {requests.map((req, index) => (
//               <Box key={index} bg="#f7f7f7" p="10px" borderRadius="8px">
//                 <Text mb="5px">
//                   Name: {req.name}, Type: {req.type}
//                 </Text>
//                 <HStack justify="space-between">
//                   <Text fontSize="14px" color="gray">
//                     Passport: {req.passport ? "Uploaded" : "Not Uploaded"}
//                   </Text>
//                   <AiFillDelete
//                     cursor="pointer"
//                     onClick={() => removeRequest(index)}
//                   />
//                 </HStack>
//               </Box>
//             ))}
//           </Box>
//         )}
//         <Flex justify={"flex-end"} w={"100%"}>
//           <PaymentModal
//             tenantCode={tenantCode}
//             requests={requests}
//             totalAmount={serviceCharge * requests.length}
//             makePayment={makePayment}
//           />
//         </Flex>

//         {/* Alert Dialog for Missing Fields */}
//         <AlertDialog
//           isOpen={isOpen}
//           leastDestructiveRef={undefined}
//           onClose={() => setIsOpen(false)}
//         >
//           <AlertDialogOverlay />
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Warning
//             </AlertDialogHeader>
//             <AlertDialogBody>
//                 Please enter a name and upload an image before proceeding.
//             </AlertDialogBody>
//             <AlertDialogFooter>
//               <Button colorScheme="green" onClick={() => setIsOpen(false)}>
//                 OK
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {/* Success Dialog for Payment */}
//         <AlertDialog
//           isOpen={isSuccessOpen}
//           leastDestructiveRef={undefined}
//           onClose={() => setIsSuccessOpen(false)}
//         >
//           <AlertDialogOverlay />
//           <AlertDialogContent bg={"#c7ebe2"}>
//             <AlertDialogHeader
//               fontSize="lg"
//               fontWeight="bold"
//               color="green.500"
//             >
//               Success
//             </AlertDialogHeader>
//             <AlertDialogBody color={"#000"}>
//               Card request was successful.
//             </AlertDialogBody>
//             <AlertDialogFooter>
//               <Button
//                 colorScheme="green"
//                 onClick={() => setIsSuccessOpen(false)}
//               >
//                 OK
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </Box>
//     </Container>
//   );
// }

// export default Request;

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Input,
  Stack,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import Container from "../components/Container";
import { Nav } from "../components/Nav";
import { PaymentModal } from "../components/PaymentModal";
import { COLORS } from "../components/colors";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Request({ onClose }) {
  const location = useLocation();
  const residentId = location.state?._id;
  const tenantCode = location.state?.tenantCode;
  const [isLoading, setIsLoading] = useState(false);
  const [serviceCharge] = useState(3000);
  const [requests, setRequests] = useState([]);
  const [media, setMedia] = useState(null);
  const [formValues, setFormValues] = useState({
    mainName: "",
    name: "",
  });

  console.log("request:", requests, "location:", location);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (event) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!acceptedImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF).");
      event.target.value = null; // Reset input
      return;
    }
    setMedia(file);
  };

  const addRequest = () => {
    if (requests.length >= 2) {
      // Display dialog for maximum requests reached
      alert("Maximum number of requests is 2");
      return;
    }

    if (!formValues.mainName || !media) {
      setIsOpen(true);
      return;
    }

    const newRequest = {
      type: "Resident",
      name: formValues.name || formValues.mainName,
      passport: media,
    };

    setRequests([...requests, newRequest]);
    clearForm();
  };

  // const addRequest = () => {
  //   if (!formValues.mainName || !media) {
  //     setIsOpen(true);
  //     return;
  //   }

  //   const newRequest = {
  //     type: "Resident",
  //     name: formValues.name || formValues.mainName,
  //     passport: media,
  //   };

  //   setRequests([...requests, newRequest]);
  //   clearForm();
  // };

  const clearForm = () => {
    setMedia(null);
    setFormValues({ mainName: "", name: "" });
  };

  const removeRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const makePayment = async () => {
    setIsLoading(true);
    try {
      if (!requests || requests.length < 1) {
        throw new Error("No requests available for payment.");
      }

      const formDataArray = requests.map((req) => {
        const formData = new FormData();
        formData.append("name", req.name);
        formData.append("residentId", residentId);
        formData.append("tenantCode", tenantCode);
        formData.append("passport", req.passport);
        return formData;
      });

      const paymentRequests = formDataArray.map((formData) => {
        return axios.post(
          "https://backend.myestate.ng/api/v1/card/request-card",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      });

      const responses = await Promise.all(paymentRequests);

      console.log(
        "Payment Responses:",
        responses.map((res) => res.data)
      );
      setIsSuccessOpen(true);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      alert(error.response?.data.message || "Payment Error. Please try again.");
      setIsLoading(false);
    }
  };
  console.log("Resident ID:", residentId);
  console.log("TenantCode:", tenantCode);

  const inputStyle = {
    bg: "#d5f2de",
    rounded: "lg",
    color: "black",
    h: "50px",
  };

  return (
    <Container>
      <Nav />
      <Box px={["30px", "50px"]}>
        <FormControl h="100%" my="30px" color={"black"}>
          <Stack spacing="20px">
            <Text
              color={"black"}
              fontWeight={"bold"}
              fontSize={["18px", "18px", "25px", "25px"]}
            >
              Upload name and passport photo to request for a new ID card
            </Text>
            <Box color={"black"}>
              <Text fontSize={"18px"}>Resident ID</Text>
              <Input
                {...inputStyle}
                placeholder="Resident ID"
                _placeholder={{ color: "#000" }}
                name="residentId"
                border="none"
                color={"black !important"}
                borderBottom="1px solid #ccc"
                borderRadius="10px"
                value={tenantCode || ""}
                readOnly
              />
            </Box>
            <Box color={"black"}>
              <Text fontSize={"18px"}>
                Enter your name as you want it to appear on the card
              </Text>
              <Input
                {...inputStyle}
                placeholder="Name"
                _placeholder={{ color: "#000" }}
                name="mainName"
                border="none"
                borderBottom="1px solid #ccc"
                borderRadius="10px"
                value={formValues.mainName}
                onChange={handleChange}
              />
            </Box>
          </Stack>

          <Stack>
            <Box mt={["20px", "20px", "50px", "50px"]}>
              <FormLabel htmlFor="media">
                <HStack cursor="pointer">
                  <Text color={"black"} fontWeight="500">
                    Upload passport photo
                  </Text>
                  <AiOutlineCloudUpload size={"1.5rem"} color={"black"} />
                </HStack>
                <Text color={"black"} fontSize={["14px", "16px"]}>
                  Ensure that the photo is clear, taken in a bright place and
                  your face is facing front, and fully visible.
                </Text>
                <Input
                  type="file"
                  display="none"
                  id="media"
                  onChange={handleImage}
                />
              </FormLabel>
            </Box>
            {media && (
              <Img
                w="70px"
                h="70px"
                m="2"
                borderRadius={"5px"}
                src={URL.createObjectURL(media)}
                alt="Passport"
              />
            )}
          </Stack>
          <Flex
            flexWrap={"wrap"}
            py="15px"
            justify="space-between"
            gap="1.5rem"
          >
            <Stack
              {...inputStyle}
              textAlign="center"
              bg="#c7ebe2"
              px="15px"
              w="150px"
            >
              <Text as="small">Service Charge</Text>
              <Text fontSize="0.9rem" fontWeight="700" m="0 !important">
                &#8358;{serviceCharge} Each
              </Text>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={6}>
              <Button
                variant="outline"
                size={"lg"}
                onClick={addRequest}
                disabled={!media}
                bg={COLORS.green}
                color={COLORS.white}
                w={["30%", "30%", "100%", "100%"]}
                _hover={{ backgroundColor: `${COLORS.green}` }}
              >
                Continue
              </Button>
              <Button
                size={"lg"}
                w={["50%", "50%", "100%", "100%"]}
                onClick={addRequest}
                disabled={!media}
                borderColor={COLORS.green}
                color={COLORS.green}
                border={`2px solid ${COLORS.green}`}
              >
                Add Extra Request
              </Button>
            </Stack>
          </Flex>
        </FormControl>

        {requests.length > 0 && (
          <Box my="30px" color={"#000"}>
            <Text fontSize="20px" fontWeight="bold" mb="10px">
              Requests:
            </Text>
            {requests.map((req, index) => (
              <Box key={index} bg="#f7f7f7" p="10px" borderRadius="8px">
                <Text mb="5px">
                  Name: {req.name}, Type: {req.type}
                </Text>
                <HStack spacing="5px" alignItems="center">
                  <Text fontSize="14px" color="gray">
                    Passport: {req.passport ? "Uploaded" : "Not Uploaded"}
                  </Text>
                  <AiFillDelete
                    cursor="pointer"
                    onClick={() => removeRequest(index)}
                  />
                </HStack>
              </Box>
            ))}
          </Box>
        )}
        <Flex justify={"flex-end"} w={"100%"}>
          <PaymentModal
            tenantCode={tenantCode}
            requests={requests}
            totalAmount={serviceCharge * requests.length}
            makePayment={makePayment}
          />
        </Flex>

        {/* Alert Dialog for Missing Fields */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={undefined}
          onClose={() => setIsOpen(false)}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Warning
            </AlertDialogHeader>
            <AlertDialogBody>
              Please enter a name and upload an image before proceeding.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="green" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog for Payment */}
        <AlertDialog
          isOpen={isSuccessOpen}
          leastDestructiveRef={undefined}
          onClose={() => setIsSuccessOpen(false)}
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg={"#c7ebe2"}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color="green.500"
            >
              Success
            </AlertDialogHeader>
            <AlertDialogBody color={"#000"}>
              Card request was successful.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="green"
                onClick={() => setIsSuccessOpen(false)}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </Container>
  );
}

export default Request;
