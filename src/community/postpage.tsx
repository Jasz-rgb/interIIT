import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Textarea } from "@chakra-ui/react";

type Post = {
  title: string;
  content: string;
  author: string;
};

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    if (!title || !content) return;
    const newPost: Post = {
      title,
      content,
      author: "user123",
    };
    setPosts((prev) => [newPost, ...prev]);
    setTitle("");
    setContent("");
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      {/* Create Post */}
      <Box
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        mb={6}
      >
        <Text fontWeight="bold" mb={2}>
          Create a Post
        </Text>
        <Input
          placeholder="Post Title"
          mb={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Post Content"
          mb={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddPost}>
          Post
        </Button>
      </Box>

      {/* Display Posts */}
      {posts.map((post, index) => (
        <Box
          key={index}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p={4}
          mb={4}
        >
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            {post.title}
          </Text>
          <Text mb={2}>{post.content}</Text>
          <Text fontSize="sm" color="gray.500">
            Posted by: {post.author}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default PostPage;
