/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const SchoolContext = createContext();

const initialDemoData = {
  schoolInfo: {
    name: 'Horizon International Academy',
    motto: 'Inspiring Minds, Shaping Futures',
    academicYear: '2026 - 2027',
    email: 'contact@horizonacademy.edu',
    phone: '+92 300 9876543',
    address: 'Block 4, Clifton, Karachi, Pakistan',
    principal: 'Prof. Tariq Mahmood'
  },
  students: [
    {
      id: 'STD-101',
      rollNo: '101',
      name: 'Muhammad Ahmed',
      gender: 'Male',
      grade: 'Grade 10',
      section: 'A',
      parentName: 'Rashid Ahmed',
      phone: '+92 301 2345678',
      email: 'm.ahmed@student.edu',
      address: 'Gulshan-e-Iqbal, Karachi',
      status: 'Active',
      admissionDate: '2022-08-15',
      feeStatus: 'Paid',
      attendanceRate: 96
    },
    {
      id: 'STD-102',
      rollNo: '102',
      name: 'Fatima Zahra',
      gender: 'Female',
      grade: 'Grade 10',
      section: 'A',
      parentName: 'Syed Salman',
      phone: '+92 302 3456789',
      email: 'fatima.z@student.edu',
      address: 'PECHS Block 2, Karachi',
      status: 'Active',
      admissionDate: '2022-08-15',
      feeStatus: 'Paid',
      attendanceRate: 98
    },
    {
      id: 'STD-103',
      rollNo: '103',
      name: 'Hamza Khan',
      gender: 'Male',
      grade: 'Grade 9',
      section: 'B',
      parentName: 'Naveed Khan',
      phone: '+92 303 4567890',
      email: 'hamza.k@student.edu',
      address: 'North Nazimabad, Karachi',
      status: 'Active',
      admissionDate: '2023-08-10',
      feeStatus: 'Pending',
      attendanceRate: 91
    },
    {
      id: 'STD-104',
      rollNo: '104',
      name: 'Ayesha Siddiqui',
      gender: 'Female',
      grade: 'Grade 8',
      section: 'A',
      parentName: 'Usman Siddiqui',
      phone: '+92 304 5678901',
      email: 'ayesha.s@student.edu',
      address: 'DHA Phase 5, Karachi',
      status: 'Active',
      admissionDate: '2024-08-12',
      feeStatus: 'Paid',
      attendanceRate: 94
    },
    {
      id: 'STD-105',
      rollNo: '105',
      name: 'Bilal Farooq',
      gender: 'Male',
      grade: 'Grade 10',
      section: 'B',
      parentName: 'Farooq Azam',
      phone: '+92 305 6789012',
      email: 'bilal.f@student.edu',
      address: 'Bahadurabad, Karachi',
      status: 'Active',
      admissionDate: '2022-08-15',
      feeStatus: 'Overdue',
      attendanceRate: 85
    },
    {
      id: 'STD-106',
      rollNo: '106',
      name: 'Zainab Noor',
      gender: 'Female',
      grade: 'Grade 7',
      section: 'A',
      parentName: 'Kamran Noor',
      phone: '+92 306 7890123',
      email: 'zainab.n@student.edu',
      address: 'Gulistan-e-Jauhar, Karachi',
      status: 'Active',
      admissionDate: '2025-08-14',
      feeStatus: 'Paid',
      attendanceRate: 99
    },
    {
      id: 'STD-107',
      rollNo: '107',
      name: 'Ali Raza',
      gender: 'Male',
      grade: 'Grade 9',
      section: 'A',
      parentName: 'Mansoor Raza',
      phone: '+92 307 8901234',
      email: 'ali.raza@student.edu',
      address: 'Malir Cantt, Karachi',
      status: 'Inactive',
      admissionDate: '2023-08-10',
      feeStatus: 'Pending',
      attendanceRate: 72
    },
    {
      id: 'STD-108',
      rollNo: '108',
      name: 'Mariam Baig',
      gender: 'Female',
      grade: 'Grade 8',
      section: 'B',
      parentName: 'Shahid Baig',
      phone: '+92 308 9012345',
      email: 'mariam.b@student.edu',
      address: 'Federal B Area, Karachi',
      status: 'Active',
      admissionDate: '2024-08-12',
      feeStatus: 'Paid',
      attendanceRate: 95
    }
  ],
  teachers: [
    {
      id: 'TCH-01',
      name: 'Dr. Asim Raza',
      subject: 'Mathematics',
      grade: 'Grade 9 - 10',
      phone: '+92 321 1122334',
      email: 'asim.raza@horizonacademy.edu',
      experience: '12 Years',
      status: 'Active',
      qualification: 'Ph.D. in Mathematics'
    },
    {
      id: 'TCH-02',
      name: 'Ms. Sadia Munir',
      subject: 'English Literature',
      grade: 'Grade 8 - 10',
      phone: '+92 322 2233445',
      email: 'sadia.munir@horizonacademy.edu',
      experience: '8 Years',
      status: 'Active',
      qualification: 'M.A. English'
    },
    {
      id: 'TCH-03',
      name: 'Engr. Imran Malik',
      subject: 'Physics',
      grade: 'Grade 9 - 10',
      phone: '+92 323 3344556',
      email: 'imran.malik@horizonacademy.edu',
      experience: '10 Years',
      status: 'Active',
      qualification: 'M.Sc. Physics / B.E.'
    },
    {
      id: 'TCH-04',
      name: 'Mrs. Huma Naveed',
      subject: 'Biology & Chemistry',
      grade: 'Grade 8 - 9',
      phone: '+92 324 4455667',
      email: 'huma.naveed@horizonacademy.edu',
      experience: '6 Years',
      status: 'On Leave',
      qualification: 'M.Sc. Biochemistry'
    },
    {
      id: 'TCH-05',
      name: 'Sir Waqas Qureshi',
      subject: 'Computer Science',
      grade: 'Grade 7 - 10',
      phone: '+92 325 5566778',
      email: 'waqas.q@horizonacademy.edu',
      experience: '9 Years',
      status: 'Active',
      qualification: 'MS Computer Science'
    }
  ],
  classes: [
    {
      id: 'CLS-10',
      name: 'Grade 10',
      sections: ['A', 'B'],
      classTeacher: 'Dr. Asim Raza',
      room: 'Room 301',
      studentCount: 45,
      capacity: 50
    },
    {
      id: 'CLS-09',
      name: 'Grade 9',
      sections: ['A', 'B'],
      classTeacher: 'Engr. Imran Malik',
      room: 'Room 204',
      studentCount: 42,
      capacity: 50
    },
    {
      id: 'CLS-08',
      name: 'Grade 8',
      sections: ['A', 'B'],
      classTeacher: 'Ms. Sadia Munir',
      room: 'Room 201',
      studentCount: 38,
      capacity: 45
    },
    {
      id: 'CLS-07',
      name: 'Grade 7',
      sections: ['A'],
      classTeacher: 'Sir Waqas Qureshi',
      room: 'Room 105',
      studentCount: 35,
      capacity: 40
    },
    {
      id: 'CLS-06',
      name: 'Grade 6',
      sections: ['A', 'B'],
      classTeacher: 'Mrs. Huma Naveed',
      room: 'Room 102',
      studentCount: 40,
      capacity: 45
    }
  ],
  attendance: {
    '2026-09-16': {
      'STD-101': 'Present',
      'STD-102': 'Present',
      'STD-103': 'Present',
      'STD-104': 'Present',
      'STD-105': 'Late',
      'STD-106': 'Present',
      'STD-107': 'Absent',
      'STD-108': 'Present'
    }
  },
  fees: [
    {
      id: 'INV-1001',
      studentId: 'STD-101',
      studentName: 'Muhammad Ahmed',
      grade: 'Grade 10',
      term: 'September 2026',
      amount: 15000,
      dueDate: '2026-09-10',
      status: 'Paid',
      paymentDate: '2026-09-05',
      method: 'Online Transfer'
    },
    {
      id: 'INV-1002',
      studentId: 'STD-102',
      studentName: 'Fatima Zahra',
      grade: 'Grade 10',
      term: 'September 2026',
      amount: 15000,
      dueDate: '2026-09-10',
      status: 'Paid',
      paymentDate: '2026-09-08',
      method: 'Cash'
    },
    {
      id: 'INV-1003',
      studentId: 'STD-103',
      studentName: 'Hamza Khan',
      grade: 'Grade 9',
      term: 'September 2026',
      amount: 14000,
      dueDate: '2026-09-20',
      status: 'Pending',
      paymentDate: null,
      method: null
    },
    {
      id: 'INV-1004',
      studentId: 'STD-104',
      studentName: 'Ayesha Siddiqui',
      grade: 'Grade 8',
      term: 'September 2026',
      amount: 13500,
      dueDate: '2026-09-10',
      status: 'Paid',
      paymentDate: '2026-09-09',
      method: 'Online Transfer'
    },
    {
      id: 'INV-1005',
      studentId: 'STD-105',
      studentName: 'Bilal Farooq',
      grade: 'Grade 10',
      term: 'August 2026',
      amount: 15000,
      dueDate: '2026-08-10',
      status: 'Overdue',
      paymentDate: null,
      method: null
    },
    {
      id: 'INV-1006',
      studentId: 'STD-106',
      studentName: 'Zainab Noor',
      grade: 'Grade 7',
      term: 'September 2026',
      amount: 13000,
      dueDate: '2026-09-10',
      status: 'Paid',
      paymentDate: '2026-09-04',
      method: 'Bank Cheque'
    }
  ],
  exams: [
    {
      id: 'EXM-01',
      title: 'Mid-Term Examination 2026',
      subject: 'Mathematics',
      grade: 'Grade 10',
      date: '2026-10-05',
      time: '09:00 AM - 12:00 PM',
      room: 'Hall A',
      totalMarks: 100
    },
    {
      id: 'EXM-02',
      title: 'Mid-Term Examination 2026',
      subject: 'Physics',
      grade: 'Grade 10',
      date: '2026-10-07',
      time: '09:00 AM - 12:00 PM',
      room: 'Hall A',
      totalMarks: 100
    },
    {
      id: 'EXM-03',
      title: 'Mid-Term Examination 2026',
      subject: 'English Literature',
      grade: 'Grade 9',
      date: '2026-10-06',
      time: '09:00 AM - 11:30 AM',
      room: 'Room 204',
      totalMarks: 75
    },
    {
      id: 'EXM-04',
      title: 'Mid-Term Examination 2026',
      subject: 'Computer Science',
      grade: 'Grade 8',
      date: '2026-10-08',
      time: '10:00 AM - 12:00 PM',
      room: 'Computer Lab 1',
      totalMarks: 50
    }
  ],
  notices: [
    {
      id: 'NOT-01',
      title: 'Parent-Teacher Meeting (PTM) Scheduled',
      date: '2026-09-22',
      category: 'Academic',
      description: 'The first term PTM will be held on Saturday, September 22 from 9:00 AM to 1:00 PM.'
    },
    {
      id: 'NOT-02',
      title: 'Annual Sports Day Registrations Open',
      date: '2026-09-28',
      category: 'Sports',
      description: 'Interested students can register for athletics, football, and cricket with their PE teachers.'
    },
    {
      id: 'NOT-03',
      title: 'Science Fair Project Submission Deadline',
      date: '2026-10-02',
      category: 'Events',
      description: 'All Grade 8-10 science projects must submit preliminary abstracts by October 2nd.'
    }
  ]
};

