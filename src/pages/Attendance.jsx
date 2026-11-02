import { useState } from 'react';
import { CalendarCheck, Check, X, Users, CheckCheck } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export default function Attendance() {
  const { students, attendance, setStudentAttendance, markAllAttendance } = useSchool();

  const [selectedDate, setSelectedDate] = useState('2026-09-16');
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');

  // Filter students for the chosen grade
  const classStudents = students.filter(s => s.grade === selectedGrade);

  // Get current attendance map for selected date
  const dateRecords = attendance[selectedDate] || {};

  // Count attendance stats for current class
  let presentCount = 0;
  let absentCount = 0;

  classStudents.forEach(s => {
    const status = dateRecords[s.id] || 'Present';
    if (status === 'Present') presentCount++;
    else if (status === 'Absent') absentCount++;
  });

  const totalStudentsInClass = classStudents.length;
  const attendanceRate = totalStudentsInClass > 0 
    ? Math.round((presentCount / totalStudentsInClass) * 100) 
    : 0;

  const handleMarkAll = (status) => {
    const ids = classStudents.map(s => s.id);
    markAllAttendance(selectedDate, ids, status);
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Daily Attendance Register</h2>
          <p className="page-header-desc">
            Take roll-call, mark present/absent/late, and track real-time attendance reports.
          </p>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="attendance-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <label className="form-label" style={{ marginBottom: '4px' }}>Select Date</label>
            <input
              type="date"
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: 'auto' }}
            />
          </div>

          <div>
            <label className="form-label" style={{ marginBottom: '4px' }}>Select Class / Grade</label>
            <select
              className="filter-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 6">Grade 6</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => handleMarkAll('Present')}
          >
            <CheckCheck size={16} color="#10b981" />
            <span>Mark All Present</span>
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => handleMarkAll('Absent')}
          >
            <X size={16} color="#ef4444" />
            <span>Mark All Absent</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ padding: '16px 20px' }}>
          <div>
            <div className="stat-info-label">Total in Class</div>
            <div className="stat-info-value">{totalStudentsInClass}</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-blue" style={{ width: '44px', height: '44px' }}>
            <Users size={20} />
          </div>
        </div>

        <div className="stat-card" style={{ padding: '16px 20px' }}>
          <div>
            <div className="stat-info-label">Present</div>
            <div className="stat-info-value" style={{ color: '#10b981' }}>{presentCount}</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-green" style={{ width: '44px', height: '44px' }}>
            <Check size={20} />
          </div>
        </div>

        <div className="stat-card" style={{ padding: '16px 20px' }}>
          <div>
            <div className="stat-info-label">Absent</div>
            <div className="stat-info-value" style={{ color: '#ef4444' }}>{absentCount}</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-amber" style={{ width: '44px', height: '44px', background: '#fee2e2', color: '#dc2626' }}>
            <X size={20} />
          </div>
        </div>

        <div className="stat-card" style={{ padding: '16px 20px' }}>
          <div>
            <div className="stat-info-label">Attendance Rate</div>
            <div className="stat-info-value">{attendanceRate}%</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-purple" style={{ width: '44px', height: '44px' }}>
            <CalendarCheck size={20} />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="content-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Section</th>
                <th>Overall Rate</th>
                <th>Current Status ({selectedDate})</th>
                <th style={{ textAlign: 'right' }}>Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    No students enrolled in {selectedGrade}.
                  </td>
                </tr>
              ) : (
                classStudents.map((student) => {
                  const currentStatus = dateRecords[student.id] || 'Present';

                  return (
                    <tr key={student.id}>
                      <td><strong>#{student.rollNo}</strong></td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-small">
                            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="user-cell-name">{student.name}</div>
                            <div className="user-cell-sub">{student.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-neutral">Section {student.section}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: student.attendanceRate >= 90 ? '#10b981' : '#f59e0b' }}>
                          {student.attendanceRate}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          currentStatus === 'Present' ? 'badge-success' :
                          currentStatus === 'Absent' ? 'badge-danger' : 'badge-warning'
                        }`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="attendance-pill-group" style={{ justifyContent: 'flex-end' }}>
                          <button
                            className={`att-status-btn ${currentStatus === 'Present' ? 'selected-present' : ''}`}
                            onClick={() => setStudentAttendance(selectedDate, student.id, 'Present')}
                          >
                            Present
                          </button>
                          <button
                            className={`att-status-btn ${currentStatus === 'Late' ? 'selected-late' : ''}`}
                            onClick={() => setStudentAttendance(selectedDate, student.id, 'Late')}
                          >
                            Late
                          </button>
                          <button
                            className={`att-status-btn ${currentStatus === 'Absent' ? 'selected-absent' : ''}`}
                            onClick={() => setStudentAttendance(selectedDate, student.id, 'Absent')}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
