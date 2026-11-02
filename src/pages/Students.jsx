import { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import Modal from '../components/common/Modal';

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent, } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  // Form State
  const initialForm = {
    rollNo: '',
    name: '',
    gender: 'Male',
    grade: 'Grade 10',
    section: 'A',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    status: 'Active',
    feeStatus: 'Pending'
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData({
      ...initialForm,
      rollNo: (100 + students.length + 1).toString()
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) {
      alert('Please fill in required fields (Name and Roll No)');
      return;
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      setEditingStudent(null);
    } else {
      addStudent(formData);
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      deleteStudent(id);
    }
  };

  // Filtering
  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.parentName && s.parentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGrade = gradeFilter === 'All' || s.grade === gradeFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Student Management</h2>
          <p className="page-header-desc">
            Manage student registrations, profiles, sections, and parent contact information.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <UserPlus size={16} />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="content-card">
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="search-input-box">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search by name, roll no, email..."
              className="form-input form-input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="table-filter-group">
            <select
              className="filter-select"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="All">All Grades</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 6">Grade 6</option>
            </select>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Info</th>
                <th>Grade / Sec</th>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Fee Status</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <strong style={{ color: '#475569' }}>#{student.rollNo}</strong>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-small">
                          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="user-cell-name">{student.name}</div>
                          <div className="user-cell-sub">{student.gender} • {student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">
                        {student.grade} - {student.section}
                      </span>
                    </td>
                    <td>{student.parentName || 'N/A'}</td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                        {student.phone}
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
                    <td>
                      <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary btn-icon" 
                          title="View Profile"
                          onClick={() => setViewingStudent(student)}
                        >
                          <Eye size={15} color="#2563eb" />
                        </button>
                        <button 
                          className="btn btn-secondary btn-icon" 
                          title="Edit Student"
                          onClick={() => handleOpenEdit(student)}
                        >
                          <Edit3 size={15} color="#475569" />
                        </button>
                        <button 
                          className="btn btn-secondary btn-icon" 
                          title="Delete Student"
                          onClick={() => handleDelete(student.id, student.name)}
                        >
                          <Trash2 size={15} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Student */}
      <Modal
        isOpen={isAddModalOpen || !!editingStudent}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStudent(null);
        }}
        title={editingStudent ? 'Edit Student Information' : 'Admit New Student'}
      >
        <form onSubmit={handleSaveStudent}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Roll Number <span className="req">*</span></label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="e.g. 109"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name <span className="req">*</span></label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Zainab Tariq"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-input"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Grade / Class</label>
              <select
                className="form-input"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 6">Grade 6</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Section</label>
              <select
                className="form-input"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Parent / Guardian Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="Father or Mother's name"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Emergency Phone</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 0000000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Home Address</label>
            <input
              type="text"
              className="form-input"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Residential address"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Enrollment Status</label>
              <select
                className="form-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fee Status</label>
              <select
                className="form-input"
                value={formData.feeStatus}
                onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStudent(null);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingStudent ? 'Save Changes' : 'Admit Student'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: View Student Profile */}
      <Modal
        isOpen={!!viewingStudent}
        onClose={() => setViewingStudent(null)}
        title="Student Profile Details"
      >
        {viewingStudent && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div 
                className="user-avatar-small" 
                style={{ width: '56px', height: '56px', fontSize: '1.2rem', background: '#dbeafe', color: '#1d4ed8' }}
              >
                {viewingStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{viewingStudent.name}</h3>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span className="badge badge-neutral">Roll #{viewingStudent.rollNo}</span>
                  <span className="badge badge-info">{viewingStudent.grade} ({viewingStudent.section})</span>
                  <span className={`badge ${viewingStudent.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {viewingStudent.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Phone size={16} color="#64748b" />
                <strong>Parent Contact:</strong> {viewingStudent.phone || 'N/A'} ({viewingStudent.parentName})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Mail size={16} color="#64748b" />
                <strong>Email:</strong> {viewingStudent.email || 'N/A'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <MapPin size={16} color="#64748b" />
                <strong>Address:</strong> {viewingStudent.address || 'N/A'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Calendar size={16} color="#64748b" />
                <strong>Admission Date:</strong> {viewingStudent.admissionDate || '2024-08-15'}
              </div>
            </div>

            <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setViewingStudent(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const s = viewingStudent;
                  setViewingStudent(null);
                  handleOpenEdit(s);
                }}
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
