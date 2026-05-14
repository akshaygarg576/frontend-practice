export type NodeType = 'input' | 'analyze' | 'transform' | 'validate' | 'output';

export type NodeStatus = 'idle' | 'running' | 'done' | 'error';

// React Flow v12 requires node data to extend Record<string, unknown>
// so it can treat node data generically across the library internals.
export interface NodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  prompt: string;
  status: NodeStatus;
  result?: string;
}
