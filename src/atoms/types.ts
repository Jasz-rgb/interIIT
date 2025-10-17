export type Comment = {
  id: number; // unique id for the comment
  parent_id: number | null; // null if top-level comment, else id of parent comment
  text: string; // comment text
  upvotes: number; // upvote count
  created_at: string; // ISO date string
  user_id: string; // id of the user who created it
  name: string; // user display name
  avatar?: string; // optional user avatar URL
  children?: Comment[]; // array of nested replies
};
