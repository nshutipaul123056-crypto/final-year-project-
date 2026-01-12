import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AgricultureIcon from '@mui/icons-material/Agriculture';

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🌺 BloomTrack Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Web-Based Management System for Specialty Cut Flower Farms in Rwanda
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Backend Status Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Backend Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                API Server: {data?.status === 'healthy' ? '✅ Connected' : '❌ Disconnected'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Timestamp: {data?.timestamp}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mr: 2, mb: 1 }}
                component={Link}
                to="/flowers"
              >
                View Flowers
              </Button>
              <Button 
                variant="outlined" 
                sx={{ mr: 2, mb: 1 }}
                component={Link}
                to="/inventory"
              >
                Check Inventory
              </Button>
              <Button 
                variant="outlined"
                component={Link}
                to="/analytics"
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// Flowers Component
const Flowers = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/flowers')
      .then(response => response.json())
      .then(data => {
        setFlowers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🌸 Flower Varieties
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        From your MySQL database
      </Typography>
      
      <Grid container spacing={3}>
        {flowers.map((flower) => (
          <Grid item xs={12} sm={6} md={4} key={flower.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {flower.name}
                </Typography>
                <Typography color="text.secondary">
                  Category: {flower.category || 'Rose'}
                </Typography>
                <Typography variant="body2">
                  Price: ${flower.price?.toFixed(2) || '1.50'} per stem
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Inventory Component
const Inventory = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📦 Inventory Management
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Track fertilizers, seeds, and supplies
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography paragraph>
          This module will synchronize input usage with harvest outputs to minimize stockouts and post-harvest spoilage.
        </Typography>
        <Typography paragraph>
          Features:
        </Typography>
        <ul>
          <li>Real-time stock monitoring</li>
          <li>Reorder level alerts</li>
          <li>Supplier tracking</li>
          <li>Cost analysis per crop cycle</li>
        </ul>
      </Paper>
    </Container>
  );
};

// Analytics Component
const Analytics = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Profitability Analytics
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Activity-Based Costing per stem and per bouquet
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography paragraph>
          This module implements Activity-Based Costing (ABC) to provide granular profitability analytics.
        </Typography>
        <Typography paragraph>
          Calculate exact profit margins for:
        </Typography>
        <ul>
          <li>Individual flower varieties (Red Freedom Rose vs White Avalanche Rose)</li>
          <li>Mixed bouquets</li>
          <li>Per crop cycle</li>
          <li>Per harvest batch</li>
        </ul>
      </Paper>
    </Container>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <AgricultureIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BloomTrack
            </Typography>
            <Button color="inherit" component={Link} to="/">
              <DashboardIcon sx={{ mr: 1 }} /> Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/flowers">
              <LocalFloristIcon sx={{ mr: 1 }} /> Flowers
            </Button>
            <Button color="inherit" component={Link} to="/inventory">
              <InventoryIcon sx={{ mr: 1 }} /> Inventory
            </Button>
            <Button color="inherit" component={Link} to="/analytics">
              <AnalyticsIcon sx={{ mr: 1 }} /> Analytics
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;