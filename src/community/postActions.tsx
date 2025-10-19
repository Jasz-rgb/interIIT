// import { Comment } from "./post";

export const getCommentCount = (comments: Comment[]) => {
  return comments.length;
};

export const getInitialLikes = (postId: string) => {
  const stored = localStorage.getItem("likes_" + postId);
  return stored ? parseInt(stored) : Math.floor(Math.random() * 100);
};

export const toggleLike = (
  postId: string,
  currentLikes: number,
  liked: boolean
) => {
  const newLikes = liked ? currentLikes - 1 : currentLikes + 1;
  localStorage.setItem("likes_" + postId, newLikes.toString());
  return newLikes;
};

export const confirmDelete = (): boolean => {
  return window.confirm("Are you sure you want to delete this post?");
};
