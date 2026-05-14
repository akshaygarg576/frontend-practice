import { Handle, Position, NodeProps } from '@xyflow/react';
import { NodeData, NodeType } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

// Each node type gets a distinct color so users can read the workflow at a glance
const typeConfig: Record<NodeType, { color: string; icon: string }> = {
  input:     { color: 'bg-blue-500',   icon: '📥' },
  analyze:   { color: 'bg-purple-500', icon: '🔍' },
  transform: { color: 'bg-orange-500', icon: '⚙️' },
  validate:  { color: 'bg-green-500',  icon: '✅' },
  output:    { color: 'bg-gray-600',   icon: '📤' },
};

const statusStyles: Record<NodeData['status'], string> = {
  idle:    'border-gray-700',
  running: 'border-yellow-400 shadow-yellow-400/30 shadow-lg animate-pulse',
  done:    'border-green-400 shadow-green-400/20 shadow-lg',
  error:   'border-red-400 shadow-red-400/20 shadow-lg',
};

// NodeProps<T> in v12 expects a full Node type, not just data.
// We use plain NodeProps (data: Record<string,unknown>) and cast via unknown.
export default function AgentNode({ id, data }: NodeProps) {
  const nodeData = data as unknown as NodeData;
  const { color, icon } = typeConfig[nodeData.type];
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);

  return (
    // Handle = the connection point (dot) on the edge of the node.
    // Position.Top = input handle (data flows in from above)
    // Position.Bottom = output handle (data flows out below)
    <div
      onClick={() => setSelectedNode(id)}
      className={`w-48 rounded-xl border-2 bg-gray-800 cursor-pointer transition-all ${statusStyles[nodeData.status]}`}
    >
      {nodeData.type !== 'input' && (
        <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />
      )}

      <div className={`${color} rounded-t-xl px-3 py-2 flex items-center gap-2`}>
        <span className="text-sm">{icon}</span>
        <span className="text-white text-sm font-semibold">{nodeData.label}</span>
      </div>

      <div className="px-3 py-2">
        {nodeData.status === 'running' && (
          <p className="text-yellow-400 text-xs">Running...</p>
        )}
        {nodeData.status === 'done' && nodeData.result && (
          <p className="text-gray-300 text-xs line-clamp-3">{nodeData.result}</p>
        )}
        {nodeData.status === 'idle' && (
          <p className="text-gray-500 text-xs italic truncate">{nodeData.prompt.slice(0, 50)}...</p>
        )}
        {nodeData.status === 'error' && (
          <p className="text-red-400 text-xs">Error — check config</p>
        )}
      </div>

      {nodeData.type !== 'output' && (
        <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
      )}
    </div>
  );
}
