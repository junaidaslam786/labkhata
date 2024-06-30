import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { Sidebar } from '@labkhata/modules/shared/ui';

const AdminLayout: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.page}>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    </div>
  );
};

export default AdminLayout;
