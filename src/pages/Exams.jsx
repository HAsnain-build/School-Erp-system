import { useState } from 'react';
import { Award, Calendar } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export default function Exams() {
  const { exams } = useSchool();

  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' or 'results'

  // Marksheet Demo Data
  const [markRecords] = useState([
    { studentId: 'STD-101', name: 'Muhammad Ahmed', math: 92, physics: 88, english: 85, cs: 95 },
    { studentId: 'STD-102', name: 'Fatima Zahra', math: 96, physics: 94, english: 91, cs: 98 },
    { studentId: 'STD-103', name: 'Hamza Khan', math: 78, physics: 82, english: 74, cs: 85 },
    { studentId: 'STD-104', name: 'Ayesha Siddiqui', math: 85, physics: 89, english: 88, cs: 90 },
    { studentId: 'STD-105', name: 'Bilal Farooq', math: 65, physics: 70, english: 68, cs: 72 },
  ]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: '#10b981' };
    if (percentage >= 80) return { grade: 'A', color: '#2563eb' };
    if (percentage >= 70) return { grade: 'B', color: '#8b5cf6' };
    if (percentage >= 60) return { grade: 'C', color: '#f59e0b' };
    return { grade: 'F', color: '#ef4444' };
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Examinations & Marksheets</h2>
          <p className="page-header-desc">
            Manage upcoming exam schedules, hall allocations, and term marksheets.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${activeTab === 'schedule' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar size={16} />
            <span>Timetable</span>
          </button>
          <button
            className={`btn ${activeTab === 'results' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('results')}
          >
            <Award size={16} />
            <span>Marksheets & Grades</span>
          </button>
        </div>
      </div>

      {activeTab === 'schedule' ? (
        <div className="content-card">
          <div className="card-header-clean">
            <div className="card-title">
              <Calendar size={18} color="#3b82f6" />
              <span>Mid-Term Examination 2026 Timetable</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Subject</th>
                  <th>Target Grade</th>
                  <th>Date</th>
                  <th>Timing</th>
                  <th>Assigned Hall / Room</th>
                  <th>Max Marks</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td><strong>{exam.title}</strong></td>
                    <td>
                      <span className="badge badge-purple">{exam.subject}</span>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{exam.grade}</span>
                    </td>
                    <td>{exam.date}</td>
                    <td>{exam.time}</td>
                    <td>{exam.room}</td>
                    <td><strong>{exam.totalMarks} Marks</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="content-card">
          <div className="card-header-clean">
            <div className="card-title">
              <Award size={18} color="#10b981" />
              <span>Student Performance & Grade Summary</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Maths (100)</th>
                  <th>Physics (100)</th>
                  <th>English (100)</th>
                  <th>CS (100)</th>
                  <th>Total / 400</th>
                  <th>Percentage</th>
                  <th>Final Grade</th>
                </tr>
              </thead>
              <tbody>
                {markRecords.map((rec) => {
                  const total = rec.math + rec.physics + rec.english + rec.cs;
                  const pct = Math.round((total / 400) * 100);
                  const result = getGrade(pct);

                  return (
                    <tr key={rec.studentId}>
                      <td>
                        <strong>{rec.name}</strong>
                      </td>
                      <td>{rec.math}</td>
                      <td>{rec.physics}</td>
                      <td>{rec.english}</td>
                      <td>{rec.cs}</td>
                      <td><strong>{total}</strong></td>
                      <td>
                        <strong>{pct}%</strong>
                      </td>
                      <td>
                        <span 
                          className="badge" 
                          style={{ background: `${result.color}15`, color: result.color, borderColor: result.color }}
                        >
                          Grade {result.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
