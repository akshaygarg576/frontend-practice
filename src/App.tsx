import TopBar from './components/ui/TopBar';
import Sidebar from './components/ui/Sidebar';
import Canvas from './components/ui/Canvas';
import PropertiesPanel from './components/ui/PropertiesPanel';
import { useWorkflowStore } from './store/workflowStore';

export default function App() {
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);

  return (
    // Full-screen dark layout: TopBar on top, then a horizontal row of
    // Sidebar | Canvas | PropertiesPanel (panel only visible when a node is selected)
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        {selectedNodeId && <PropertiesPanel />}
      </div>
    </div>
  );
}
