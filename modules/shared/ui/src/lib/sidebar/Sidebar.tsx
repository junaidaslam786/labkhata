import React, { useState, useEffect } from 'react';
import {
  FaGripHorizontal,
  FaHome,
  FaBookOpen,
  FaListAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaCompass,
  FaHistory,
  FaBars,
} from 'react-icons/fa';
import styles from './Sidebar.module.css';
import { IoClose } from 'react-icons/io5';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const sidebarBtn = document.querySelector<HTMLElement>('.sidebar-btn');

    if (sidebar && sidebarBtn) {
      sidebarBtn.addEventListener('click', toggleSidebar);
    }

    return () => {
      if (sidebarBtn) {
        sidebarBtn.removeEventListener('click', toggleSidebar);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}
      >
        <div className={styles.logoDetails}>
          <FaGripHorizontal className={styles.icon} />
          <span className={styles.logoName}>Labkhata</span>
          <button className={styles.sidebarBtn} onClick={toggleSidebar}>
            {isOpen ? (
              <IoClose className={styles.burger} />
            ) : (
              <FaBars className={styles.burger} />
            )}
          </button>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">
              <FaHome className={styles.icon} />
              <span className={styles.linkName}>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaBookOpen className={styles.icon} />
              <span className={styles.linkName}>Category</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  Category
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FaListAlt className={styles.icon} />
              <span className={styles.linkName}>Posts</span>
            </a>
            <ul className={styles.subMenu}>
              <li>
                <a className={styles.linkName} href="#">
                  Posts
                </a>
              </li>
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Login Form</a>
              </li>
              <li>
                <a href="#">Card Design</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FaChartLine className={styles.icon} />
              <span className={styles.linkName}>Analytics</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  Analytics
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FaChartLine className={styles.icon} />
              <span className={styles.linkName}>Chart</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  Chart
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.iconLink}>
              <a href="#">
                <FaCog className={styles.icon} />
                <span className={styles.linkName}>Plugins</span>
              </a>
            </div>
            <ul className={styles.subMenu}>
              <li>
                <a className={styles.linkName} href="#">
                  Plugins
                </a>
              </li>
              <li>
                <a href="#">UI Face</a>
              </li>
              <li>
                <a href="#">Pigments</a>
              </li>
              <li>
                <a href="#">Box Icons</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FaCompass className={styles.icon} />
              <span className={styles.linkName}>Explore</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  Explore
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <FaHistory className={styles.icon} />
              <span className={styles.linkName}>History</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  History
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FaCog className={styles.icon} />
              <span className={styles.linkName}>Setting</span>
            </a>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <a className={styles.linkName} href="#">
                  Setting
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.profileDetails}>
              <div className={styles.profileContent}>
                <FaUserCircle className={styles.icon} />
              </div>
              <div className={styles.nameJob}>
                <div className={styles.profileName}>Prem Shahi</div>
                <div className={styles.job}>Web Designer</div>
              </div>
              <a href="#">
                <FaSignOutAlt className={styles.icon} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
