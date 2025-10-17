import React, { useEffect, useState } from "react";
import { Box, Text, Image, Flex, Input, Button, Icon } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { commentsState } from "../atoms/commentsAtom";
import usersData from "../data/users.json";
import commentsData from "../data/comments.json";
import CommentItem from "./commentItem";
import {
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const usersMap = Object.fromEntries(usersData.map((u) => [u.id, u]));

export type Comment = {
  id: number;
  parent_id: number | null;
  text: string;
  upvotes: number;
  created_at: string;
  user_id: string;
  name: string;
  avatar?: string;
  children?: Comment[];
};

const postId = "single_post_001";

interface PostProps {
  currentUserId: string;
}

const Post: React.FC<PostProps> = ({ currentUserId }) => {
  const [comments, setComments] = useRecoilState(commentsState);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );
  const [visibleComments, setVisibleComments] = useState(3);
  const [sortBy, setSortBy] = useState<
    "upvotes" | "replies" | "newest" | "oldest" | "userPopularity"
  >("newest");

  // Load comments from localStorage or fallback to JSON
  useEffect(() => {
    const savedComments = localStorage.getItem("comments_" + postId);

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      const jsonComments = commentsData.map((c) => ({
        ...c,
        name: usersMap[c.user_id]?.name || "Unknown User",
        avatar: usersMap[c.user_id]?.avatar || "",
        children: [],
      }));
      setComments(jsonComments);
      localStorage.setItem("comments_" + postId, JSON.stringify(jsonComments));
    }
  }, [setComments]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments_" + postId, JSON.stringify(comments));
    }
  }, [comments]);

  const buildCommentTree = (flatComments: Comment[]) => {
    const map = new Map<number, Comment>();
    const roots: Comment[] = [];
    flatComments.forEach((c) => map.set(c.id, { ...c, children: [] }));
    map.forEach((c) => {
      if (c.parent_id === null) roots.push(c);
      else map.get(c.parent_id)?.children?.push(c);
    });
    return roots;
  };

  const commentTree = buildCommentTree(comments);

  const sortComments = (comments: Comment[]): Comment[] => {
    switch (sortBy) {
      case "upvotes":
        return [...comments].sort((a, b) => b.upvotes - a.upvotes);
      case "replies":
        return [...comments].sort(
          (a, b) => (b.children?.length || 0) - (a.children?.length || 0)
        );
      case "newest":
        return [...comments].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return [...comments].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "userPopularity":
        const userUpvotes: Record<string, number> = {};
        comments.forEach(
          (c) =>
            (userUpvotes[c.user_id] = (userUpvotes[c.user_id] || 0) + c.upvotes)
        );
        return [...comments].sort(
          (a, b) =>
            (userUpvotes[b.user_id] || 0) - (userUpvotes[a.user_id] || 0)
        );
      default:
        return comments;
    }
  };

  const handleAddComment = (parentId: number | null, text: string) => {
    if (!text.trim()) return;

    const usernames = JSON.parse(localStorage.getItem("usernames") || "{}");
    const username = usernames[currentUserId] || "You";

    const newComment: Comment = {
      id: Date.now(),
      parent_id: parentId,
      text,
      upvotes: 0,
      created_at: new Date().toISOString(),
      user_id: currentUserId,
      name: username,
      avatar: "",
      children: [],
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInputs((prev) => ({ ...prev, [parentId || 0]: "" }));
  };

  const visibleTopComments = sortComments(commentTree).slice(
    0,
    visibleComments
  );

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={5}
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      border="1px solid #e2e8f0"
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Framework for Students to Create Conceptual Research Models
      </Text>
      <Text mt={3} mb={4}>
        A step-by-step visual guide to creating a conceptual framework for
        research...
      </Text>
      <Image
        src="/images/sample-image.png"
        alt="Post Image"
        borderRadius="md"
        mb={4}
      />

      {/* Action Buttons */}
      <Flex ml={1} mb={3} color="gray.500" fontWeight={600}>
        {[
          {
            icon: BsChat,
            label: "Comment",
            onClick: () =>
              document
                .getElementById("comment-input")
                ?.scrollIntoView({ behavior: "smooth" }),
          },
          { icon: IoArrowRedoOutline, label: "Share" },
          { icon: IoArrowUpCircleOutline, label: "Like" },
          { icon: IoBookmarkOutline, label: "Save" },
          { icon: AiOutlineDelete, label: "Delete", color: "red.500" },
        ].map((btn, idx) => (
          <Flex
            key={idx}
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            mr={2}
            onClick={btn.onClick}
          >
            <Icon as={btn.icon} mr={2} color={btn.color} />
            <Text fontSize="9pt" color={btn.color}>
              {btn.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* Comment Input + Sort */}
      <Box mb={4} id="comment-input">
        <Flex align="center" gap={2} mb={2}>
          <Input
            placeholder="Add a comment..."
            value={commentInputs[0] || ""}
            onChange={(e) =>
              setCommentInputs({ ...commentInputs, 0: e.target.value })
            }
            flex={1}
          />
          <Button
            onClick={() => handleAddComment(null, commentInputs[0] || "")}
          >
            Comment
          </Button>
        </Flex>

        <Flex align="center" mb={2}>
          <Text mr={2} fontSize="11pt" fontWeight="bold">
            Sort Comments:
          </Text>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "12pt",
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="upvotes">Most Upvotes</option>
            <option value="replies">Most Replies</option>
            <option value="userPopularity">User Popularity</option>
          </select>
        </Flex>
      </Box>

      {/* Comments */}
      {visibleTopComments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          level={0}
          handleAddComment={handleAddComment}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          currentUserEmail={currentUserId}
        />
      ))}

      {commentTree.length > visibleComments && (
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => setVisibleComments((v) => v + 3)}
        >
          View more comments
        </Button>
      )}
    </Box>
  );
};

export default Post;
