import { iterateComments } from "./Comments.utils";

/**
 * Comment List component
 * @param {*} props
 * @returns
 */
export default function Comments(props) {
  const { data: comments } = props;

  return <div>{iterateComments(comments)}</div>;
}
