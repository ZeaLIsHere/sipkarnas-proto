import React, { useState, useEffect } from 'react';

const CoreTaxSync = () => {
  const [syncLogs, setSyncLogs] = useState([]);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSyncLogs();
    
    // Simulate auto-sync every 30 seconds
    const interval = setInterval(() => {
      if (isAutoSyncEnabled) {
        performAutoSync();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAutoSyncEnabled]);

  const fetchSyncLogs = () => {
    setIsLoading(true);
    fetch('http://localhost:3001/api/sync/logs')
      .then(res => res.json())
      .then(data => {
        setSyncLogs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sync logs:', err);
        setIsLoading(false);
      });
  };

  const performAutoSync = () => {
    // Simulate auto-sync
    const newLog = {
      id: `AUTO${Date.now()}`,
      timestamp: new Date().toISOString(),
      companyId: 'COMP001',
      companyName: 'Auto Sync',
      status: Math.random() > 0.2 ? 'success' : 'failed',
      emissionReported: Math.floor(Math.random() * 1000) + 500,
      emissionActual: Math.floor(Math.random() * 1000) + 500,
      difference: Math.floor(Math.random() * 100) - 50
    };
    
    setSyncLogs(prev => [newLog, ...prev.slice(0, 19)]);
    setLastSyncTime(new Date());
  };

  const handleManualSync = () => {
    performAutoSync();
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    return status === 'success' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Berhasil
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Gagal
      </span>
    );
  };

  const getDifferenceBadge = (difference) => {
    const absDiff = Math.abs(difference);
    if (absDiff < 10) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {difference > 0 ? '+' : ''}{difference}%
        </span>
      );
    } else if (absDiff < 25) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
          {difference > 0 ? '+' : ''}{difference}%
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {difference > 0 ? '+' : ''}{difference}%
        </span>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const successCount = syncLogs.filter(log => log.status === 'success').length;
  const failedCount = syncLogs.filter(log => log.status === 'failed').length;
  const totalSyncs = syncLogs.length;
  const successRate = totalSyncs > 0 ? (successCount / totalSyncs * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple text-white p-8 rounded-3xl shadow-2xl hover-lift relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-shadow-lg animate-fade-in-up">Sinkronisasi CoreTax</h1>
            <p className="text-primary-100 text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>Kelola sinkronisasi data emisi ke sistem perpajakan</p>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-float-delayed"></div>
      </div>

      {/* Sync Controls */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Kontrol Sinkronisasi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-secondary-900">Sinkronisasi Otomatis</h3>
                <p className="text-sm text-secondary-600">Jalankan sinkronisasi otomatis setiap hari</p>
              </div>
              <button
                onClick={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAutoSyncEnabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAutoSyncEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="text-sm text-secondary-600">
              <p>Terakhir sync: {formatTime(lastSyncTime.toISOString())}</p>
              <p>Status: {isAutoSyncEnabled ? 'Aktif' : 'Tidak Aktif'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-secondary-900 mb-2">Sinkronisasi Manual</h3>
            <button
              onClick={handleManualSync}
              className="btn-primary w-full md:w-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Sync Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Sync</p>
              <p className="text-2xl font-bold text-secondary-900">{totalSyncs}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Berhasil</p>
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Gagal</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Success Rate</p>
              <p className="text-2xl font-bold text-purple-600">{successRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Check Analysis */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Cross-Check Emisi vs Laporan</h2>
          <p className="text-sm text-secondary-600">Analisis selisih antara data CEMS dan laporan wajib pajak</p>
        </div>
        <div className="space-y-4">
          {syncLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusBadge(log.status)}
                <div>
                  <p className="font-medium text-secondary-900">{log.companyName}</p>
                  <p className="text-sm text-secondary-600">{formatTime(log.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-secondary-600">Emisi CEMS</p>
                  <p className="font-semibold text-secondary-900">{formatNumber(log.emissionActual)} ton</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary-600">Laporan WP</p>
                  <p className="font-semibold text-secondary-900">{formatNumber(log.emissionReported)} ton</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary-600">Selisih</p>
                  {getDifferenceBadge(log.difference)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Logs */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Log Transmisi</h2>
          <button onClick={fetchSyncLogs} className="btn-secondary text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {syncLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-secondary-900">{log.companyName}</p>
                  <p className="text-sm text-secondary-600">{formatTime(log.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusBadge(log.status)}
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">
                    {formatNumber(log.emissionActual)} ton
                  </p>
                  <p className="text-xs text-secondary-500">transmitted</p>
                </div>
              </div>
            </div>
          ))}
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

export default CoreTaxSync;
