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

// Vercel Serverless Function for /api/companies
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Handle /api/companies and /api/companies/:id
    const urlParts = req.url.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    if (lastPart && lastPart !== 'companies') {
      // Handle /api/companies/:id
      const company = dummyCompanies.find(c => c.id === lastPart);
      if (!company) {
        res.status(404).json({ error: 'Company not found' });
      } else {
        res.status(200).json(company);
      }
    } else {
      // Handle /api/companies
      res.status(200).json(dummyCompanies);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
