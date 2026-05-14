import { NodeType } from '../../types/workflow';

const nodeTypes: { type: NodeType; label: string; icon: string; description: string }[] = [
  { type: 'input',     label: 'Input',     icon: '📥', description: 'Raw data entry point' },
  { type: 'analyze',   label: 'Analyze',   icon: '🔍', description: 'Identify patterns & structure' },
  { type: 'transform', label: 'Transform', icon: '⚙️', description: 'Reshape into target format' },
  { type: 'validate',  label: 'Validate',  icon: '✅', description: 'Check quality & flag issues' },
  { type: 'output',    label: 'Output',    icon: '📤', description: 'Final result sink' },
];

export default function Sidebar() {
  // onDragStart stores the node type in the drag event's dataTransfer object.
  // The canvas reads this on drop to know what kind of node to create.
  // This is the standard HTML5 drag-and-drop API pattern.
  const onDragStart = (e: React.DragEvent, type: NodeType) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-700">
        <h2 className="text-white font-bold text-sm tracking-wide uppercase">Agents</h2>
        <p className="text-gray-500 text-xs mt-1">Drag onto canvas</p>
      </div>

      <div className="flex flex-col gap-2 p-3">
        {nodeTypes.map(({ type, label, icon, description }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 cursor-grab active:cursor-grabbing hover:border-gray-500 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{icon}</span>
              <span className="text-white text-sm font-medium">{label}</span>
            </div>
            <p className="text-gray-500 text-xs">{description}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
