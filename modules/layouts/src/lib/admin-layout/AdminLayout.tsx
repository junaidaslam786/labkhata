import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css'
import { Sidebar } from '@labkhata/modules/shared/ui';

const AdminLayout: React.FC = () => {
  return (
    <div className={styles.main}>
      {/* <Header /> */}
      <div className={styles.page}>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;