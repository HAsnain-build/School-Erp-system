import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'School Dashboard';
      case '/students':
        return 'Student Directory & Records';
      case '/teachers':
        return 'Teachers & Faculty Management';
      case '/classes':
        return 'Classes, Sections & Capacities';
      case '/attendance':
        return 'Daily Attendance Register';
      case '/fees':
        return 'Fee Collection & Invoices';
      case '/exams':
        return 'Examination Schedules & Marks';
      case '/settings':
        return 'School Portal Configuration';
      default:
        return 'School Management System';
    }
  };

  return (
    <div className="app-container">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="main-wrapper">
        <Navbar 
          setMobileOpen={setMobileOpen} 
          pageTitle={getPageTitle(location.pathname)} 
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
