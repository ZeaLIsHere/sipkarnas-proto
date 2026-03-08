import React, { useState, useEffect, useMemo } from 'react';

// Import dummy data for company names
const dummyCompanies = [
  { id: 'COMP001', name: 'PT Pertamina Refinery Unit II Dumai' },
  { id: 'COMP002', name: 'PT Semen Indonesia (Persero) Tbk' },
  { id: 'COMP003', name: 'PT Chandra Asri Petrochemical Tbk' },
  { id: 'COMP004', name: 'PT Indocement Tunggal Prakarsa Tbk' },
  { id: 'COMP005', name: 'PT Pupuk Indonesia (Persero)' }
];

const RealTimeEmission = () => {
  const [emissions, setEmissions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('hour');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmissions = () => {
      setIsLoading(true);
      fetch('/api/emissions/realtime')
        .then(res => res.json())
        .then(data => {
          setEmissions(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching emissions:', err);
          setIsLoading(false);
        });
    };

    // Initial fetch only
    fetchEmissions();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'danger':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const chartData = useMemo(() => {
    console.log('Calculating chartData for period:', selectedPeriod);
    let baseMultiplier = 1; // Default untuk hour

    if (selectedPeriod === 'day') {
      baseMultiplier = 24; // 24 jam dalam sehari
    } else if (selectedPeriod === 'month') {
      baseMultiplier = 24 * 30; // 24 jam x 30 hari dalam sebulan
    }

    console.log('Multiplier:', baseMultiplier);

    // Base hourly values for each company (predictable values)
    const baseHourlyValues = [
      { label: 'Pertamina', value: 2800 },
      { label: 'Semen Indo', value: 1900 },
      { label: 'Chandra Asri', value: 3600 },
      { label: 'Indocement', value: 2300 },
      { label: 'Pupuk Indo', value: 2900 }
    ];

    // Calculate values based on period with predictable variation
    const result = baseHourlyValues.map(company => ({
      label: company.label,
      value: company.value * baseMultiplier // Exact multiplication without random
    }));

    console.log('ChartData result:', result);
    return result;
  }, [selectedPeriod]); // Re-calculate when selectedPeriod changes

  const maxValue = useMemo(() => Math.max(...chartData.map(d => d.value)) || 4000, [chartData]);

  if (isLoading) {
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
            <h1 className="text-4xl font-bold mb-2 text-shadow-lg animate-fade-in-up">Real-Time Emisi</h1>
            <p className="text-primary-100 text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>Pantau emisi karbon secara langsung dari sensor CEMS</p>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-float-delayed"></div>
      </div>

      {/* Period Selector */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {['hour', 'day', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {period === 'hour' ? 'Per Jam' : period === 'day' ? 'Per Hari' : 'Per Bulan'}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Status Summary */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-800">Status Emisi Real-Time</h2>
          <p className="text-sm text-secondary-600">Data terbaru saat halaman dimuat</p>
        </div>
        
        {/* Current Emission Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {emissions.filter(e => e.status === 'normal').length}
            </div>
            <p className="text-sm text-secondary-600">Sensor Normal</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {emissions.filter(e => e.status === 'warning').length}
            </div>
            <p className="text-sm text-secondary-600">Peringatan</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {emissions.filter(e => e.status === 'danger').length}
            </div>
            <p className="text-sm text-secondary-600">Bahaya</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatNumber(emissions.reduce((sum, e) => sum + e.value, 0) || 0)}
            </div>
            <p className="text-sm text-secondary-600">Total Emisi (ton)</p>
            {/* Debug info */}
            <p className="text-xs text-green-800 mt-2">Period: {selectedPeriod}</p>
            <p className="text-xs text-green-800">ChartData[0]: {chartData[0]?.value || 'N/A'}</p>
          </div>
        </div>

        {/* Company Emission Overview */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-secondary-800 mb-3">Ringkasan Perusahaan</h3>
          {emissions.length > 0 ? (
            emissions.slice(0, 10).map((emission, index) => (
              <div key={emission.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    emission.status === 'normal' ? 'bg-green-500' :
                    emission.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-secondary-900">Sensor {emission.id}</p>
                    <p className="text-sm text-secondary-600">{formatTime(emission.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-secondary-900">{formatNumber(emission.value)}</p>
                  <p className="text-sm text-secondary-500">ton CO₂</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-secondary-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p>Menunggu data real-time...</p>
            </div>
          )}
        </div>
      </div>

      {/* Auto-save notification */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-800">Auto-save Database</p>
            <p className="text-sm text-blue-600">Semua data emisi tersimpan otomatis dengan timestamp</p>
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

export default RealTimeEmission;
