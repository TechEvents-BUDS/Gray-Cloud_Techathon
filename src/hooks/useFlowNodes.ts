import { useCallback, useState } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useStore } from '../store/useStore';
import NodeConfigModal from '../components/NodeConfigModal';
export let globalprompt = '';

export function useFlowNodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const addNode = useStore((state) => state.addNode);

  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeConfig, setNodeConfig] = useState({});
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));

      // Generate and log the prompt
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (sourceNode && targetNode) {
        const sourceConfig = sourceNode.data.configurations || {};
        const targetConfig = targetNode.data.configurations || {};
        
        console.log(
          `Node ${sourceNode.data.label} (Type: ${sourceNode.data.type}, Configurations: ${JSON.stringify(
            sourceConfig
          )}) is connected with Node ${targetNode.data.label} (Type: ${targetNode.data.type}, Configurations: ${JSON.stringify(
            targetConfig
          )}).`
        );
        globalprompt = `Node ${sourceNode.data.label} (Type: ${sourceNode.data.type}, Configurations: ${JSON.stringify(
            sourceConfig
          )}) is connected with Node ${targetNode.data.label} (Type: ${targetNode.data.type}, Configurations: ${JSON.stringify(
            targetConfig
          )}).`
      }
    },
    [setEdges, nodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - event.target.getBoundingClientRect().left,
        y: event.clientY - event.target.getBoundingClientRect().top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'custom',
        position,
        data: { type, label: type, configurations: { name: '', region: 'us-east-1', size: 'medium' } },
      };

      setNodes((nds) => nds.concat(newNode));
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback(
    (nodeId) => {
      const node = nodes.find((node) => node.id === nodeId);
      if (node) {
        setSelectedNode(node);
        setNodeConfig(node.data.configurations || {});
        setConfigModalOpen(true);
      }
    },
    [nodes]
  );

  const updateNodeConfig = (newConfig) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, configurations: newConfig } }
            : node
        )
      );
      setConfigModalOpen(false);
    }
  };

  const closeConfigModal = () => setConfigModalOpen(false);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onNodeClick,
    NodeConfigModal, // Return the modal component
    nodeConfig,
    updateNodeConfig,
    isConfigModalOpen,
    closeConfigModal,
  };
}
