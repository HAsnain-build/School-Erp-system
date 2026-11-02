import { UserCheck, MapPin, Layers } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export default function Classes() {
  const { classes, students } = useSchool();

  // Helper to count actual registered students in each grade
  const getEnrolledCount = (className) => {
    return students.filter(s => s.grade === className).length;
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Classes & Sections</h2>
          <p className="page-header-desc">
            Monitor class capacities, assigned room allocations, sections, and class teachers.
          </p>
        </div>
      </div>

      <div className="classes-grid">
        {classes.map((cls) => {
          const registered = getEnrolledCount(cls.name);
          const percentCapacity = Math.round((registered / cls.capacity) * 100);

          return (
            <div key={cls.id} className="class-card">
              <div className="class-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="class-badge-circle">
                    {cls.name.replace('Grade ', 'G')}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{cls.name}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Sections: {cls.sections.join(', ')}
                    </div>
                  </div>
                </div>
                <span className="badge badge-neutral">{cls.room}</span>
              </div>

              <div style={{ margin: '14px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Capacity Occupancy</span>
                  <span style={{ fontWeight: 600 }}>{registered} / {cls.capacity} students ({percentCapacity}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${Math.min(percentCapacity, 100)}%`, 
                      height: '100%', 
                      background: percentCapacity > 85 ? '#ef4444' : percentCapacity > 60 ? '#3b82f6' : '#10b981',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} 
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div className="class-meta-row">
                  <span className="class-meta-label">
                    <UserCheck size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                    Class Teacher
                  </span>
                  <span className="class-meta-val">{cls.classTeacher}</span>
                </div>
                <div className="class-meta-row">
                  <span className="class-meta-label">
                    <Layers size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                    Active Sections
                  </span>
                  <span className="class-meta-val">
                    {cls.sections.map(sec => `Section ${sec}`).join(' • ')}
                  </span>
                </div>
                <div className="class-meta-row" style={{ borderBottom: 'none' }}>
                  <span className="class-meta-label">
                    <MapPin size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                    Assigned Room
                  </span>
                  <span className="class-meta-val">{cls.room}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
