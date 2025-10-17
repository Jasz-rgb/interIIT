import React from "react";
import { Flex, Text, Box, Image } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      bg="white"
      height="60px"
      align="center"
      justify="space-between"
      px={6}
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex align="center">
        <Image
          src="/images/unknown.png"
          alt="Community icon"
          borderRadius="full"
          height="30px"
          mr={2}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Posts
        </Text>
      </Flex>
      <Box>{/* You can add login/signup or user info here */}</Box>
    </Flex>
  );
};

export default Header;
