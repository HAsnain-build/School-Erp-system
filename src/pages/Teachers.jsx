import { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Award, 
  Briefcase 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import Modal from '../components/common/Modal';

export default function Teachers() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const initialForm = {
    name: '',
    subject: '',
    grade: 'Grade 9 - 10',
    phone: '',
    email: '',
    experience: '5 Years',
    status: 'Active',
    qualification: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({ ...teacher });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) {
      alert('Please fill in Name and Subject');
      return;
    }

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
      setEditingTeacher(null);
    } else {
      addTeacher(formData);
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove teacher "${name}"?`)) {
      deleteTeacher(id);
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Teachers & Faculty Directory</h2>
          <p className="page-header-desc">
            Manage academic staff, assigned subjects, qualifications, and schedules.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <UserPlus size={16} />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="content-card">
        <div className="table-toolbar">
          <div className="search-input-box">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search faculty by name or subject..."
              className="form-input form-input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Faculty Member</th>
                <th>Subject Specialization</th>
                <th>Assigned Grades</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Contact</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <div className="user-cell">
                      <div 
                        className="user-avatar-small" 
                        style={{ background: '#ecfdf5', color: '#059669' }}
                      >
                        {teacher.name.replace('Dr. ', '').replace('Ms. ', '').replace('Sir ', '').replace('Engr. ', '').replace('Mrs. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="user-cell-name">{teacher.name}</div>
                        <div className="user-cell-sub">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{teacher.subject}</span>
                  </td>
                  <td>{teacher.grade}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
                      <Award size={14} color="#64748b" />
                      <span>{teacher.qualification || 'Master Degree'}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
                      <Briefcase size={14} color="#64748b" />
                      <span>{teacher.experience}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                      {teacher.phone}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${teacher.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-icon"
                        title="Edit Teacher"
                        onClick={() => handleOpenEdit(teacher)}
                      >
                        <Edit3 size={15} color="#475569" />
                      </button>
                      <button
                        className="btn btn-secondary btn-icon"
                        title="Delete Teacher"
                        onClick={() => handleDelete(teacher.id, teacher.name)}
                      >
                        <Trash2 size={15} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Teacher */}
      <Modal
        isOpen={isAddModalOpen || !!editingTeacher}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTeacher(null);
        }}
        title={editingTeacher ? 'Edit Teacher Details' : 'Add New Teacher'}
      >
        <form onSubmit={handleSave}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Name <span className="req">*</span></label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sir Naveed Qureshi"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject Specialization <span className="req">*</span></label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Mathematics / Physics"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Assigned Grades</label>
              <input
                type="text"
                className="form-input"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g. Grade 9 - 10"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Qualification</label>
              <input
                type="text"
                className="form-input"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. M.Sc / M.Ed"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 321 0000000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="teacher@horizonacademy.edu"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Teaching Experience</label>
              <input
                type="text"
                className="form-input"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 7 Years"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingTeacher(null);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTeacher ? 'Save Changes' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
