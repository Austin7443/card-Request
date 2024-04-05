import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import logoA from "./aahera.png";
import logoM from "./logo copy.svg";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <Flex justify={"space-between"} shadow={"md"} py="10px" px={["30px", "50px"]} w={"100% !important"}>
      <Link to="/">
        <Image src={logoA} alt="ahera logo" w={"60px"} />
      </Link>
      <HStack>
        <Image src={logoM} alt="myestate logo" />
        <Text fontWeight={"semibold"} color={"black"}>MyEstate</Text>
      </HStack>
    </Flex>
  );
};
