const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const dummyCompanies = [
  {
    id: 'COMP001',
    npwp: '01.234.567.8-123.000',
    name: 'PT Pertamina Refinery Unit II Dumai',
    sector: 'Energi',
    location: 'Riau',
    coordinates: { lat: 1.6671, lng: 101.4436 },
    currentEmission: 2847.5,
    status: 'sync',
    monthlyEmission: 85000,
    yearlyHistory: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      emission: Math.floor(Math.random() * 5000) + 80000
    }))
  },
  {
    id: 'COMP002',
    npwp: '02.345.678.9-456.000',
    name: 'PT Semen Indonesia (Persero) Tbk',
    sector: 'Semen',
    location: 'Jawa Tengah',
    coordinates: { lat: -7.7956, lng: 110.3695 },
    currentEmission: 1892.3,
    status: 'gap',
    monthlyEmission: 56700,
    yearlyHistory: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      emission: Math.floor(Math.random() * 3000) + 54000
    }))
  },
  {
    id: 'COMP003',
    npwp: '03.456.789.0-789.000',
    name: 'PT Chandra Asri Petrochemical Tbk',
    sector: 'Petrokimia',
    location: 'Jawa Barat',
    coordinates: { lat: -6.1200, lng: 106.1500 },
    currentEmission: 3657.8,
    status: 'sync',
    monthlyEmission: 109000,
    yearlyHistory: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      emission: Math.floor(Math.random() * 8000) + 101000
    }))
  },
  {
    id: 'COMP004',
    npwp: '04.567.890.1-890.001',
    name: 'PT Indocement Tunggal Prakarsa Tbk',
    sector: 'Semen',
    location: 'Jawa Barat',
    coordinates: { lat: -6.2088, lng: 107.0370 },
    currentEmission: 2341.5,
    status: 'sync',
    monthlyEmission: 70000,
    yearlyHistory: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      emission: Math.floor(Math.random() * 4000) + 66000
    }))
  },
  {
    id: 'COMP005',
    npwp: '05.678.901.2-901.002',
    name: 'PT Pupuk Indonesia (Persero)',
    sector: 'Petrokimia',
    location: 'Jawa Timur',
    coordinates: { lat: -7.7956, lng: 112.6407 },
    currentEmission: 2897.3,
    status: 'gap',
    monthlyEmission: 86500,
    yearlyHistory: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      emission: Math.floor(Math.random() * 6000) + 80500
    }))
  }
];

const dummyEmissionData = Array.from({ length: 50 }, (_, i) => ({
  id: `EMISSION${i + 1}`,
  companyId: dummyCompanies[i % 5].id,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  value: Math.floor(Math.random() * 500) + 800,
  status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'danger' : 'normal'
}));

// API Routes
app.get('/api/companies', (req, res) => {
  res.json(dummyCompanies);
});

app.get('/api/companies/:id', (req, res) => {
  const company = dummyCompanies.find(c => c.id === req.params.id);
  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json(company);
});

app.get('/api/emissions/realtime', (req, res) => {
  // Simulate real-time data with 3 variations
  const variations = dummyEmissionData.map((data, index) => ({
    ...data,
    value: data.value + (Math.sin(Date.now() / 5000 + index) * 50),
    timestamp: new Date().toISOString()
  }));
  res.json(variations);
});

app.get('/api/emissions/stats', (req, res) => {
  const totalToday = dummyEmissionData.reduce((sum, e) => sum + e.value, 0);
  const totalNational = dummyCompanies.reduce((sum, c) => sum + c.currentEmission, 0);
  
  res.json({
    totalToday: totalToday,
    totalNational: totalNational,
    topEmitters: dummyCompanies
      .sort((a, b) => b.currentEmission - a.currentEmission)
      .slice(0, 5),
    taxEstimation: {
      rate: 15000, // per ton CO2
      estimatedRevenue: totalNational * 15000,
      revenueSharing: {
        central: 0.6,
        provincial: 0.3,
        local: 0.1
      }
    }
  });
});

app.get('/api/sync/logs', (req, res) => {
  const logs = Array.from({ length: 20 }, (_, i) => ({
    id: `LOG${i + 1}`,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    companyId: dummyCompanies[i % 3].id,
    companyName: dummyCompanies[i % 3].name,
    status: Math.random() > 0.2 ? 'success' : 'failed',
    emissionReported: Math.floor(Math.random() * 1000) + 500,
    emissionActual: Math.floor(Math.random() * 1000) + 500,
    difference: Math.floor(Math.random() * 100) - 50
  }));
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
