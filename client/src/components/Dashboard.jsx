import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:3001/api/emissions/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));

    fetch('http://localhost:3001/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple text-white p-8 rounded-3xl shadow-2xl hover-lift relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-shadow-lg animate-fade-in-up">SIPKAR-NAS Dashboard</h1>
            <p className="text-primary-100 text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>Sistem Integrasi Pajak Karbon Nasional</p>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-float-delayed"></div>
      </div>

      {/* Map Section */}
      <div className="gradient-card hover-lift">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gradient">Peta Sebaran Pabrik dengan CEMS Aktif</h2>
          <p className="text-sm text-secondary-600">Monitor lokasi pabrik secara real-time</p>
        </div>
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-primary-50 rounded-2xl p-6 h-96 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-8 w-2 h-2 bg-accent-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Interactive Leaflet Map */}
          <MapContainer 
            center={[-2.5, 118]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            className="rounded-xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Company locations with enhanced markers */}
            {companies.map((company, index) => (
              <Marker
                key={company.id}
                position={[company.coordinates.lat, company.coordinates.lng]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `
                    <div style="
                      position: relative;
                      animation: fadeInUp 0.5s ease-out ${index * 0.2}s both;
                    ">
                      <div style="
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        background: rgba(239, 68, 68, 0.3);
                        border: 3px solid #ef4444;
                        border-radius: 50%;
                        top: -20px;
                        left: -20px;
                        animation: pulse 2s infinite;
                      "></div>
                      <div style="
                        position: absolute;
                        width: 32px;
                        height: 32px;
                        background: rgba(239, 68, 68, 0.6);
                        border: 2px solid #ef4444;
                        border-radius: 50%;
                        top: -16px;
                        left: -16px;
                        animation: pulse 2s infinite 0.5s;
                      "></div>
                      <div style="
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: #ef4444;
                        border-radius: 50%;
                        top: -10px;
                        left: -10px;
                        box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
                      "></div>
                      <div style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #ffffff;
                        border-radius: 50%;
                        top: -4px;
                        left: -4px;
                        animation: pulse 2s infinite 1s;
                      "></div>
                    </div>
                  `,
                  iconSize: [40, 40],
                  iconAnchor: [20, 20]
                })}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2 text-secondary-900">{company.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Sektor:</span> {company.sector}</p>
                      <p><span className="font-medium">Lokasi:</span> {company.location}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          company.status === 'sync' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {company.status === 'sync' ? '✓ Sinkron' : '⚠ Gap'}
                        </span>
                      </p>
                      <p><span className="font-medium">Emisi Bulanan:</span> {formatNumber(company.monthlyEmission)} ton CO₂</p>
                      <p><span className="font-medium">Emisi Saat Ini:</span> {formatNumber(company.currentEmission)} ton CO₂</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Enhanced Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-glow-red"></div>
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-secondary-800">Pabrik Aktif CEMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-secondary-600 font-medium">Total Emisi Hari Ini</p>
              <p className="metric-value">
                {formatNumber(stats.totalToday)}
              </p>
              <p className="text-sm text-secondary-500 font-medium">ton CO₂</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-secondary-600 font-medium">Total Emisi Nasional</p>
              <p className="metric-value">
                {formatNumber(stats.totalNational)}
              </p>
              <p className="text-sm text-secondary-500 font-medium">ton CO₂/hari</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2v14a2 2 0 01-2 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-secondary-600 font-medium">Estimasi Pajak</p>
              <p className="metric-value text-lg">
                {formatCurrency(stats.taxEstimation.estimatedRevenue).split(',')[0]}
              </p>
              <p className="text-sm text-secondary-500 font-medium">per bulan</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 2 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-secondary-600 font-medium">Total Pabrik</p>
              <p className="metric-value">
                {companies.length}
              </p>
              <p className="text-sm text-secondary-500 font-medium">CEMS Aktif</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Top Emitters */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Top Penghasil Emisi</h2>
        </div>
        <div className="space-y-3">
          {stats.topEmitters.map((company, index) => (
            <div key={company.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-secondary-900">{company.name}</p>
                  <p className="text-sm text-secondary-600">{company.sector} • {company.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-secondary-900">{formatNumber(company.currentEmission)}</p>
                <p className="text-sm text-secondary-500">ton CO₂</p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Tax Simulation */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-bold text-gradient">Simulasi Pajak</h2>
            <p className="text-sm text-secondary-600">Perhitungan berdasarkan provinsi dan kota</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <h3 className="font-bold text-secondary-800 mb-2">Jawa Barat</h3>
              <p className="text-2xl font-bold text-primary-600">45%</p>
              <p className="text-sm text-secondary-600">Total Pajak</p>
              <p className="text-lg font-semibold text-secondary-800">{formatCurrency(300000000)}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <h3 className="font-bold text-secondary-800 mb-2">Jakarta</h3>
              <p className="text-2xl font-bold text-primary-600">35%</p>
              <p className="text-sm text-secondary-600">Total Pajak</p>
              <p className="text-lg font-semibold text-secondary-800">{formatCurrency(800000000)}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <h3 className="font-bold text-secondary-800 mb-2">Medan</h3>
              <p className="text-2xl font-bold text-primary-600">15%</p>
              <p className="text-sm text-secondary-600">Total Pajak</p>
              <p className="text-lg font-semibold text-secondary-800">{formatCurrency(200000000)}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <h3 className="font-bold text-secondary-800 mb-2">Papua</h3>
              <p className="text-2xl font-bold text-primary-600">5%</p>
              <p className="text-sm text-secondary-600">Total Pajak</p>
              <p className="text-lg font-semibold text-secondary-800">{formatCurrency(100000000)}</p>
            </div>
          </div>
        </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto bg-white/70 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left flex items-center space-x-3">
              <div>
                <div className="text-sm font-medium text-gradient">SIPKARNAS</div>
                <div className="text-xs text-secondary-600">© 2026 Sistem Informasi Pajak Karbon Nasional</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-secondary-800">Server Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-primary-600 font-medium">Real-time Active</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
