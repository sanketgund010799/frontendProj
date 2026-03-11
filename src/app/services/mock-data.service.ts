import { Injectable } from '@angular/core';

export interface Holiday {
  no: number;
  date: string;
  name: string;
  day: string;
}

export interface LeaveRecord {
  no: number;
  applyDate: string;
  leaveDate: string;
  leaveName: string;
  leaveType: string;
  reason: string;
  status: 'Applied' | 'Approved' | 'RejectedByAdmin' | 'RejectedBySystem';
}

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  status: 'Present' | 'Absent' | 'Half-Day' | 'Leave';
}

export interface CalendarEvent {
  date: string;
  type: 'Present' | 'Absent' | 'Birthday' | 'Company Event';
  title: string;
}

export interface Project {
  id: number;
  logo: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'In Progress';
  employees: { name: string; role: string; avatar: string }[];
  documents: { name: string; size: string; date: string }[];
}

export interface EventItem {
  id: number;
  logo: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isFullDay: boolean;
}

export interface Task {
  no: number;
  date: string;
  projectName: string;
  task: string;
  startTime: string;
  endTime: string;
  taskTime: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  avatar: string;
  status: 'Active' | 'Inactive';
  email: string;
}

export interface EmployeeProfile {
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  employeeId: string;
  joinDate: string;
  address: string;
  avatar: string;
  documents: { name: string; date: string; size: string }[];
}

@Injectable({ providedIn: 'root' })
export class MockDataService {

  getHolidays(): Holiday[] {
    return [
      { no: 1, date: '2026-01-26', name: 'Republic Day', day: 'Monday' },
      { no: 2, date: '2026-03-14', name: 'Holi', day: 'Saturday' },
      { no: 3, date: '2026-04-02', name: 'Good Friday', day: 'Thursday' },
      { no: 4, date: '2026-05-01', name: 'May Day', day: 'Friday' },
      { no: 5, date: '2026-08-15', name: 'Independence Day', day: 'Saturday' },
      { no: 6, date: '2026-10-02', name: 'Gandhi Jayanti', day: 'Friday' },
      { no: 7, date: '2026-11-04', name: 'Diwali', day: 'Wednesday' },
      { no: 8, date: '2026-12-25', name: 'Christmas', day: 'Friday' },
    ];
  }

  getWeeklyHours(): number[] {
    return [8.5, 9.0, 7.5, 8.0, 9.5, 0, 0];
  }

  getLeaves(): LeaveRecord[] {
    return [
      { no: 1, applyDate: '2026-01-10', leaveDate: '2026-01-15', leaveName: 'Sick Leave', leaveType: 'Full Day', reason: 'Not feeling well', status: 'Approved' },
      { no: 2, applyDate: '2026-02-05', leaveDate: '2026-02-10', leaveName: 'Casual Leave', leaveType: 'Half Day', reason: 'Personal work', status: 'Applied' },
      { no: 3, applyDate: '2026-02-20', leaveDate: '2026-02-25', leaveName: 'Earned Leave', leaveType: 'Full Day', reason: 'Family function', status: 'Approved' },
      { no: 4, applyDate: '2026-03-01', leaveDate: '2026-03-05', leaveName: 'Sick Leave', leaveType: 'Full Day', reason: 'Medical appointment', status: 'RejectedByAdmin' },
      { no: 5, applyDate: '2026-03-08', leaveDate: '2026-03-12', leaveName: 'Casual Leave', leaveType: 'Full Day', reason: 'Travel plans', status: 'RejectedBySystem' },
    ];
  }

