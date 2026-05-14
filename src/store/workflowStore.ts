import { create } from 'zustand';
import {
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import { NodeData, NodeType } from '../types/workflow';

// zustand is a tiny state manager — think of it as a global useState
// that any component can read from or write to without prop drilling

interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  setSelectedNode: (id: string | null) => void;
}

let nodeCounter = 1;

const defaultPrompts: Record<NodeType, string> = {
  input: 'Paste the raw text or data to process here.',
  analyze: 'Analyze the input and identify key patterns, entities, and structure.',
  transform: 'Transform the analyzed data into a structured, clean format.',
  validate: 'Validate the output meets quality standards. Flag any issues.',
  output: '',
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  // React Flow calls this whenever a node moves, gets deleted, or is selected.
  // applyNodeChanges merges the change into the existing node array immutably.
  onNodesChange: (changes) =>
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) as Node<NodeData>[] })),

  onEdgesChange: (changes) =>
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

  // Called when the user draws a connection between two node handles.
  onConnect: (connection) =>
    set((state) => ({ edges: addEdge({ ...connection, animated: true }, state.edges) })),

  addNode: (type, position) => {
    const id = `node-${nodeCounter++}`;
    const newNode: Node<NodeData> = {
      id,
      type: 'agentNode', // maps to our custom React Flow node component
      position,
      data: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        type,
        prompt: defaultPrompts[type],
        status: 'idle',
      },
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
    })),

  setSelectedNode: (id) => set({ selectedNodeId: id }),
}));
