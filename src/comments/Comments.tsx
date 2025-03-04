import React from "react";
import CommentBox from "./CommentBox";
import { CommentsProps } from "./Comments.types";

/**
 * Responsibility: render the list of Comment boxes
 */
export default function Comments(props: CommentsProps) {
  return (
    <div>
      {props.data.map((comment) => {
        return <CommentBox comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
