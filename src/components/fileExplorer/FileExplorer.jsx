import "./FileExplorer.css";
import FileNode from "../fileNode/FileNode";

// Requirement:
// 1. expand/collapse -> THIS IS REQUIRED
// 2. expand all/collapse all? --> ISN"T
// 3. LARGE LIST --> potentially yes
// 4. anything to show on hover? -> no

// Responsibility:
// 1. FileExplorer
// - this will be rendering the parent nodes (file/directory)
const FileExplorer = ({ data, selectedId }) => {
  return (
    <ul>
      {data.map((file) => {
        return (
          <FileNode
            key={file.id}
            data={file}
            depth={0}
            selectedId={selectedId}
          />
        );
      })}
    </ul>
  );
};

export default FileExplorer;
