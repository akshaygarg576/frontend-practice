export type CommentInfo = {
  data: string;
  id: string;
  user_meta: {
    name: string;
    icon: string;
  };
  reply: CommentInfo[];
};

export interface CommentsProps {
  data: CommentInfo[];
}

export interface CommentBoxProps {
  comment: CommentInfo;
}