  getAttendance(): AttendanceRecord[] {
    const records: AttendanceRecord[] = [];
    const statuses: AttendanceRecord['status'][] = ['Present', 'Present', 'Present', 'Present', 'Present', 'Absent', 'Half-Day', 'Leave', 'Present', 'Present'];
    for (let i = 1; i <= 28; i++) {
      const d = i < 10 ? `0${i}` : `${i}`;
      const s = statuses[i % statuses.length];
      records.push({
        date: `2026-03-${d}`,
        checkIn: s === 'Absent' || s === 'Leave' ? '--' : '09:' + (Math.floor(Math.random() * 30) + 10).toString().padStart(2, '0') + ' AM',
        checkOut: s === 'Absent' || s === 'Leave' ? '--' : '06:' + (Math.floor(Math.random() * 30) + 10).toString().padStart(2, '0') + ' PM',
        workingHours: s === 'Absent' || s === 'Leave' ? '0h' : s === 'Half-Day' ? '4h 30m' : `${Math.floor(Math.random() * 2) + 8}h ${Math.floor(Math.random() * 50) + 10}m`,
        status: s
      });
    }
    return records;
  }

  getCalendarEvents(): CalendarEvent[] {
    return [
      { date: '2026-03-02', type: 'Present', title: 'Present' },
      { date: '2026-03-03', type: 'Present', title: 'Present' },
      { date: '2026-03-04', type: 'Absent', title: 'Absent' },
      { date: '2026-03-05', type: 'Present', title: 'Present' },
      { date: '2026-03-06', type: 'Present', title: 'Present' },
      { date: '2026-03-09', type: 'Present', title: 'Present' },
      { date: '2026-03-10', type: 'Birthday', title: 'John\'s Birthday' },
      { date: '2026-03-11', type: 'Present', title: 'Present' },
      { date: '2026-03-12', type: 'Company Event', title: 'Team Building' },
      { date: '2026-03-13', type: 'Present', title: 'Present' },
      { date: '2026-03-15', type: 'Company Event', title: 'Quarterly Review' },
      { date: '2026-03-16', type: 'Present', title: 'Present' },
      { date: '2026-03-17', type: 'Present', title: 'Present' },
      { date: '2026-03-18', type: 'Birthday', title: 'Sara\'s Birthday' },
      { date: '2026-03-19', type: 'Present', title: 'Present' },
      { date: '2026-03-20', type: 'Absent', title: 'Absent' },
      { date: '2026-03-23', type: 'Present', title: 'Present' },
      { date: '2026-03-24', type: 'Present', title: 'Present' },
      { date: '2026-03-25', type: 'Company Event', title: 'Workshop' },
      { date: '2026-03-26', type: 'Present', title: 'Present' },
      { date: '2026-03-27', type: 'Present', title: 'Present' },
    ];
  }

