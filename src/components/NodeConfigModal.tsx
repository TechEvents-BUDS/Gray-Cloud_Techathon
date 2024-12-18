import React, { useState, useEffect } from 'react';

const NodeConfigModal = ({ isOpen, nodeConfig, onSave, onClose }) => {
  const [config, setConfig] = useState(nodeConfig);

  useEffect(() => {
    setConfig(nodeConfig); // Sync modal state when nodeConfig changes
  }, [nodeConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(config);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.header}>Node Configuration</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            name="name"
            value={config.name || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Region:</label>
          <input
            name="region"
            value={config.region || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Size:</label>
          <input
            name="size"
            value={config.size || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
          <button onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background for focus
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '25px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    width: '350px',
    maxWidth: '90%',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  header: {
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#333',
    textAlign: 'center',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '0.9em',
    color: '#555',
  },
  input: {
    padding: '8px 10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.95em',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '0.95em',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '0.95em',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default NodeConfigModal;
