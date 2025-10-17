import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { auth } from "@/firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={3}>
      <Button
        variant="oauth"
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>

      <Button variant="oauth">Some Other Provider</Button>

      {error && (
        <Text textAlign="center" fontSize="10pt" color="red.500" mt={2}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
