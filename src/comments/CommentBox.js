/**
 * Single comment box component
 * @param {*} props
 * @returns
 */
export default function CommentBox(props) {
  return (
    <div className="mb-4" style={{ marginLeft: `${props.depth * 60}px` }}>
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
    </div>
  );
}
