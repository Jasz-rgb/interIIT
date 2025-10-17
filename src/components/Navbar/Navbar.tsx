import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
// import Directory from "./Directory/Directory"; // uncomment when you add Directory

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      align="center"
      justify="space-between"
    >
      {/* Left Section (Logo) */}
      <Flex align="center" mr={2}>
        <Image src="/images/redditFace.svg" alt="Reddit logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="Reddit text"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>

      {/* Middle Section (Search) */}
      <SearchInput />

      {/* Right Section (Auth/User) */}
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
