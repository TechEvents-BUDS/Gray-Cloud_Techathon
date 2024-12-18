import React from 'react';
import ReactFlow, { Background } from 'reactflow';
import { useFlowNodes } from '../hooks/useFlowNodes';
import 'reactflow/dist/style.css'; // Ensure ReactFlow styles are loaded

const Canvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onNodeClick,
    NodeConfigModal, // Modal component returned from useFlowNodes
    nodeConfig,
    updateNodeConfig,
    isConfigModalOpen,
    closeConfigModal,
  } = useFlowNodes();

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Main React Flow Canvas */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{ height: '100%', border: '1px solid #ddd' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => onNodeClick(node.id)} // Pass node ID
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Configuration Modal */}
      <NodeConfigModal
        isOpen={isConfigModalOpen}
        nodeConfig={nodeConfig}
        onSave={updateNodeConfig}
        onClose={closeConfigModal}
      />
    </div>
  );
};

export default Canvas;
