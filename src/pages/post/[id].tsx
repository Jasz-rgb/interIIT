import dynamic from "next/dynamic";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const Post = dynamic(() => import("../../community/post"), { ssr: false });

export default function SinglePostPage() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this post</div>;

  const currentUserId = user.uid; //Firebase user UID

  return (
    <div>
      <Post currentUserId={currentUserId} />
    </div>
  );
}
