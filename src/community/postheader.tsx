import React, { useState } from "react";
import { Button, Flex, Text, Image, Icon, Box } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

type PostHeaderProps = {
  title?: string;
  subreddit?: string;
  imageURL?: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  title = "Framework Post",
  subreddit = "r/Example",
  imageURL,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px" align="center">
          {imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={imageURL}
              alt={title}
              position="relative"
              top={-3}
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius="50%"
              color="blue.500"
            />
          )}

          <Flex direction="column" padding="10px 16px" flex={1}>
            <Text fontWeight={800} fontSize="16pt">
              {title}
            </Text>
            <Text fontWeight={600} fontSize="10pt" color="gray.400">
              {subreddit}
            </Text>
          </Flex>

          <Button
            variant={isFollowing ? "outline" : "solid"}
            height="30px"
            pr={6}
            pl={6}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostHeader;
