import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { executeWorkflow } from '../../store/executor';
import { NodeData } from '../../types/workflow';

export default function TopBar() {
  const [apiKey, setApiKey] = useState('');
  const [running, setRunning] = useState(false);
  const { nodes, edges, updateNodeData } = useWorkflowStore();

  const run = async () => {
    if (!apiKey.trim()) { alert('Enter your Anthropic API key first'); return; }
    if (nodes.length === 0) { alert('Add some nodes to the canvas first'); return; }

    setRunning(true);

    // Reset all nodes to idle before starting
    nodes.forEach((n) => updateNodeData(n.id, { status: 'idle', result: undefined }));

    await executeWorkflow(nodes, edges, apiKey, (id, data) =>
      updateNodeData(id, data as Partial<NodeData>)
    );

    setRunning(false);
  };

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4 gap-4 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded" />
        <span className="text-white font-bold text-sm">AgentFlow</span>
      </div>

      <div className="flex-1" />

      <input
        type="password"
        placeholder="Anthropic API key (sk-ant-...)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm w-64 focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
      />

      <button
        onClick={run}
        disabled={running}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
      >
        {running ? 'Running...' : '▶ Run Workflow'}
      </button>
    </header>
  );
}
