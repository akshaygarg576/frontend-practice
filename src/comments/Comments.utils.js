import CommentBox from "./CommentBox";

/**
 * recursive function to iterate over the list of comments
 * @param {*} comments
 * @param {*} depth
 * @returns
 */
export function iterateComments(comments, depth = 0) {
  return comments.reduce((result, comment) => {
    result.push(<CommentBox comment={comment} depth={depth} />);

    if (comment.reply?.length > 0) {
      result.push(...iterateComments(comment.reply, depth + 1));
    }

    return result;
  }, []);
}
