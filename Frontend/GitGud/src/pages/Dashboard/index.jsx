import React from 'react';
import AppSidebar from '../../components/AppSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AppSidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
