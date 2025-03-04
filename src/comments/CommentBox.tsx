import React from "react";
import { CommentBoxProps } from "./Comments.types";

/**
 * Responsibility: Render the CommentBox and it's replies related to itself -- whether to show it or not.
 */
export default function CommentBox(props: CommentBoxProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <img
          // use webP image format for better performance
          src={props.comment.user_meta.icon}
          alt="user"
          className="w-8 h-8 cover-fit rounded-full"
        />
        <h1 className="ml-2">{props.comment.user_meta.name}</h1>
      </div>
      <p className="text-gray-500">{props.comment.data}</p>

      {/* self composition or recursion to render the replies */}
      {props.comment.reply.map((commentReply) => (
        <div style={{ marginLeft: 60 }}>
          <CommentBox comment={commentReply} key={commentReply.id} />
        </div>
      ))}
    </div>
  );
}