  getProjects(): Project[] {
    return [
      {
        id: 1, logo: 'P1', name: 'HR Management System',
        description: 'Complete HRMS solution with payroll, attendance, and leave management modules.',
        startDate: '2026-01-15', endDate: '2026-06-30', status: 'Active',
        employees: [
          { name: 'Alex Johnson', role: 'Project Lead', avatar: 'AJ' },
          { name: 'Maria Garcia', role: 'Frontend Dev', avatar: 'MG' },
          { name: 'David Chen', role: 'Backend Dev', avatar: 'DC' },
        ],
        documents: [
          { name: 'Project Charter.pdf', size: '2.4 MB', date: '2026-01-15' },
          { name: 'Requirements.docx', size: '1.1 MB', date: '2026-01-20' },
        ]
      },
      {
        id: 2, logo: 'P2', name: 'E-Commerce Platform',
        description: 'Modern e-commerce platform with AI-powered product recommendations.',
        startDate: '2025-11-01', endDate: '2026-04-30', status: 'In Progress',
        employees: [
          { name: 'Sarah Wilson', role: 'Tech Lead', avatar: 'SW' },
          { name: 'James Brown', role: 'Full Stack Dev', avatar: 'JB' },
        ],
        documents: [
          { name: 'Architecture.pdf', size: '3.2 MB', date: '2025-11-05' },
        ]
      },
      {
        id: 3, logo: 'P3', name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication.',
        startDate: '2025-08-01', endDate: '2026-02-28', status: 'Completed',
        employees: [
          { name: 'Emily Davis', role: 'Project Manager', avatar: 'ED' },
          { name: 'Michael Lee', role: 'iOS Developer', avatar: 'ML' },
          { name: 'Lisa Wang', role: 'Android Dev', avatar: 'LW' },
          { name: 'Tom Harris', role: 'QA Engineer', avatar: 'TH' },
        ],
        documents: [
          { name: 'Final Report.pdf', size: '5.1 MB', date: '2026-02-28' },
          { name: 'Test Cases.xlsx', size: '1.8 MB', date: '2026-02-20' },
        ]
      },
      {
        id: 4, logo: 'P4', name: 'Data Analytics Dashboard',
        description: 'Real-time data analytics dashboard with advanced visualization.',
        startDate: '2026-02-01', endDate: '2026-08-31', status: 'Active',
        employees: [
          { name: 'Chris Martin', role: 'Data Engineer', avatar: 'CM' },
          { name: 'Amy Taylor', role: 'UI Designer', avatar: 'AT' },
        ],
        documents: [
          { name: 'Wireframes.fig', size: '8.5 MB', date: '2026-02-10' },
        ]
      },
      {
        id: 5, logo: 'P5', name: 'CRM System',
        description: 'Customer relationship management system with automated workflows.',
        startDate: '2026-03-01', endDate: '2026-09-30', status: 'On Hold',
        employees: [
          { name: 'Robert Kim', role: 'Product Owner', avatar: 'RK' },
        ],
        documents: []
      },
      {
        id: 6, logo: 'P6', name: 'Cloud Migration',
        description: 'Migrating legacy infrastructure to cloud-native architecture.',
        startDate: '2025-12-01', endDate: '2026-05-31', status: 'In Progress',
        employees: [
          { name: 'Nancy White', role: 'DevOps Lead', avatar: 'NW' },
          { name: 'Kevin Patel', role: 'Cloud Architect', avatar: 'KP' },
        ],
        documents: [
          { name: 'Migration Plan.pdf', size: '4.2 MB', date: '2025-12-10' },
        ]
      },
    ];
  }

  getEvents(): EventItem[] {
    return [
      { id: 1, logo: 'TB', name: 'Team Building Activity', description: 'Outdoor adventure activities and team bonding exercises for all departments.', startDate: '2026-03-12', endDate: '2026-03-12', isFullDay: true },
      { id: 2, logo: 'QR', name: 'Quarterly Review Meeting', description: 'Q1 2026 performance review and strategic planning session.', startDate: '2026-03-15', endDate: '2026-03-15', isFullDay: false },
      { id: 3, logo: 'WS', name: 'Angular Workshop', description: 'Advanced Angular 17 features workshop by senior engineers.', startDate: '2026-03-25', endDate: '2026-03-26', isFullDay: true },
      { id: 4, logo: 'AH', name: 'Annual Hackathon', description: '48-hour hackathon event to build innovative solutions.', startDate: '2026-04-10', endDate: '2026-04-12', isFullDay: true },
      { id: 5, logo: 'TD', name: 'Tech Demo Day', description: 'Showcase of latest projects and technological achievements.', startDate: '2026-04-20', endDate: '2026-04-20', isFullDay: false },
      { id: 6, logo: 'FD', name: 'Founders Day Celebration', description: 'Annual celebration of company founding with cultural programs.', startDate: '2026-05-05', endDate: '2026-05-05', isFullDay: true },
    ];
  }

