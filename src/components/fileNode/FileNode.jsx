import { ICON_MAP } from "../../constants";
import Icon from "../icon/Icon";
import "./FileNode.css";
import React, { useMemo, useState } from "react";
// ▶▼•

// const ICON_MAP = {
//   ARROW_LEFT: "▶",
//   ARROW_BOTTOM: "▼",
//   DOT: "•",
// };

// Responsibility of FileNode
// - indentation
// - all descendants rendering (recursion)
// - handle state of expand/collapse
// todo: check performance
const FileNode = ({ data, depth, selectedId }) => {
  // made an assumption about default value
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    console.log("clicked toggle");
    setIsExpanded((prev) => !prev);
  };

  const hasChildren = data.children?.length > 0;

  const getIconType = () => {
    console.log("Icon map", ICON_MAP.DOT);
    if (!hasChildren) {
      return "DOT";
    } else if (isExpanded) {
      return "ARROW_BOTTOM";
    } else if (!isExpanded) {
      return "ARROW_LEFT";
    }
  };

  const renderLabel = () => {
    if (selectedId === data.id) {
      return (
        <a
          style={{ marginLeft: depth * 16 + "px" }}
          className="file-label file-anchor"
          onClick={handleToggle}
        >
          <Icon type={getIconType()} />
          <p className="title">{data.name}</p>
        </a>
      );
    }

    return (
      <button
        style={{ marginLeft: depth * 16 + "px" }}
        className="file-label"
        onClick={handleToggle}
      >
        <Icon type={getIconType()} />
        <p className="title">{data.name}</p>
      </button>
    );
  };

  return (
    <li>
      {renderLabel()}
      {isExpanded &&
        hasChildren &&
        data.children.map((file) => {
          return (
            <FileNode
              depth={depth + 1}
              data={file}
              key={file.id}
              selectedId={selectedId}
            />
          );
        })}
    </li>
  );
};

export default FileNode;
