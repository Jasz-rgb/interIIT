import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const ActionIcons: React.FC = () => {
  return (
    <Flex align="center" gap={3}>
      {/* Left icons */}
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
        gap={2}
        pr={2}
      >
        <Icon
          as={BsArrowUpRightCircle}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
        <Icon
          as={IoFilterCircleOutline}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
        <Icon
          as={IoVideocamOutline}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
      </Flex>

      {/* Right icons */}
      <Flex align="center" gap={2}>
        <Icon
          as={BsChatDots}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
        <Icon
          as={IoNotificationsOutline}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
        <Icon
          as={GrAdd}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: "blue.500" }}
        />
      </Flex>
    </Flex>
  );
};

export default ActionIcons;
