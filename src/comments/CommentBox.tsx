import React, { useState } from "react";
import { CommentBoxProps } from "./Comments.types";

/**
 * Responsibility: Render the CommentBox and it's replies related to itself -- whether to show it or not.
 */
export default function CommentBox(props: CommentBoxProps) {
  const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleCollapseClick = () => setIsCollapsed((prevState) => !prevState);
  const handleReplyClick = () => setIsReplying(true);

  return (
    <div>
      <div className="flex items-center">
        <img
          // use webP image format for better performance
          src={props.comment.user_meta.icon}
          alt="user"
          className="w-8 h-8 cover-fit rounded-full"
        />
        <h1 className="ml-2">{props.comment.user_meta.name}</h1>
        {props.comment.reply?.length > 0 && (
          <button
            className="ml-10 bg-slate-400 p-1 rounded-md"
            onClick={handleCollapseClick}
          >
            {/* This could be replaced by icons */}
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
      <p className="text-gray-500">{props.comment.data}</p>
      {props.addComment && <button onClick={handleReplyClick}>Reply</button>}

      {/* self composition or recursion to render the replies */}
      {!isCollapsed &&
        props.comment.reply?.map((commentReply) => (
          <div className="pl-16 border-l-2 border-black">
            <CommentBox comment={commentReply} key={commentReply.id} />
          </div>
        ))}
    </div>
  );
}
