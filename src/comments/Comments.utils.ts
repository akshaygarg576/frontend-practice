import { CommentInfo } from "./Comments.types";

// helper for adding new comment into the state correctly
export const addCommentToList = (
  comments: CommentInfo[],
  parentId: string,
  newComment: CommentInfo
): CommentInfo[] => {
  // Steps
  // 1. iterate the comments
  // 2. find the parent node via id
  // 3. add newComment as reply to the parentNode
  // 4. return mutated comments

  // root level
  if (!parentId) {
    // assuming new comments go last (could be sorted as per timestamp in the future)
    return [...comments, newComment];
  }

  // added as reply to existing comment
  return comments.map((comment: CommentInfo) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        reply: [...comment.reply, newComment],
      };
    } else if (comment.reply?.length > 0) {
      return {
        ...comment,
        reply: addCommentToList(comment.reply, parentId, newComment),
      };
    } else {
      return comment;
    }
  });
};
