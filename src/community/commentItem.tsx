import React, { useState } from "react";
import { Box, Text, Flex, Input, Button, Icon, Avatar } from "@chakra-ui/react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { Comment } from "./post";

interface CommentItemProps {
  comment: Comment;
  level: number;
  handleAddComment: (parentId: number | null, text: string) => void;
  commentInputs: { [key: number]: string };
  setCommentInputs: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  currentUserEmail: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  level,
  handleAddComment,
  commentInputs,
  setCommentInputs,
  currentUserEmail}) => {
  const [expanded, setExpanded] = useState(false);
  const replies = comment.children || [];
  const visibleReplies = expanded ? replies : replies.slice(0, 2);

  // Get the username and avatar for this comment's email/user_id
  const usernames = JSON.parse(localStorage.getItem("usernames") || "{}");
  const commentUserName =
    comment.user_id === currentUserEmail
      ? "You"
      : usernames[comment.user_id] || comment.name || "Unknown User";
  const commentUserAvatar = comment.avatar || "";

  return (
    <Box ml={level * 6} mb={3} p={2} border="1px solid #eee" borderRadius="md">
      <Flex align="center" mb={1}>
        <Avatar size="sm" src={commentUserAvatar} mr={2} />
        <Text fontWeight="bold">{commentUserName}</Text>
      </Flex>

      <Text mb={1}>{comment.text}</Text>

      <Flex align="center" fontSize="sm" color="gray.500" mb={1}>
        <Flex align="center" mr={3} cursor="pointer">
          <Icon as={BsArrowUp} mr={1} />
          <Text>{comment.upvotes}</Text>
          <Icon as={BsArrowDown} ml={1} />
        </Flex>
        <Text>
          {new Date(comment.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </Text>
      </Flex>

      <Flex mb={2}>
        <Input
          placeholder="Reply..."
          size="sm"
          value={commentInputs[comment.id] || ""}
          onChange={(e) =>
            setCommentInputs({
              ...commentInputs,
              [comment.id]: e.target.value,
            })
          }
        />
        <Button
          size="sm"
          ml={2}
          onClick={() => {
            handleAddComment(comment.id, commentInputs[comment.id] || "");
            setCommentInputs({ ...commentInputs, [comment.id]: "" });
          }}
        >
          Reply
        </Button>
      </Flex>

      {visibleReplies.map((r) => (
        <CommentItem
          key={r.id}
          comment={r}
          level={level + 1}
          handleAddComment={handleAddComment}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          currentUserEmail={currentUserEmail}
        />
      ))}

      {replies.length > 2 && (
        <Button
          variant="link"
          size="sm"
          colorScheme="blue"
          onClick={() => setExpanded((prev) => !prev)}
          mt={1}
        >
          {expanded
            ? "Hide replies"
            : `View ${replies.length - visibleReplies.length} more replies`}
        </Button>
      )}
    </Box>
  );
};

export default CommentItem;
