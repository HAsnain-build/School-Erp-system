import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  Award, 
  Settings,
  School,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { students, teachers, schoolInfo } = useSchool();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/students', label: 'Students', icon: Users, badge: students.length },
    { to: '/teachers', label: 'Teachers', icon: GraduationCap, badge: teachers.length },
    { to: '/classes', label: 'Classes & Sections', icon: BookOpen },
    { to: '/attendance', label: 'Daily Attendance', icon: CalendarCheck },
    { to: '/fees', label: 'Fee Management', icon: CreditCard },
    { to: '/exams', label: 'Exams & Grades', icon: Award },
    { to: '/settings', label: 'School Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="school-logo-badge">
          <School size={22} />
        </div>
        <div>
          <div className="sidebar-brand-title">Horizon SMS</div>
          <div className="sidebar-brand-subtitle">School Portal</div>
        </div>
        {mobileOpen && (
          <button 
            onClick={() => setMobileOpen(false)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="user-avatar-circle">TM</div>
          <div>
            <div className="user-info-name">{schoolInfo.principal || 'Administrator'}</div>
            <div className="user-info-role">Principal / Headmaster</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
