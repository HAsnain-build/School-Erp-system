import { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  PlusCircle, 
  CheckCircle, 
  Printer, 
  Receipt, 
  ArrowUpRight 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import Modal from '../components/common/Modal';

export default function Fees() {
  const { fees, payFee, addInvoice, students, schoolInfo } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Online Transfer');
  const [viewingReceipt, setViewingReceipt] = useState(null);

  // New Invoice Form
  const [newInv, setNewInv] = useState({
    studentId: '',
    term: 'September 2026',
    amount: 15000,
    dueDate: '2026-09-25'
  });

  // Calculations
  const totalBilled = fees.reduce((sum, f) => sum + Number(f.amount), 0);
  const totalPaid = fees
    .filter((f) => f.status === 'Paid')
    .reduce((sum, f) => sum + Number(f.amount), 0);
  const totalPending = fees
    .filter((f) => f.status === 'Pending')
    .reduce((sum, f) => sum + Number(f.amount), 0);
  const totalOverdue = fees
    .filter((f) => f.status === 'Overdue')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const student = students.find((s) => s.id === newInv.studentId);
    if (!student) {
      alert('Please select a student');
      return;
    }

    addInvoice({
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      term: newInv.term,
      amount: Number(newInv.amount),
      dueDate: newInv.dueDate,
      status: 'Pending'
    });

    setIsNewInvoiceOpen(false);
  };

  const handleConfirmPayment = () => {
    if (payingInvoice) {
      payFee(payingInvoice.id, paymentMethod);
      setPayingInvoice(null);
    }
  };

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h2 className="page-header-title">Fee Collection & Invoices</h2>
          <p className="page-header-desc">
            Monitor tuition fees, student payments, receipts, and outstanding dues.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsNewInvoiceOpen(true)}>
          <PlusCircle size={16} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-info-label">Total Billed</div>
            <div className="stat-info-value">PKR {totalBilled.toLocaleString()}</div>
            <div className="stat-info-sub">Across all terms</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-blue">
            <Receipt size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-info-label">Total Collected</div>
            <div className="stat-info-value" style={{ color: '#10b981' }}>
              PKR {totalPaid.toLocaleString()}
            </div>
            <div className="stat-info-sub">{fees.filter((f) => f.status === 'Paid').length} Invoices paid</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-green">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-info-label">Pending Dues</div>
            <div className="stat-info-value" style={{ color: '#f59e0b' }}>
              PKR {totalPending.toLocaleString()}
            </div>
            <div className="stat-info-sub">Due this month</div>
          </div>
          <div className="stat-icon-wrapper stat-icon-amber">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-info-label">Overdue Amount</div>
            <div className="stat-info-value" style={{ color: '#ef4444' }}>
              PKR {totalOverdue.toLocaleString()}
            </div>
            <div className="stat-info-sub">Urgent collection</div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="content-card">
        <div className="table-toolbar">
          <div className="search-input-box">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search invoice ID or student..."
              className="form-input form-input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="table-filter-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Student</th>
                <th>Class / Grade</th>
                <th>Fee Term</th>
                <th>Amount (PKR)</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((inv) => (
                <tr key={inv.id}>
                  <td><strong>{inv.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{inv.studentName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: {inv.studentId}</div>
                  </td>
                  <td>{inv.grade}</td>
                  <td>{inv.term}</td>
                  <td><strong>PKR {inv.amount.toLocaleString()}</strong></td>
                  <td>{inv.dueDate}</td>
                  <td>
                    <span className={`badge ${
                      inv.status === 'Paid' ? 'badge-success' :
                      inv.status === 'Overdue' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      {inv.status !== 'Paid' ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setPayingInvoice(inv)}
                        >
                          Collect Fee
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setViewingReceipt(inv)}
                        >
                          <Printer size={14} />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Collect Payment */}
      <Modal
        isOpen={!!payingInvoice}
        onClose={() => setPayingInvoice(null)}
        title="Record Fee Payment"
      >
        {payingInvoice && (
          <div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Student Name:</span>
                <strong>{payingInvoice.studentName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Fee Month / Term:</span>
                <span>{payingInvoice.term}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>
                <span>Amount Due:</span>
                <span>PKR {payingInvoice.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select
                className="form-input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Online Transfer">Online Bank Transfer</option>
                <option value="Cash">Cash at Counter</option>
                <option value="EasyPaisa / JazzCash">EasyPaisa / JazzCash</option>
                <option value="Bank Cheque">Bank Cheque</option>
              </select>
            </div>

            <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
              <button className="btn btn-secondary" onClick={() => setPayingInvoice(null)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleConfirmPayment}>
                <CheckCircle size={16} />
                <span>Confirm Paid & Generate Receipt</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Generate New Invoice */}
      <Modal
        isOpen={isNewInvoiceOpen}
        onClose={() => setIsNewInvoiceOpen(false)}
        title="Generate Tuition Fee Invoice"
      >
        <form onSubmit={handleCreateInvoice}>
          <div className="form-group">
            <label className="form-label">Select Student <span className="req">*</span></label>
            <select
              className="form-input"
              required
              value={newInv.studentId}
              onChange={(e) => setNewInv({ ...newInv, studentId: e.target.value })}
            >
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Roll #{s.rollNo}, {s.grade})
                </option>
              ))}
            </select>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Fee Term</label>
              <input
                type="text"
                className="form-input"
                required
                value={newInv.term}
                onChange={(e) => setNewInv({ ...newInv, term: e.target.value })}
                placeholder="e.g. October 2026"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Fee Amount (PKR) <span className="req">*</span></label>
              <input
                type="number"
                className="form-input"
                required
                value={newInv.amount}
                onChange={(e) => setNewInv({ ...newInv, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-input"
              required
              value={newInv.dueDate}
              onChange={(e) => setNewInv({ ...newInv, dueDate: e.target.value })}
            />
          </div>

          <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsNewInvoiceOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Issue Invoice
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: View Receipt */}
      <Modal
        isOpen={!!viewingReceipt}
        onClose={() => setViewingReceipt(null)}
        title="Official School Fee Receipt"
      >
        {viewingReceipt && (
          <div style={{ padding: '8px' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px dashed #cbd5e1', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{schoolInfo.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{schoolInfo.address}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Phone: {schoolInfo.phone}</p>
              <div style={{ display: 'inline-block', margin: '8px 0', padding: '4px 12px', background: '#ecfdf5', color: '#065f46', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem' }}>
                PAYMENT CONFIRMED
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', marginBottom: '16px' }}>
              <div><span style={{ color: '#64748b' }}>Receipt No:</span> <strong>{viewingReceipt.id}</strong></div>
              <div><span style={{ color: '#64748b' }}>Date:</span> <strong>{viewingReceipt.paymentDate || '2026-09-10'}</strong></div>
              <div><span style={{ color: '#64748b' }}>Student Name:</span> <strong>{viewingReceipt.studentName}</strong></div>
              <div><span style={{ color: '#64748b' }}>Class:</span> <strong>{viewingReceipt.grade}</strong></div>
              <div><span style={{ color: '#64748b' }}>Fee Month:</span> <span>{viewingReceipt.term}</span></div>
              <div><span style={{ color: '#64748b' }}>Payment Mode:</span> <span>{viewingReceipt.method || 'Online'}</span></div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 800 }}>
              <span>Total Amount Paid:</span>
              <span style={{ color: '#10b981' }}>PKR {viewingReceipt.amount.toLocaleString()}</span>
            </div>

            <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
              <button className="btn btn-secondary" onClick={() => setViewingReceipt(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <Printer size={15} />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
