import { useState } from 'react';
import { Menu, Bell, Calendar, } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import Modal from '../common/Modal';

export default function Navbar({ setMobileOpen, pageTitle }) {
  const { schoolInfo, notices } = useSchool();
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="page-breadcrumb-title">{pageTitle}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="academic-badge">
          <Calendar size={14} />
          <span>Session: {schoolInfo.academicYear}</span>
        </div>

        <button 
          className="notification-btn" 
          onClick={() => setShowNoticeModal(true)}
          title="School Announcements"
        >
          <Bell size={18} />
          {notices.length > 0 && <span className="notification-dot"></span>}
        </button>
      </div>

      <Modal 
        isOpen={showNoticeModal} 
        onClose={() => setShowNoticeModal(false)} 
        title="School Announcements & Notices"
      >
        <div className="notice-list">
          {notices.map((n) => (
            <div key={n.id} className="notice-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-info">{n.category}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{n.date}</span>
              </div>
              <div className="notice-title" style={{ marginTop: '8px' }}>{n.title}</div>
              <div className="notice-desc">{n.description}</div>
            </div>
          ))}
        </div>
      </Modal>
    </header>
  );
}
