import { useWorkflowStore } from '../../store/workflowStore';
import { NodeData } from '../../types/workflow';

export default function PropertiesPanel() {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNode } = useWorkflowStore();

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const data = node.data as NodeData;

  return (
    <div className="w-72 bg-gray-900 border-l border-gray-700 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-sm">{data.label} Config</h2>
          <p className="text-gray-500 text-xs mt-0.5">Node ID: {node.id}</p>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-500 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wide block mb-1">Label</label>
          <input
            value={data.label}
            onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {data.type !== 'output' && (
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wide block mb-1">
              {data.type === 'input' ? 'Input Data' : 'System Prompt'}
            </label>
            {/* The prompt tells the LLM what this node should do.
                For the Input node it's the raw data; for others it's the instruction. */}
            <textarea
              value={data.prompt}
              onChange={(e) => updateNodeData(node.id, { prompt: e.target.value })}
              rows={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        )}

        {data.result && (
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wide block mb-1">Last Result</label>
            <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-xs whitespace-pre-wrap max-h-48 overflow-y-auto">
              {data.result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
