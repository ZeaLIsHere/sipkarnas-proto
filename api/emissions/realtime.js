// Sample data
const dummyEmissionData = Array.from({ length: 50 }, (_, i) => ({
  id: `EMISSION${i + 1}`,
  companyId: ['COMP001', 'COMP002', 'COMP003', 'COMP004', 'COMP005'][i % 5],
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  value: Math.floor(Math.random() * 500) + 800,
  status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'danger' : 'normal'
}));

// Vercel Serverless Function for /api/emissions/realtime
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
    // Simulate real-time data with 3 variations
    const variations = dummyEmissionData.map((data, index) => ({
      ...data,
      value: data.value + (Math.sin(Date.now() / 5000 + index) * 50),
      timestamp: new Date().toISOString()
    }));
    res.status(200).json(variations);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
