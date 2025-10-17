import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import React from "react";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  if (!user) {
    // Logged out
    return (
      <Avatar
        size="sm"
        name="Unknown User"
        src="/images/unknown.png"
        cursor="pointer"
      />
    );
  }

  // Logged in
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline">
        <Flex align="center" gap={2}>
          <Avatar size="sm" src={user.photoURL || ""} />
          <Text fontSize="sm">{user.displayName || "User"}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            signOut(auth);
          }}
        >
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
