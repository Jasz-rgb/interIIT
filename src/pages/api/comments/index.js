// import { connectToDatabase } from "../../../lib/mongodb";
// import Comment from "../../../models/Comment";

// export default async function handler(req, res) {
//   try {
//     // Connect to MongoDB
//     await connectToDatabase();
//     console.log("Connected to DB successfully");

//     // GET comments for a post
//     if (req.method === "GET") {
//       const { postId } = req.query;
//       console.log("GET comments for postId:", postId);

//       if (!postId) {
//         return res.status(400).json({ message: "Missing postId" });
//       }

//       const comments = await Comment.find({ postId })
//         .populate("user", "name avatar") // populate only name and avatar
//         .sort({ createdAt: -1 });

//       console.log("Found comments:", comments.length);
//       return res.status(200).json(comments);
//     }

//     // POST a new comment
//     if (req.method === "POST") {
//       const { text, userId, parentId, postId } = req.body;
//       console.log("POST new comment:", { text, userId, parentId, postId });

//       if (!text || !userId || !postId) {
//         return res.status(400).json({ message: "Missing required fields" });
//       }

//       const newComment = await Comment.create({
//         text,
//         user: userId,
//         parentId: parentId || null, // ensure null if undefined
//         postId,
//       });

//       // Populate user details
//       const populatedComment = await newComment.populate("user", "name avatar");

//       console.log("Created comment:", populatedComment);
//       return res.status(201).json(populatedComment);
//     }

//     // Method not allowed
//     return res.status(405).json({ message: "Method not allowed" });
//   } catch (error) {
//     console.error("API error:", error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// }
