import { Box } from "@chakra-ui/react";

const Container = ({ children, ...props }) => {
  return (
    <Box maxW="100%" px={["0px", "0px"]} w="100%" mx="auto" {...props}>
      {children}
    </Box>
  );
};

export default Container;
