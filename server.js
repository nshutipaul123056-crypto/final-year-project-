console.log('🚀 Starting BloomTrack Backend...');

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: '✅ BloomTrack API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      flowers: '/api/flowers',
      test: '/api/test'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API route is working!' });
});

// Mock flowers data (for testing without database)
app.get('/api/flowers', (req, res) => {
  const flowers = [
    { id: 1, name: 'Red Freedom Rose', price: 1.50, category: 'Rose' },
    { id: 2, name: 'White Avalanche Rose', price: 1.75, category: 'Rose' },
    { id: 3, name: 'Sunflower Giant', price: 0.75, category: 'Sunflower' }
  ];
  res.json(flowers);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📊 Test at http://localhost:${PORT}/api/health`);
});