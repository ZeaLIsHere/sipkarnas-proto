import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import RealTimeEmission from './components/RealTimeEmission';
import CompanyDatabase from './components/CompanyDatabase';
import CoreTaxSync from './components/CoreTaxSync';

function App() {
  // Load activeTab from localStorage or default to 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('sipkarnas-active-tab');
    return savedTab || 'dashboard';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sipkarnas-active-tab', activeTab);
  }, [activeTab]);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'chart-bar', description: 'Overview data emisi' },
    { id: 'realtime', name: 'Real-Time Emisi', icon: 'activity', description: 'Monitor live data' },
    { id: 'companies', name: 'Database Perusahaan', icon: 'building', description: 'Data perusahaan' },
    { id: 'sync', name: 'Sinkronisasi CoreTax', icon: 'refresh-cw', description: 'Sync & logs' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'realtime':
        return <RealTimeEmission />;
      case 'companies':
        return <CompanyDatabase />;
      case 'sync':
        return <CoreTaxSync />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-pattern">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/20 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/10 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed-2"></div>
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 animate-fade-in-left">
              <div className="relative">
              </div>
              <div>
                <span className="text-xl font-bold text-gradient">SIPKAR-NAS</span>
                <p className="text-xs text-secondary-600">Sistem Integrasi Pajak Karbon Nasional</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`navigation-item animate-fade-in-up ${activeTab === item.id ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-2">{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-secondary-600 hover:bg-secondary-100/80 hover:text-secondary-900 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-2 bg-white/50 backdrop-blur-md">
            {navigation.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === 'chart-bar' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v8zm0 8h6v-6h-6v6zm0 8v6h6v-6h-6v6z" />
                    )}
                    {item.icon === 'activity' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )}
                    {item.icon === 'building' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    )}
                    {item.icon === 'refresh-cw' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 014.582 8.001v-5m-15.357-2v5h-5.828M12 15l-2 2M7 12l-2-2m0 0l2-2m2 2l2-2m0 0l2 2" />
                    )}
                  </svg>
                  <div className="text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
