import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <header>Admin Header</header>
      <div className="admin-content">
        <aside>Sidebar</aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;