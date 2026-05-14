import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflowStore } from '../../store/workflowStore';
import AgentNode from '../nodes/AgentNode';
import { NodeType } from '../../types/workflow';

// Register our custom node component under the key 'agentNode'.
// When React Flow sees a node with type='agentNode', it renders this component.
const nodeTypes = { agentNode: AgentNode };

export default function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useWorkflowStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type || !canvasRef.current) return;

      // Convert the browser pixel coordinates of the drop into canvas coordinates.
      // The canvas can be panned and zoomed, so raw clientX/Y won't be correct.
      const bounds = canvasRef.current.getBoundingClientRect();
      const position = {
        x: e.clientX - bounds.left - 96,
        y: e.clientY - bounds.top - 40,
      };

      addNode(type, position);
    },
    [addNode]
  );

  return (
    <div ref={canvasRef} className="flex-1 h-full bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-950"
      >
        {/* Background renders the dot grid pattern */}
        <Background color="#374151" variant={BackgroundVariant.Dots} gap={20} size={1} />
        {/* Controls = zoom in/out/fit buttons */}
        <Controls className="!bg-gray-800 !border-gray-700" />
        {/* MiniMap = the small overview in the corner */}
        <MiniMap className="!bg-gray-800" nodeColor="#4B5563" />
      </ReactFlow>
    </div>
  );
}
