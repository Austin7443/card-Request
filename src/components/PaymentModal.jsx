import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { COLORS } from "./colors";
import { useState } from "react";

export const PaymentModal = ({
  requests,
  totalAmount,
  makePayment,
  residentCode,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    await makePayment();
    setIsLoading(false);
    onClose();
  };

  const copyToClippBoard = () => {
    navigator.clipboard
      .writeText(`${residentCode}`)
      .then(() => {
        alert("Copied successfully");
        onClose();
      });
  };

  return (
    <>
      <Button
        mb={"100px"}
        bg={COLORS.green}
        color={"white"}
        isDisabled={!requests || requests.length < 1}
        w={"200px"}
        size={"lg"}
        _hover={{ backgroundColor: `${COLORS.green}` }}
        onClick={onOpen}
      >
        Pay Now
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} bg={"white"} size={"3xl"}>
        <ModalOverlay />
        <ModalContent bg={"white"} color={"black"}>
          <ModalBody>
            <Flex justify={"center"} my={"40px"}>
              <IoIosCheckmarkCircle size={"8rem"} color={"green"} />
            </Flex>
            <Text
              textAlign={"center"}
              lineHeight={1.8}
              fontSize={"18px"}
              fontWeight={"semibold"}
            >
              Kindly make payment of {totalAmount} with this account
              details...Use your resident code as the payment description for
              the transaction.
              <br />
              <br />
              <Box>
                <Text>Click on the resident code below to copy</Text>
                <Text onClick={copyToClippBoard} fontSize={"18px"} color={COLORS.green}>
                  {residentCode}
                </Text>
              </Box>
              <br />
              Account Name: 413 Innovations Limited
              <br />
              Account Number: 1304598095
              <br />
              Bank Name: Providus Bank
            </Text>
            <Text mt={"50px"} textAlign={"center"} fontWeight={"semibold"}>
              Please ensure to click the payment completed button below after
              making payment for your request to go through successfully
            </Text>
            <Flex justify={"center"} mb={"100px"} mt={"20px"}>
              <Button
                bg={COLORS.green}
                color={"white"}
                w={"200px"}
                size={"lg"}
                _hover={{ backgroundColor: `${COLORS.green}` }}
                onClick={handlePayment}
                isLoading={isLoading}
              >
                Payment Completed
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