export const SchoolProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('sms_data_store');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved school data', e);
      }
    }
    return initialDemoData;
  });

  useEffect(() => {
    localStorage.setItem('sms_data_store', JSON.stringify(data));
  }, [data]);

  // Student CRUD
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: `STD-${Date.now().toString().slice(-4)}`,
      status: student.status || 'Active',
      admissionDate: student.admissionDate || new Date().toISOString().split('T')[0],
      attendanceRate: 100,
      feeStatus: student.feeStatus || 'Pending'
    };
    setData((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
  };

  const updateStudent = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    }));
  };

  const deleteStudent = (id) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id)
    }));
  };

  // Teacher CRUD
  const addTeacher = (teacher) => {
    const newTeacher = {
      ...teacher,
      id: `TCH-${Date.now().toString().slice(-4)}`,
      status: teacher.status || 'Active'
    };
    setData((prev) => ({
      ...prev,
      teachers: [newTeacher, ...prev.teachers]
    }));
  };

  const updateTeacher = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      teachers: prev.teachers.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    }));
  };

  const deleteTeacher = (id) => {
    setData((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((t) => t.id !== id)
    }));
  };

  // Attendance
  const setStudentAttendance = (date, studentId, status) => {
    setData((prev) => {
      const dateRecords = prev.attendance[date] || {};
      return {
        ...prev,
        attendance: {
          ...prev.attendance,
          [date]: {
            ...dateRecords,
            [studentId]: status
          }
        }
      };
    });
  };

  const markAllAttendance = (date, studentIds, status) => {
    setData((prev) => {
      const dateRecords = { ...(prev.attendance[date] || {}) };
      studentIds.forEach((id) => {
        dateRecords[id] = status;
      });
      return {
        ...prev,
        attendance: {
          ...prev.attendance,
          [date]: dateRecords
        }
      };
    });
  };

  // Fees
  const payFee = (invoiceId, paymentMethod = 'Online Transfer') => {
    setData((prev) => ({
      ...prev,
      fees: prev.fees.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'Paid',
              paymentDate: new Date().toISOString().split('T')[0],
              method: paymentMethod
            }
          : inv
      )
    }));
  };

  const addInvoice = (invoice) => {
    const newInv = {
      ...invoice,
      id: `INV-${Date.now().toString().slice(-4)}`,
      status: invoice.status || 'Pending',
      paymentDate: invoice.status === 'Paid' ? new Date().toISOString().split('T')[0] : null
    };
    setData((prev) => ({
      ...prev,
      fees: [newInv, ...prev.fees]
    }));
  };

  // School Info & Notices
  const updateSchoolInfo = (newInfo) => {
    setData((prev) => ({
      ...prev,
      schoolInfo: { ...prev.schoolInfo, ...newInfo }
    }));
  };

  const addNotice = (notice) => {
    const newNotice = {
      ...notice,
      id: `NOT-${Date.now().toString().slice(-4)}`,
      date: notice.date || new Date().toISOString().split('T')[0]
    };
    setData((prev) => ({
      ...prev,
      notices: [newNotice, ...prev.notices]
    }));
  };

  const deleteNotice = (id) => {
    setData((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id)
    }));
  };

  const resetData = () => {
    localStorage.removeItem('sms_data_store');
    setData(initialDemoData);
  };

  return (
    <SchoolContext.Provider
      value={{
        ...data,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        setStudentAttendance,
        markAllAttendance,
        payFee,
        addInvoice,
        updateSchoolInfo,
        addNotice,
        deleteNotice,
        resetData
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
