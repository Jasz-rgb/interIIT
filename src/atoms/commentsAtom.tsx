import { atom } from "recoil";
import { Comment } from "../community/post";

export const commentsState = atom<Comment[]>({
  key: "commentsState",
  default: [],
});
