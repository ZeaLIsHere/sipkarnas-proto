import React from 'react';

const LoadingSkeleton = ({ type = 'card', className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'stat':
        return (
          <div className={`stat-card ${className}`}>
            <div className="flex items-center justify-between">
              <div className="space-y-3 flex-1">
                <div className="loading-skeleton h-4 w-24 rounded"></div>
                <div className="loading-skeleton h-8 w-32 rounded"></div>
                <div className="loading-skeleton h-4 w-16 rounded"></div>
              </div>
              <div className="loading-skeleton w-14 h-14 rounded-2xl"></div>
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className={`gradient-card ${className}`}>
            <div className="card-header space-y-3">
              <div className="loading-skeleton h-8 w-64 rounded"></div>
              <div className="loading-skeleton h-4 w-48 rounded"></div>
            </div>
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-primary-50 rounded-2xl p-6 h-96">
              <div className="loading-skeleton w-full h-full rounded-2xl"></div>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className={`card ${className}`}>
            <div className="card-header space-y-3">
              <div className="loading-skeleton h-6 w-48 rounded"></div>
              <div className="loading-skeleton h-4 w-32 rounded"></div>
            </div>
            <div className="h-64 flex items-end space-x-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex-1">
                  <div 
                    className="loading-skeleton w-full rounded-t"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'table':
        return (
          <div className={`card ${className}`}>
            <div className="card-header space-y-3">
              <div className="loading-skeleton h-6 w-48 rounded"></div>
              <div className="loading-skeleton h-4 w-32 rounded"></div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="loading-skeleton w-8 h-8 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="loading-skeleton h-4 w-32 rounded"></div>
                      <div className="loading-skeleton h-3 w-24 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="loading-skeleton h-4 w-16 rounded"></div>
                    <div className="loading-skeleton h-6 w-16 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="loading-skeleton w-12 h-12 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="loading-skeleton h-4 w-40 rounded"></div>
                      <div className="loading-skeleton h-3 w-24 rounded"></div>
                    </div>
                  </div>
                  <div className="loading-skeleton h-8 w-20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'avatar':
        return (
          <div className={`flex items-center space-x-3 ${className}`}>
            <div className="loading-skeleton w-10 h-10 rounded-full"></div>
            <div className="space-y-2">
              <div className="loading-skeleton h-4 w-32 rounded"></div>
              <div className="loading-skeleton h-3 w-24 rounded"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`card ${className}`}>
            <div className="space-y-4">
              <div className="loading-skeleton h-6 w-3/4 rounded"></div>
              <div className="loading-skeleton h-4 w-1/2 rounded"></div>
              <div className="loading-skeleton h-32 w-full rounded"></div>
              <div className="flex space-x-3">
                <div className="loading-skeleton h-10 w-24 rounded-xl"></div>
                <div className="loading-skeleton h-10 w-24 rounded-xl"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      {renderSkeleton()}
    </div>
  );
};

export default LoadingSkeleton;
