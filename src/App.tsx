import FileExplorer from "./components/fileExplorer/FileExplorer";
import { backendData } from "./mockData/index";

function App() {
  return (
    <div className="app">
      <FileExplorer data={backendData} selectedId={"2"} />
    </div>
  );
}

export default App;
