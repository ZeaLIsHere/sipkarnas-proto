// Sample data
const dummyCompanies = [
  {
    id: 'COMP001',
    npwp: '01.234.567.8-123.000',
    name: 'PT Pertamina Refinery Unit II Dumai'
  },
  {
    id: 'COMP002',
    npwp: '02.345.678.9-456.000',
    name: 'PT Semen Indonesia (Persero) Tbk'
  },
  {
    id: 'COMP003',
    npwp: '03.456.789.0-789.000',
    name: 'PT Chandra Asri Petrochemical Tbk'
  }
];

// Vercel Serverless Function for /api/sync/logs
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
    res.status(200).json(logs);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