  getTasks(): Task[] {
    const today = new Date().toISOString().split('T')[0];
    return [
      { no: 1, date: today, projectName: 'HR Management System', task: 'Implement leave approval workflow', startTime: '09:00', endTime: '11:30', taskTime: '2h 30m', period: 'Morning' },
      { no: 2, date: today, projectName: 'HR Management System', task: 'Design attendance dashboard UI', startTime: '11:30', endTime: '13:00', taskTime: '1h 30m', period: 'Morning' },
      { no: 3, date: today, projectName: 'E-Commerce Platform', task: 'Fix payment gateway integration bugs', startTime: '14:00', endTime: '16:00', taskTime: '2h 00m', period: 'Afternoon' },
      { no: 4, date: today, projectName: 'Data Analytics Dashboard', task: 'Create chart components for real-time data', startTime: '16:00', endTime: '18:00', taskTime: '2h 00m', period: 'Afternoon' },
      { no: 5, date: '2026-03-10', projectName: 'Mobile Banking App', task: 'Review biometric auth implementation', startTime: '09:00', endTime: '11:00', taskTime: '2h 00m', period: 'Morning' },
      { no: 6, date: '2026-03-10', projectName: 'CRM System', task: 'Draft CRM requirements document', startTime: '14:00', endTime: '17:00', taskTime: '3h 00m', period: 'Afternoon' },
      { no: 7, date: '2026-03-09', projectName: 'Cloud Migration', task: 'Set up CI/CD pipeline for staging', startTime: '10:00', endTime: '12:00', taskTime: '2h 00m', period: 'Morning' },
    ];
  }

  getTeamMembers(): TeamMember[] {
    return [
      { id: 1, name: 'Alex Johnson', designation: 'Senior Software Engineer', avatar: 'AJ', status: 'Active', email: 'alex.j@company.com' },
      { id: 2, name: 'Maria Garcia', designation: 'Frontend Developer', avatar: 'MG', status: 'Active', email: 'maria.g@company.com' },
      { id: 3, name: 'David Chen', designation: 'Backend Developer', avatar: 'DC', status: 'Active', email: 'david.c@company.com' },
      { id: 4, name: 'Sarah Wilson', designation: 'Tech Lead', avatar: 'SW', status: 'Active', email: 'sarah.w@company.com' },
      { id: 5, name: 'James Brown', designation: 'Full Stack Developer', avatar: 'JB', status: 'Inactive', email: 'james.b@company.com' },
      { id: 6, name: 'Emily Davis', designation: 'Project Manager', avatar: 'ED', status: 'Active', email: 'emily.d@company.com' },
      { id: 7, name: 'Michael Lee', designation: 'iOS Developer', avatar: 'ML', status: 'Active', email: 'michael.l@company.com' },
      { id: 8, name: 'Lisa Wang', designation: 'Android Developer', avatar: 'LW', status: 'Inactive', email: 'lisa.w@company.com' },
      { id: 9, name: 'Tom Harris', designation: 'QA Engineer', avatar: 'TH', status: 'Active', email: 'tom.h@company.com' },
      { id: 10, name: 'Chris Martin', designation: 'Data Engineer', avatar: 'CM', status: 'Active', email: 'chris.m@company.com' },
      { id: 11, name: 'Amy Taylor', designation: 'UI/UX Designer', avatar: 'AT', status: 'Active', email: 'amy.t@company.com' },
      { id: 12, name: 'Kevin Patel', designation: 'Cloud Architect', avatar: 'KP', status: 'Active', email: 'kevin.p@company.com' },
    ];
  }

  getEmployeeProfile(): EmployeeProfile {
    return {
      name: 'Sanket Gund',
      email: 'sanket.gund@company.com',
      phone: '+91 98765 43210',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      employeeId: 'EMP-2024-001',
      joinDate: '2024-06-15',
      address: '123 Tech Park, Bangalore, India',
      avatar: 'SG',
      documents: [
        { name: 'Aadhar Card.pdf', date: '2024-06-15', size: '1.2 MB' },
        { name: 'PAN Card.pdf', date: '2024-06-15', size: '850 KB' },
        { name: 'Offer Letter.pdf', date: '2024-06-10', size: '2.1 MB' },
        { name: 'Resume.pdf', date: '2024-06-01', size: '540 KB' },
      ]
    };
  }
}
