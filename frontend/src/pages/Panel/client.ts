// frontend/src/pages/Panel/client.ts
console.log('VITE_HOST:', import.meta.env.VITE_HOST);
console.log('VITE_PORT:', import.meta.env.VITE_PORT);

function setupWebSocket() {
  const host = import.meta.env.VITE_HOST || 'localhost';
  const port = import.meta.env.VITE_PORT || 5173;
  const wsUrl = `ws://${host}:${port}/`;

  console.log('Connecting to WebSocket at:', wsUrl);

  try {
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('[vite] connected.');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onmessage = (message) => {
      console.log('[vite] message:', message.data);
    };
  } catch (error) {
    console.error('Failed to create WebSocket:', error);
  }
}

setupWebSocket();
