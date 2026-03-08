import React, { useState, useEffect } from 'react';

const CompanyDatabase = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/companies')
      .then(res => res.json())
      .then(data => {
        setCompanies(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching companies:', err);
        setIsLoading(false);
      });
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const getStatusBadge = (status) => {
    return status === 'sync' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Sinkron
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Gap
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple text-white p-8 rounded-3xl shadow-2xl hover-lift relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-shadow-lg animate-fade-in-up">Database Perusahaan</h1>
            <p className="text-primary-100 text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>Kelola data profil dan riwayat emisi perusahaan</p>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-float-delayed"></div>
      </div>

      {/* Company List */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Daftar Perusahaan</h2>
          <p className="text-sm text-secondary-600">Total {companies.length} perusahaan terdaftar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCompany(company)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-secondary-900">{company.name}</h3>
                  <p className="text-sm text-secondary-600">{company.sector}</p>
                </div>
                {getStatusBadge(company.status)}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">NPWP:</span>
                  <span className="font-medium text-secondary-900">{company.npwp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Lokasi:</span>
                  <span className="font-medium text-secondary-900">{company.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Emisi Bulan Ini:</span>
                  <span className="font-medium text-secondary-900">{formatNumber(company.monthlyEmission)} ton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Emisi Saat Ini:</span>
                  <span className="font-medium text-secondary-900">{formatNumber(company.currentEmission)} ton</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header with Company Overview */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-purple text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                    <p className="text-primary-100">{selectedCompany.sector} • {selectedCompany.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${
                    selectedCompany.status === 'sync'
                      ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                      : 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      selectedCompany.status === 'sync' ? 'bg-green-400' : 'bg-yellow-400'
                    } animate-pulse`}></div>
                    <span>{selectedCompany.status === 'sync' ? '✓ Sinkron' : '⚠ Gap'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Company Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Basic Info Card */}
                <div className="card group">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-secondary-800">Informasi Dasar</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">NPWP/NIB</label>
                      <p className="font-mono text-secondary-900 font-medium">{selectedCompany.npwp}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Koordinat CEMS</label>
                      <p className="font-mono text-secondary-900 text-sm">
                        {selectedCompany.coordinates.lat.toFixed(4)}, {selectedCompany.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="card group">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-secondary-800">Lokasi & Status</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Provinsi</label>
                      <p className="text-secondary-900 font-medium">{selectedCompany.location}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Status DJP</label>
                      <div className="mt-1">{getStatusBadge(selectedCompany.status)}</div>
                    </div>
                  </div>
                </div>

                {/* Sector Card */}
                <div className="card group">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-secondary-800">Sektor Industri</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Kategori</label>
                      <p className="text-secondary-900 font-medium">{selectedCompany.sector}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Kapasitas</label>
                      <p className="text-secondary-900">
                        {selectedCompany.sector === 'Energi' ? 'High Capacity' :
                         selectedCompany.sector === 'Petrokimia' ? 'Heavy Industry' : 'Manufacturing'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emission Statistics */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistik Emisi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-200 px-2 py-1 rounded-full">BULANAN</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-blue-700 font-medium">Akumulasi Bulan Ini</p>
                      <p className="text-2xl font-bold text-blue-900">{formatNumber(selectedCompany.monthlyEmission)}</p>
                      <p className="text-sm text-blue-600">ton CO₂</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-200 px-2 py-1 rounded-full">SAAT INI</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-green-700 font-medium">Emisi Real-Time</p>
                      <p className="text-2xl font-bold text-green-900">{formatNumber(selectedCompany.currentEmission)}</p>
                      <p className="text-sm text-green-600">ton CO₂/hari</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-200 px-2 py-1 rounded-full">RATA-RATA</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-orange-700 font-medium">Rata-rata Harian</p>
                      <p className="text-2xl font-bold text-orange-900">{formatNumber(Math.round(selectedCompany.monthlyEmission / 30))}</p>
                      <p className="text-sm text-orange-600">ton CO₂/hari</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emission History Table */}
              <div className="card mb-6">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Riwayat Emisi 12 Bulan
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-secondary-200">
                        <th className="text-left py-3 px-4 font-semibold text-secondary-800">Bulan</th>
                        <th className="text-right py-3 px-4 font-semibold text-secondary-800">Emisi (ton CO₂)</th>
                        <th className="text-center py-3 px-4 font-semibold text-secondary-800">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCompany.yearlyHistory.map((month, index) => {
                        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                                          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                        const isHighEmission = month.emission > selectedCompany.monthlyEmission * 0.1; // Above 10% of monthly avg
                        
                        return (
                          <tr key={index} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors">
                            <td className="py-3 px-4 text-secondary-900 font-medium">
                              {monthNames[index]} 2024
                            </td>
                            <td className="py-3 px-4 text-right text-secondary-900 font-semibold">
                              {formatNumber(month.emission)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                isHighEmission 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {isHighEmission ? 'Tinggi' : 'Normal'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-secondary-300 bg-secondary-50">
                        <td className="py-3 px-4 font-bold text-secondary-900">Total Tahunan</td>
                        <td className="py-3 px-4 text-right font-bold text-secondary-900">
                          {formatNumber(selectedCompany.yearlyHistory.reduce((sum, month) => sum + month.emission, 0))}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Rata-rata: {formatNumber(Math.round(selectedCompany.yearlyHistory.reduce((sum, month) => sum + month.emission, 0) / 12))}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Informasi Tambahan</p>
                      <p className="text-sm text-blue-600 mt-1">
                        Data emisi bulanan menunjukkan variasi musiman. Bulan dengan emisi tinggi 
                        (&gt;10% dari rata-rata bulanan) ditandai sebagai "Tinggi".
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button className="btn-secondary flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export Data</span>
                </button>
                <button className="btn-primary flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sync Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default CompanyDatabase;
