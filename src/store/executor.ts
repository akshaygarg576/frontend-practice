import { Node, Edge } from '@xyflow/react';
import { NodeData } from '../types/workflow';

// Topological sort: given nodes + edges, return the order to execute them.
// This ensures upstream nodes always run before downstream ones.
// Example: Input → Analyze → Transform means we run them in that exact order.
function topologicalSort(nodes: Node<NodeData>[], edges: Edge[]): Node<NodeData>[] {
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  nodes.forEach((n) => { inDegree.set(n.id, 0); adjacency.set(n.id, []); });

  edges.forEach(({ source, target }) => {
    inDegree.set(target, (inDegree.get(target) ?? 0) + 1);
    adjacency.get(source)!.push(target);
  });

  // Kahn's algorithm: start with nodes that have no incoming edges (roots)
  const queue = nodes.filter((n) => inDegree.get(n.id) === 0);
  const sorted: Node<NodeData>[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    sorted.push(node);
    for (const neighbor of adjacency.get(node.id) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(nodes.find((n) => n.id === neighbor)!);
    }
  }

  return sorted;
}

// Finds the parent node(s) of a given node by tracing edges backwards
function getParentResult(nodeId: string, nodes: Node<NodeData>[], edges: Edge[]): string {
  const parentIds = edges.filter((e) => e.target === nodeId).map((e) => e.source);
  return parentIds
    .map((pid) => nodes.find((n) => n.id === pid)?.data.result ?? '')
    .filter(Boolean)
    .join('\n\n');
}

export async function executeWorkflow(
  nodes: Node<NodeData>[],
  edges: Edge[],
  apiKey: string,
  onNodeUpdate: (id: string, data: Partial<NodeData>) => void
) {
  const sorted = topologicalSort(nodes, edges);

  // We mutate a local copy so each node can see the results of upstream nodes
  const liveNodes = nodes.map((n) => ({ ...n, data: { ...n.data } }));

  for (const node of sorted) {
    const data = node.data;
    onNodeUpdate(node.id, { status: 'running', result: undefined });

    try {
      if (data.type === 'input') {
        // Input node just passes its prompt value downstream as-is
        const result = data.prompt;
        onNodeUpdate(node.id, { status: 'done', result });
        liveNodes.find((n) => n.id === node.id)!.data.result = result;
        continue;
      }

      if (data.type === 'output') {
        // Output node collects and surfaces the final result
        const result = getParentResult(node.id, liveNodes, edges) || '(no upstream result)';
        onNodeUpdate(node.id, { status: 'done', result });
        liveNodes.find((n) => n.id === node.id)!.data.result = result;
        continue;
      }

      // For analyze / transform / validate: call Claude with the upstream result as context
      const context = getParentResult(node.id, liveNodes, edges);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          // Direct browser calls to Anthropic require this header
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: data.prompt,
          messages: [{ role: 'user', content: context || 'No upstream input provided.' }],
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      const json = await response.json();
      const result = json.content?.[0]?.text ?? '(empty response)';

      onNodeUpdate(node.id, { status: 'done', result });
      liveNodes.find((n) => n.id === node.id)!.data.result = result;
    } catch (err) {
      onNodeUpdate(node.id, { status: 'error' });
    }
  }
}
