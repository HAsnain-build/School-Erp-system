import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  CalendarCheck, 
  UserPlus, 
  CheckCircle2, 
  Receipt, 
  Bell, 
  BookOpen,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import StatCard from '../components/common/StatCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { students, teachers, fees, notices, attendance } = useSchool();

  // Calculate metrics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalTeachers = teachers.length;
  
  // Total Fee metrics
  const paidFees = fees
    .filter(f => f.status === 'Paid')
    .reduce((sum, f) => sum + Number(f.amount), 0);
  const pendingFees = fees
    .filter(f => f.status !== 'Paid')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  // Today Attendance
  const today = '2026-09-16';
  const todayRecords = attendance[today] || {};
  const todayValues = Object.values(todayRecords);
  const presentToday = todayValues.filter(v => v === 'Present').length;
  const attendancePercentage = todayValues.length > 0 
    ? Math.round((presentToday / todayValues.length) * 100) 
    : 95;

  return (
    <div>
      {/* Welcome Banner */}
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Welcome back, Principal! 👋</h2>
          <p className="page-header-desc">
            Here is what's happening in your school today. Everything is running smoothly.
          </p>
        </div>
        <div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/students')}
          >
            <UserPlus size={16} />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtext={`${activeStudents} Active enrolled`}
          icon={Users}
          color="blue"
          trend={+4.5}
        />
        <StatCard
          title="Teachers & Faculty"
          value={totalTeachers}
          subtext="Full-time staff"
          icon={GraduationCap}
          color="green"
        />
        <StatCard
          title="Fee Collected"
          value={`PKR ${paidFees.toLocaleString()}`}
          subtext={`PKR ${pendingFees.toLocaleString()} Pending`}
          icon={CreditCard}
          color="amber"
          trend={+12}
        />
        <StatCard
          title="Today's Attendance"
          value={`${attendancePercentage}%`}
          subtext={`${presentToday} of ${todayValues.length || totalStudents} marked`}
          icon={CalendarCheck}
          color="purple"
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <div className="card-header-clean">
          <div className="card-title">
            <TrendingUp size={18} color="#3b82f6" />
            <span>Quick Management Shortcuts</span>
          </div>
        </div>
        <div className="card-body">
          <div className="quick-actions-grid">
            <div className="quick-action-card" onClick={() => navigate('/students')}>
              <div className="quick-action-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <UserPlus size={20} />
              </div>
              <div className="quick-action-text">Add Student</div>
            </div>

            <div className="quick-action-card" onClick={() => navigate('/attendance')}>
              <div className="quick-action-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={20} />
              </div>
              <div className="quick-action-text">Mark Attendance</div>
            </div>

            <div className="quick-action-card" onClick={() => navigate('/fees')}>
              <div className="quick-action-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Receipt size={20} />
              </div>
              <div className="quick-action-text">Collect Fees</div>
            </div>

            <div className="quick-action-card" onClick={() => navigate('/')}>
              <div className="quick-action-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <BookOpen size={20} />
              </div>
              <div className="quick-action-text">View Classes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Students & Notices */}
      <div className="dash-columns-2">
        {/* Left: Recent Students Table */}
        <div className="content-card">
          <div className="card-header-clean">
            <div className="card-title">Recent Student Admissions</div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/students')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Fee Status</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: '#64748b' }}>#{student.rollNo}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-small">
                          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="user-cell-name">{student.name}</div>
                          <div className="user-cell-sub">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{student.grade} - {student.section}</span>
                    </td>
                    <td>
                      <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        student.feeStatus === 'Paid' ? 'badge-success' :
                        student.feeStatus === 'Overdue' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: School Notices */}
        <div className="content-card">
          <div className="card-header-clean">
            <div className="card-title">
              <Bell size={18} color="#f59e0b" />
              <span>Notice Board</span>
            </div>
          </div>
          <div className="card-body">
            <div className="notice-list">
              {notices.map((notice) => (
                <div key={notice.id} className="notice-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-info">{notice.category}</span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{notice.date}</span>
                  </div>
                  <div className="notice-title" style={{ marginTop: '6px' }}>{notice.title}</div>
                  <div className="notice-desc">{notice.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
