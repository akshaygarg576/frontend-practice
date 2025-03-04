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
  isCollapsed?: boolean;
}

export interface CommentBoxProps {
  comment: CommentInfo;
  isCollapsed?: boolean;
  addComment?: (parentId: string, comment: CommentInfo) => void;
}
