import React, { useState } from "react";
import CommentBox from "./CommentBox";
import { CommentInfo, CommentsProps } from "./Comments.types";
import { addCommentToList } from "./Comments.utils";

/**
 * Responsibility: render the list of Comment boxes
 */
export default function Comments(props: CommentsProps) {
  const [comments, setComments] = useState(props.data);

  const addComment = (parentId: string, comment: CommentInfo) => {
    setComments((prevState) => addCommentToList(prevState, parentId, comment));
  };

  return comments.map((comment) => {
    return (
      <CommentBox
        comment={comment}
        key={comment.id}
        isCollapsed={props.isCollapsed}
        addComment={addComment}
        // can add more props like deleteComment
      />
    );
  });
}
