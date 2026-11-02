import { useState } from 'react';
import { Settings as Save, RotateCcw, Building, Plus, Bell } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export default function Settings() {
  const { schoolInfo, updateSchoolInfo, addNotice, resetData } = useSchool();

  const [formInfo, setFormInfo] = useState({ ...schoolInfo });
  const [isSaved, setIsSaved] = useState(false);

  // New Notice state
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Academic',
    description: ''
  });
  const [noticeAdded, setNoticeAdded] = useState(false);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateSchoolInfo(formInfo);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title) return;
    addNotice(newNotice);
    setNewNotice({ title: '', category: 'Academic', description: '' });
    setNoticeAdded(true);
    setTimeout(() => setNoticeAdded(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data back to original demo values?')) {
      resetData();
      alert('School data reset to default demo records.');
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">School Portal Configuration</h2>
          <p className="page-header-desc">
            Customize institute information, academic years, contact channels, and system preferences.
          </p>
        </div>
      </div>

      <div className="dash-columns-2">
        {/* Left: General Info Form */}
        <div className="content-card">
          <div className="card-header-clean">
            <div className="card-title">
              <Building size={18} color="#3b82f6" />
              <span>Institute Information</span>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveInfo}>
              <div className="form-group">
                <label className="form-label">School / Academy Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formInfo.name}
                  onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">School Motto / Tagline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formInfo.motto}
                  onChange={(e) => setFormInfo({ ...formInfo, motto: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Current Academic Session</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formInfo.academicYear}
                    onChange={(e) => setFormInfo({ ...formInfo, academicYear: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Headmaster / Principal</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formInfo.principal}
                    onChange={(e) => setFormInfo({ ...formInfo, principal: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formInfo.phone}
                    onChange={(e) => setFormInfo({ ...formInfo, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Official Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formInfo.email}
                    onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Campus Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formInfo.address}
                  onChange={(e) => setFormInfo({ ...formInfo, address: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>Save Configuration</span>
                </button>
                {isSaved && (
                  <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
                    ✓ Settings saved successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right: Broadcast Notice & Danger Zone */}
        <div>
          {/* Post Notice */}
          <div className="content-card">
            <div className="card-header-clean">
              <div className="card-title">
                <Bell size={18} color="#f59e0b" />
                <span>Post New School Announcement</span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handlePostNotice}>
                <div className="form-group">
                  <label className="form-label">Notice Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Science Exhibition Announcement"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  >
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Details</label>
                  <textarea
                    rows={3}
                    className="form-input"
                    placeholder="Brief description..."
                    value={newNotice.description}
                    onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} />
                  <span>Publish Notice</span>
                </button>

                {noticeAdded && (
                  <p style={{ color: '#10b981', textAlign: 'center', marginTop: '8px', fontSize: '0.85rem' }}>
                    ✓ Notice published to dashboard!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div className="content-card" style={{ borderColor: '#fecaca' }}>
            <div className="card-header-clean" style={{ background: '#fef2f2' }}>
              <div className="card-title" style={{ color: '#991b1b' }}>
                <RotateCcw size={18} color="#dc2626" />
                <span>Reset Demo Database</span>
              </div>
            </div>
            <div className="card-body">
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
                Restores the school management portal back to its default demo dataset (students, teachers, fees, and timetable).
              </p>
              <button className="btn btn-danger btn-sm" onClick={handleReset}>
                <RotateCcw size={14} />
                <span>Reset All Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
