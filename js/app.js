/**
 * TTH TECHNOLOGY — ENTERPRISE DEVICE MANAGEMENT (MDM) PLATFORM
 * Comprehensive Core Engine with Dual Mode: Admin Console & User Portal
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Initial State & Seed Data Generation
  // =========================================================================
  const STORAGE_KEYS = {
    ROLE: 'tth_current_role_v3',
    DEVICES: 'tth_devices_v2',
    POLICIES: 'tth_policies_v2',
    WORKSPACES: 'tth_workspaces_v2',
    CURRENT_WS: 'tth_current_ws_v2',
    TICKETS: 'tth_tickets_v2',
    AUDIT_LOGS: 'tth_audit_logs_v2',
    INVOICES: 'tth_invoices_v2',
    NOTIFICATIONS: 'tth_notifications_v2',
    SETTINGS: 'tth_settings_v2',
    THEME: 'tth_theme_mode',
    ADMIN_USERS: 'tth_admin_users_v2',
    CATALOG_APPS: 'tth_catalog_apps_v2',
    HARDWARE_REQS: 'tth_hardware_reqs_v2'
  };

  const defaultDevices = [
    {
      id: 'TTH-MAC-0021',
      name: 'MacBook Pro 14" M3 Pro',
      user: 'Nguyễn Minh Anh',
      department: 'Phát triển sản phẩm (R&D)',
      email: 'minhanh.nguyen@tth.vn',
      status: 'online',
      os: 'macOS Sonoma 14.5',
      osType: 'macOS',
      ip: '192.168.1.108',
      mac: '3C:22:FB:45:90:12',
      serial: 'C02G879MD6T3',
      battery: 92,
      storage: '342 GB / 512 GB',
      storagePercent: 67,
      cpu: 'Apple M3 Pro (12-core)',
      ram: '18 GB Unified Memory',
      lastSync: 'Vừa xong',
      enrolledDate: '15/01/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'Google Chrome', version: '128.0.6613.120', status: 'Tuân thủ' },
        { name: 'Slack Enterprise', version: '4.39.95', status: 'Tuân thủ' },
        { name: 'Visual Studio Code', version: '1.93.1', status: 'Tuân thủ' },
        { name: 'CrowdStrike Falcon', version: '7.15.0', status: 'Bảo vệ' }
      ],
      logs: [
        { time: '10:14 Hôm nay', event: 'Đồng bộ chính sách thành công qua Apple APNs' },
        { time: '08:30 Hôm nay', event: 'Khởi động máy và kết nối mạng nội bộ WiFi-TTH-Corp' },
        { time: '18:22 Hôm qua', event: 'Quét an ninh định kỳ: Không phát hiện mã độc' }
      ]
    },
    {
      id: 'TTH-WIN-0068',
      name: 'Dell Latitude 7440',
      user: 'Lê Thu Hà',
      department: 'Tài chính - Kế toán',
      email: 'thuha.le@tth.vn',
      status: 'warning',
      os: 'Windows 11 Pro 23H2',
      osType: 'Windows',
      ip: '192.168.1.145',
      mac: '84:A9:3E:12:88:51',
      serial: 'DL-LAT-7440-8832',
      battery: 68,
      storage: '410 GB / 512 GB',
      storagePercent: 80,
      cpu: 'Intel Core i7-1365U',
      ram: '16 GB LPDDR5',
      lastSync: '14 phút trước',
      enrolledDate: '02/03/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: false, antivirus: true, jailbreak: false, osUpToDate: false },
      apps: [
        { name: 'MISA SME.NET', version: '2024.1.2', status: 'Tuân thủ' },
        { name: 'Microsoft 365 Apps', version: '16.0.17928', status: 'Tuân thủ' },
        { name: 'Windows Defender', version: '4.18.24070', status: 'Cần cập nhật' }
      ],
      logs: [
        { time: '09:50 Hôm nay', event: 'Cảnh báo: Tường lửa Windows tạm thời bị vô hiệu hóa' },
        { time: '09:48 Hôm nay', event: 'Đồng bộ cấu hình từ TTH MDM Gateway' }
      ]
    },
    {
      id: 'TTH-AND-0184',
      name: 'Samsung Galaxy S24 Ultra',
      user: 'Nguyễn Minh Anh',
      department: 'Phát triển sản phẩm (R&D)',
      email: 'minhanh.nguyen@tth.vn',
      status: 'online',
      os: 'Android 15 (One UI 7.0)',
      osType: 'Android',
      ip: '10.20.4.52',
      mac: '9C:64:8B:2A:77:43',
      serial: 'SM-S928B-VN-908',
      battery: 85,
      storage: '112 GB / 256 GB',
      storagePercent: 44,
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12 GB RAM',
      lastSync: '3 phút trước',
      enrolledDate: '10/02/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'TTH Enterprise Portal', version: '2.4.0', status: 'Được quản lý' },
        { name: 'Microsoft Teams', version: '1416.1.0', status: 'Tuân thủ' },
        { name: 'Samsung Knox Container', version: '3.10', status: 'Hoạt động' }
      ],
      logs: [
        { time: '10:05 Hôm nay', event: 'Kiểm tra Knox Workspace: Toàn vẹn phần cứng PASS' }
      ]
    },
    {
      id: 'TTH-IOS-0122',
      name: 'iPhone 15 Pro Max',
      user: 'Phạm Đức Long',
      department: 'Ban Giám Đốc',
      email: 'duclong.pham@tth.vn',
      status: 'online',
      os: 'iOS 18.2',
      osType: 'iOS',
      ip: '10.20.4.19',
      mac: 'AC:BC:32:89:14:6E',
      serial: 'FFMD9871QZ3P',
      battery: 79,
      storage: '190 GB / 512 GB',
      storagePercent: 37,
      cpu: 'Apple A17 Pro',
      ram: '8 GB RAM',
      lastSync: '6 phút trước',
      enrolledDate: '20/11/2025',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'TTH Executive BI', version: '3.1.0', status: 'Mã hóa' },
        { name: 'Outlook Corporate', version: '4.2435.0', status: 'Tuân thủ' }
      ],
      logs: [
        { time: '10:10 Hôm nay', event: 'Xác thực sinh trắc học Face ID thành công' }
      ]
    },
    {
      id: 'TTH-WIN-0037',
      name: 'Lenovo ThinkPad X1 Carbon Gen 11',
      user: 'Vũ Hoàng Nam',
      department: 'An ninh thông tin (SOC)',
      email: 'hoangnam.vu@tth.vn',
      status: 'offline',
      os: 'Windows 11 Enterprise',
      osType: 'Windows',
      ip: '192.168.1.189',
      mac: 'E4:54:E8:22:91:BB',
      serial: 'LNV-X1C-2024-0012',
      battery: 45,
      storage: '420 GB / 1024 GB',
      storagePercent: 41,
      cpu: 'Intel Core i7-1370P vPro',
      ram: '32 GB LPDDR5',
      lastSync: 'Hôm qua (19:30)',
      enrolledDate: '12/12/2025',
      location: 'Đã ngoại tuyến - Vị trí gần nhất: Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'Wireshark', version: '4.2.4', status: 'Quản lý' },
        { name: 'BitLocker Drive Encryption', version: '10.0', status: 'Khóa an toàn' }
      ],
      logs: [
        { time: '19:30 Hôm qua', event: 'Ngắt kết nối mạng - Thiết bị vào trạng thái Sleep' }
      ]
    },
    {
      id: 'TTH-AND-0191',
      name: 'Xiaomi Redmi Note 13 Pro',
      user: 'Đỗ Mai Phương',
      department: 'Marketing & Truyền thông',
      email: 'maiphuong.do@tth.vn',
      status: 'online',
      os: 'Android 14 (HyperOS)',
      osType: 'Android',
      ip: '192.168.1.204',
      mac: '44:6D:57:9B:10:82',
      serial: 'XM-RN13-VN-441',
      battery: 95,
      storage: '98 GB / 256 GB',
      storagePercent: 38,
      cpu: 'Snapdragon 7s Gen 2',
      ram: '8 GB RAM',
      lastSync: '9 phút trước',
      enrolledDate: '18/04/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'Canva Pro Enterprise', version: '2.280.0', status: 'Tuân thủ' },
        { name: 'Meta Business Suite', version: '450.0', status: 'Tuân thủ' }
      ],
      logs: [
        { time: '10:02 Hôm nay', event: 'Đồng bộ hồ sơ tài khoản doanh nghiệp' }
      ]
    },
    {
      id: 'TTH-WIN-0074',
      name: 'HP EliteBook 840 G10',
      user: 'Bùi Gia Huy',
      department: 'Hành chính Nhân sự',
      email: 'giahuy.bui@tth.vn',
      status: 'warning',
      os: 'Windows 10 Pro 22H2',
      osType: 'Windows',
      ip: '192.168.1.177',
      mac: 'C8:D9:D2:11:44:88',
      serial: 'HP-EB-840-7711',
      battery: 55,
      storage: '230 GB / 256 GB',
      storagePercent: 90,
      cpu: 'Intel Core i5-1335U',
      ram: '16 GB DDR5',
      lastSync: '42 phút trước',
      enrolledDate: '05/01/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: false, passcode: true, firewall: true, antivirus: false, jailbreak: false, osUpToDate: false },
      apps: [
        { name: 'VNPT CA Token Manager', version: '1.0.8', status: 'Cần xác thực' },
        { name: 'Microsoft Office 2019', version: '16.0', status: 'Cũ' }
      ],
      logs: [
        { time: '09:20 Hôm nay', event: 'Cảnh báo: Ổ đĩa hệ thống C: còn dưới 10% dung lượng' },
        { time: '09:18 Hôm nay', event: 'Chưa kích hoạt mã hóa BitLocker trên ổ đĩa chính' }
      ]
    },
    {
      id: 'TTH-MAC-0045',
      name: 'MacBook Air 15" M2',
      user: 'Hoàng Yến Nhi',
      department: 'Thiết kế Sản phẩm (UI/UX)',
      email: 'yennhi.hoang@tth.vn',
      status: 'online',
      os: 'macOS Sonoma 14.4',
      osType: 'macOS',
      ip: '192.168.1.112',
      mac: 'F0:18:98:4B:92:01',
      serial: 'C02KF712Q6L2',
      battery: 88,
      storage: '270 GB / 512 GB',
      storagePercent: 52,
      cpu: 'Apple M2 (8-core)',
      ram: '16 GB Unified Memory',
      lastSync: '5 phút trước',
      enrolledDate: '14/02/2026',
      location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
      lat: 21.028511,
      lng: 105.783452,
      compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
      apps: [
        { name: 'Figma Desktop', version: '124.2.1', status: 'Tuân thủ' },
        { name: 'Adobe Creative Cloud', version: '6.2.0', status: 'Tuân thủ' }
      ],
      logs: [
        { time: '10:07 Hôm nay', event: 'Kiểm tra tuân thủ bảo mật tự động: Hợp lệ' }
      ]
    }
  ];

  const defaultPolicies = [
    { id: 'POL-PASSCODE', title: 'Bắt buộc mật khẩu màn hình phức tạp', category: 'Xác thực & Màn hình', description: 'Yêu cầu mật khẩu tối thiểu 8 ký tự gồm chữ hoa, số và ký tự đặc biệt. Tự động khóa sau 5 phút.', enabled: true, severity: 'critical' },
    { id: 'POL-ENCRYPTION', title: 'Bắt buộc mã hóa toàn bộ ổ đĩa (BitLocker / FileVault)', category: 'Bảo vệ dữ liệu', description: 'Mã hóa phần cứng AES-256 cho tất cả laptop Windows & Mac thuộc sở hữu công ty.', enabled: true, severity: 'critical' },
    { id: 'POL-WIPE-FAIL', title: 'Tự động xóa thiết bị sau 10 lần nhập sai mật khẩu', category: 'Chống thất lạc', description: 'Bảo vệ chống đánh cắp dữ liệu vật lý khi thiết bị bị mất cắp hoặc cố ý bẻ khóa.', enabled: true, severity: 'critical' },
    { id: 'POL-ROOT-DETECT', title: 'Phát hiện và cô lập thiết bị Root / Jailbreak', category: 'Toàn vẹn hệ điều hành', description: 'Ngay lập tức thu hồi quyền truy cập mạng nội bộ nếu phát hiện can thiệp kernel hệ điều hành.', enabled: true, severity: 'critical' },
    { id: 'POL-USB-BLOCK', title: 'Chặn thiết bị lưu trữ ngoài qua cổng USB (DLP)', category: 'Chống rò rỉ dữ liệu', description: 'Chỉ cho phép kết nối chuột, bàn phím và thiết bị được cấp phép trong danh sách trắng.', enabled: false, severity: 'standard' },
    { id: 'POL-GEOFENCE', title: 'Cảnh báo Geofencing ra ngoài lãnh thổ Việt Nam', category: 'Vị trí & Tuân thủ', description: 'Gửi cảnh báo khẩn cấp đến SOC khi thiết bị xuất hiện ở vị trí địa lý bất thường.', enabled: true, severity: 'standard' },
    { id: 'POL-FIREWALL', title: 'Bắt buộc kích hoạt Tường lửa & Antivirus thời gian thực', category: 'An ninh mạng', description: 'Ngăn chặn tắt bảo vệ thời gian thực từ Microsoft Defender hoặc CrowdStrike EDR.', enabled: true, severity: 'critical' },
    { id: 'POL-APP-RESTRICT', title: 'Chặn cài đặt ứng dụng ngoài kho chính thức (Sideloading)', category: 'Kiểm soát phần mềm', description: 'Chỉ cho phép cài đặt app từ Google Play Managed, Apple Business Manager hoặc TTH Store.', enabled: false, severity: 'standard' }
  ];

  const defaultWorkspaces = [
    { id: 'WS-HQ', name: 'TTH Technology — Trụ sở Hà Nội', address: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội', deviceCount: 248, plan: 'Business Plan (500 máy)', status: 'active', isCurrent: true },
    { id: 'WS-HCM', name: 'TTH Technology — Chi nhánh TP.HCM', address: 'Tầng 12, Tòa nhà SunWah, Quận 1, TP.HCM', deviceCount: 65, plan: 'Business Plan (100 máy)', status: 'active', isCurrent: false },
    { id: 'WS-DNG', name: 'TTH Technology — Chi nhánh Đà Nẵng', address: 'Đường Nguyễn Văn Linh, Hải Châu, Đà Nẵng', deviceCount: 24, plan: 'Starter Plan (50 máy)', status: 'active', isCurrent: false }
  ];

  const defaultTickets = [
    {
      id: 'TK-1082',
      title: 'Yêu cầu mở quyền truy cập cổng USB tạm thời để sao chép tài liệu kiểm toán',
      author: 'Lê Thu Hà (Kế toán)',
      date: '27/10/2026 · 08:45',
      priority: 'Cao',
      status: 'Đang xử lý',
      messages: [
        { sender: 'Lê Thu Hà', time: '08:45', text: 'Chào ban IT, phòng Kế toán đang có đoàn kiểm toán độc lập làm việc, em cần cắm USB chuyên dụng của bên kiểm toán trong 2 ngày tới. Nhờ anh/chị hỗ trợ mở khóa chính sách USB trên máy TTH-WIN-0068.' },
        { sender: 'Hỗ trợ TTH (Admin)', time: '09:02', text: 'Chào chị Hà, bộ phận IT đã tiếp nhận. Chính sách sẽ được tạo ngoại lệ tạm thời trong 48 giờ tới và ghi lại nhật ký kiểm toán. Chị vui lòng gửi mã Serial của USB để bên em whitelist nhé.' }
      ]
    },
    {
      id: 'TK-1081',
      title: 'Cần hỗ trợ gia hạn chứng chỉ MDM Enrollment trên máy MacBook mới nhận',
      author: 'Hoàng Yến Nhi (UI/UX)',
      date: '26/10/2026 · 14:15',
      priority: 'Trung bình',
      status: 'Đã giải quyết',
      messages: [
        { sender: 'Hoàng Yến Nhi', time: '14:15', text: 'Chào anh/chị, em mở máy lên thấy thông báo Certificate Expiring in 3 days. Nhờ admin gia hạn giúp em.' },
        { sender: 'Hỗ trợ TTH (Admin)', time: '14:30', text: 'Đã đẩy profile cấu hình mới tự động từ APNs server. Bạn khởi động lại máy để nhận chứng chỉ 2027 nhé.' }
      ]
    }
  ];

  const defaultInvoices = [
    { id: 'INV-2026-10', date: '27/10/2026', amount: '2.490.000 đ', plan: 'Business Plan (Tháng 10/2026)', status: 'Đã thanh toán', method: 'Vietcombank Auto-Debit' },
    { id: 'INV-2026-09', date: '27/09/2026', amount: '2.490.000 đ', plan: 'Business Plan (Tháng 09/2026)', status: 'Đã thanh toán', method: 'Vietcombank Auto-Debit' }
  ];

  const defaultAuditLogs = [
    { actor: 'Admin (Bạn)', action: 'Đăng nhập vào bảng điều khiển TTH Console', ip: '113.190.234.12', time: 'Vừa xong', severity: 'info' },
    { actor: 'TTH Policy Engine', action: 'Đẩy cấu hình bảo mật tự động tới 216 thiết bị online', ip: 'System', time: '12 phút trước', severity: 'success' },
    { actor: 'Admin (Bạn)', action: 'Khóa màn hình từ xa thiết bị TTH-WIN-0068 theo yêu cầu', ip: '113.190.234.12', time: '40 phút trước', severity: 'warning' },
    { actor: 'MDM Gateway', action: 'Phát hiện thiết bị TTH-WIN-0074 vi phạm chính sách mã hóa ổ đĩa', ip: '192.168.1.177', time: '09:18 Hôm nay', severity: 'danger' }
  ];

  const defaultNotifications = [
    { id: 1, title: 'Cảnh báo bảo mật: 2 thiết bị chưa bật mã hóa ổ đĩa', time: '15 phút trước', unread: true, type: 'warning' },
    { id: 2, title: 'Gia hạn gói Business Plan thành công: 2.490.000đ', time: 'Hôm nay · 00:01', unread: false, type: 'success' },
    { id: 3, title: 'Có 1 yêu cầu hỗ trợ mới cần phản hồi từ Kế toán', time: 'Hôm nay · 08:45', unread: true, type: 'info' }
  ];

  const defaultSettings = {
    allowSelfEnroll: true,
    requireMFA: true,
    maintenanceMode: false,
    soundEffects: true,
    autoSyncMinutes: 5,
    companyName: 'TTH Technology Joint Stock Co.',
    adminEmail: 'security@tth.vn'
  };

  // Seed Data for Admin User Management (RBAC)
  const defaultAdminUsers = [
    { id: 'USR-01', name: 'Nguyễn Minh Anh', email: 'minhanh.nguyen@tth.vn', department: 'Phát triển sản phẩm (R&D)', role: 'Nhân viên (User)', devicesCount: 2, mfa: true, status: 'Hoạt động' },
    { id: 'USR-02', name: 'Trần Văn Hoàng (Admin)', email: 'security@tth.vn', department: 'An ninh thông tin (SOC)', role: 'Super Admin', devicesCount: 3, mfa: true, status: 'Hoạt động' },
    { id: 'USR-03', name: 'Lê Thu Hà', email: 'thuha.le@tth.vn', department: 'Tài chính - Kế toán', role: 'Nhân viên (User)', devicesCount: 1, mfa: true, status: 'Hoạt động' },
    { id: 'USR-04', name: 'Vũ Hoàng Nam', email: 'hoangnam.vu@tth.vn', department: 'An ninh thông tin (SOC)', role: 'IT Manager', devicesCount: 2, mfa: true, status: 'Hoạt động' },
    { id: 'USR-05', name: 'Phạm Đức Long', email: 'duclong.pham@tth.vn', department: 'Ban Giám Đốc', role: 'Ban Giám Đốc (Auditor)', devicesCount: 2, mfa: true, status: 'Hoạt động' },
    { id: 'USR-06', name: 'Bùi Gia Huy', email: 'giahuy.bui@tth.vn', department: 'Hành chính Nhân sự', role: 'Nhân viên (User)', devicesCount: 1, mfa: false, status: 'Cảnh báo 2FA' }
  ];

  // Seed Data for User Enterprise App Catalog
  const defaultCatalogApps = [
    { id: 'app-slack', name: 'Slack Enterprise Grid', desc: 'Ứng dụng liên lạc, họp nhóm và trao đổi công việc toàn công ty', icon: '💬', category: 'Giao tiếp', version: '4.39.95', installed: true, size: '142 MB' },
    { id: 'app-figma', name: 'Figma Desktop', desc: 'Bộ công cụ thiết kế giao diện UI/UX và cộng tác thời gian thực', icon: '🎨', category: 'Thiết kế', version: '124.2.1', installed: true, size: '210 MB' },
    { id: 'app-vscode', name: 'Visual Studio Code', desc: 'Trình biên tập mã nguồn chuyên dụng cho lập trình viên', icon: '💻', category: 'Phát triển', version: '1.93.1', installed: true, size: '320 MB' },
    { id: 'app-vpn', name: 'TTH Secure Global VPN', desc: 'Kết nối mạng nội bộ an toàn mã hóa WireGuard 256-bit', icon: '🛡️', category: 'Bảo mật', version: '3.1.0', installed: true, size: '45 MB' },
    { id: 'app-docker', name: 'Docker Desktop Business', desc: 'Môi trường ảo hóa container dành cho phát triển vi dịch vụ', icon: '🐳', category: 'Phát triển', version: '4.33.1', installed: false, size: '580 MB' },
    { id: 'app-office', name: 'Microsoft 365 Apps', desc: 'Bộ ứng dụng văn phòng Word, Excel, PowerPoint, Outlook bản quyền', icon: '📊', category: 'Văn phòng', version: '16.0.179', installed: false, size: '1.8 GB' },
    { id: 'app-zoom', name: 'Zoom Workplace', desc: 'Phần mềm họp video trực tuyến phòng họp số chất lượng cao', icon: '📹', category: 'Giao tiếp', version: '6.1.10', installed: false, size: '98 MB' },
    { id: 'app-postman', name: 'Postman Enterprise', desc: 'Nền tảng kiểm thử và thiết kế API chuyên nghiệp', icon: '🚀', category: 'Phát triển', version: '11.8.0', installed: false, size: '260 MB' }
  ];

  // Seed Data for User Hardware Requests
  const defaultHardwareRequests = [
    {
      id: 'REQ-2026-001',
      item: 'Màn hình Dell UltraSharp 27" 4K (U2723QE)',
      category: 'Màn hình ngoài',
      requestedDate: '24/10/2026',
      status: 'Đang chuẩn bị',
      currentStep: 3,
      reason: 'Hỗ trợ thiết kế đồ họa UI/UX độ chuẩn màu cao sRGB 100%'
    },
    {
      id: 'REQ-2026-002',
      item: 'Chuột công thái học Logitech MX Master 3S',
      category: 'Phụ kiện ngoại vi',
      requestedDate: '15/10/2026',
      status: 'Đã hoàn tất',
      currentStep: 4,
      reason: 'Phụ kiện phục vụ làm việc văn phòng'
    }
  ];

  // State store
  const state = {
    role: localStorage.getItem(STORAGE_KEYS.ROLE) || 'admin', // 'admin' or 'user'
    devices: loadStorage(STORAGE_KEYS.DEVICES, defaultDevices),
    policies: loadStorage(STORAGE_KEYS.POLICIES, defaultPolicies),
    workspaces: loadStorage(STORAGE_KEYS.WORKSPACES, defaultWorkspaces),
    currentWorkspace: loadStorage(STORAGE_KEYS.CURRENT_WS, defaultWorkspaces[0]),
    tickets: loadStorage(STORAGE_KEYS.TICKETS, defaultTickets),
    auditLogs: loadStorage(STORAGE_KEYS.AUDIT_LOGS, defaultAuditLogs),
    invoices: loadStorage(STORAGE_KEYS.INVOICES, defaultInvoices),
    notifications: loadStorage(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications),
    settings: loadStorage(STORAGE_KEYS.SETTINGS, defaultSettings),
    adminUsers: loadStorage(STORAGE_KEYS.ADMIN_USERS, defaultAdminUsers),
    catalogApps: loadStorage(STORAGE_KEYS.CATALOG_APPS, defaultCatalogApps),
    hardwareRequests: loadStorage(STORAGE_KEYS.HARDWARE_REQS, defaultHardwareRequests),
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
    selectedDeviceIds: new Set(),
    activePage: 'overview',
    chartTimeframe: 7,
    activeTicketId: null,
    editingDeviceId: null
  };

  function loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read failed for', key, e);
      return fallback;
    }
  }

  function saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Storage write failed for', key, e);
    }
  }

  function saveAll() {
    saveStorage(STORAGE_KEYS.DEVICES, state.devices);
    saveStorage(STORAGE_KEYS.POLICIES, state.policies);
    saveStorage(STORAGE_KEYS.WORKSPACES, state.workspaces);
    saveStorage(STORAGE_KEYS.CURRENT_WS, state.currentWorkspace);
    saveStorage(STORAGE_KEYS.TICKETS, state.tickets);
    saveStorage(STORAGE_KEYS.AUDIT_LOGS, state.auditLogs);
    saveStorage(STORAGE_KEYS.INVOICES, state.invoices);
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    saveStorage(STORAGE_KEYS.SETTINGS, state.settings);
    saveStorage(STORAGE_KEYS.ADMIN_USERS, state.adminUsers);
    saveStorage(STORAGE_KEYS.CATALOG_APPS, state.catalogApps);
    saveStorage(STORAGE_KEYS.HARDWARE_REQS, state.hardwareRequests);
  }

  // =========================================================================
  // 2. Audio Effects via Web Audio API
  // =========================================================================
  let audioCtx = null;
  function playBeep(type = 'click') {
    if (!state.settings.soundEffects) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'warning') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(260, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (err) {}
  }

  // =========================================================================
  // 3. Toast Notifications Engine
  // =========================================================================
  function toast(message, type = 'info') {
    const stack = document.getElementById('toastStack');
    if (!stack) return;

    const el = document.createElement('div');
    el.className = `toast-item ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') { icon = '✓'; playBeep('success'); }
    else if (type === 'warning') { icon = '⚠️'; playBeep('warning'); }
    else if (type === 'danger') { icon = '✕'; playBeep('warning'); }
    else { playBeep('click'); }

    el.innerHTML = `
      <span style="font-weight:800; font-size:14px">${icon}</span>
      <span style="flex:1">${escapeHtml(message)}</span>
    `;

    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));

    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 250);
    }, 3400);
  }

  function addAudit(action, severity = 'info') {
    const nowStr = 'Vừa xong';
    state.auditLogs.unshift({
      actor: state.role === 'admin' ? 'Admin (Bạn)' : 'Nguyễn Minh Anh (User)',
      action: action,
      ip: '113.190.234.12',
      time: nowStr,
      severity: severity
    });
    if (state.auditLogs.length > 50) state.auditLogs.pop();
    saveStorage(STORAGE_KEYS.AUDIT_LOGS, state.auditLogs);
    renderAuditLogs();
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // =========================================================================
  // 4. Role Switcher Controller (Admin Mode <--> User Mode)
  // =========================================================================
  function setRole(newRole) {
    if (newRole !== 'admin' && newRole !== 'user') newRole = 'admin';
    state.role = newRole;
    try { localStorage.setItem(STORAGE_KEYS.ROLE, newRole); } catch (e) { console.warn('Không thể lưu vai trò:', e); }

    const adminNav = document.getElementById('sidebarAdminNav');
    const userNav = document.getElementById('sidebarUserNav');
    const roleBtnAdmin = document.getElementById('roleSwitchAdminBtn');
    const roleBtnUser = document.getElementById('roleSwitchUserBtn');
    const userProfileName = document.getElementById('sidebarUserName');
    const userProfileEmail = document.getElementById('sidebarUserEmail');
    const userAvatar = document.getElementById('sidebarUserAvatar');
    const topbarUserAvatar = document.getElementById('topbarUserAvatar');
    const portalModeBadge = document.getElementById('portalModeBadge');

    if (newRole === 'user') {
      if (adminNav) adminNav.style.display = 'none';
      if (userNav) userNav.style.display = 'block';
      if (roleBtnAdmin) roleBtnAdmin.classList.remove('active', 'admin-mode');
      if (roleBtnUser) roleBtnUser.classList.add('active', 'user-mode');
      if (userProfileName) userProfileName.textContent = 'Nguyễn Minh Anh';
      if (userProfileEmail) userProfileEmail.textContent = 'minhanh.nguyen@tth.vn · R&D';
      if (userAvatar) userAvatar.textContent = 'MA';
      if (topbarUserAvatar) topbarUserAvatar.textContent = 'MA';
      if (portalModeBadge) {
        portalModeBadge.textContent = '👤 CỔNG NHÂN VIÊN';
        portalModeBadge.className = 'status-pill status-online';
      }
      navigateTo('user-devices');
      toast('Đã chuyển sang Giao diện Nhân Viên (User Self-Service Portal)!', 'success');
    } else {
      if (adminNav) adminNav.style.display = 'block';
      if (userNav) userNav.style.display = 'none';
      if (roleBtnAdmin) roleBtnAdmin.classList.add('active', 'admin-mode');
      if (roleBtnUser) roleBtnUser.classList.remove('active', 'user-mode');
      if (userProfileName) userProfileName.textContent = 'Quản trị viên IT';
      if (userProfileEmail) userProfileEmail.textContent = 'security@tth.vn · SOC';
      if (userAvatar) userAvatar.textContent = 'TH';
      if (topbarUserAvatar) topbarUserAvatar.textContent = 'TH';
      if (portalModeBadge) {
        portalModeBadge.textContent = '👑 QUYỀN QUẢN TRỊ VIÊN';
        portalModeBadge.className = 'status-pill status-warning';
      }
      navigateTo('overview');
      toast('Đã chuyển sang Giao diện Quản Trị Viên (Admin Console)!', 'info');
    }
  }

  // =========================================================================
  // 5. Dark / Light Theme Controller
  // =========================================================================
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const themeIcon = document.getElementById('themeToggleBtn');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeIcon.title = theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối';
    }
  }

  // =========================================================================
  // 6. Navigation Router & Page Views
  // =========================================================================
  const PAGE_TITLES = {
    // Admin Views
    overview: 'Tổng quan hệ thống',
    devices: 'Quản lý thiết bị doanh nghiệp',
    security: 'Bảo mật Zero-Trust & Chính sách',
    reports: 'Báo cáo & Phân tích',
    billing: 'Gói dịch vụ & Thanh toán',
    support: 'Trung tâm hỗ trợ & Ticket Desk',
    admin: 'Admin Console & Multi-Tenant',
    'admin-users': 'Quản trị Người Dùng & Phân Quyền (RBAC)',
    'admin-telemetry': 'Giám sát Hạ Tầng & Cổng APNs/FCM',

    // User Views
    'user-devices': 'Thiết bị của tôi (My Devices)',
    'user-apps': 'Cửa hàng ứng dụng nội bộ (Enterprise App Catalog)',
    'user-requests': 'Yêu cầu cấp phát thiết bị phần cứng',
    'user-emergency': 'Báo mất thiết bị & Trợ giúp khẩn cấp',
    'user-handbook': 'Sổ tay IT & Hướng dẫn kỹ thuật'
  };

  function navigateTo(pageId) {
    if (!PAGE_TITLES[pageId]) pageId = state.role === 'user' ? 'user-devices' : 'overview';
    state.activePage = pageId;

    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`view-${pageId}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    const breadcrumb = document.getElementById('currentBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = PAGE_TITLES[pageId];

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playBeep('click');

    // Trigger page renders
    if (pageId === 'overview') renderOverviewDashboard();
    if (pageId === 'devices') renderDeviceTable();
    if (pageId === 'security') renderPolicies();
    if (pageId === 'reports') renderReportsView();
    if (pageId === 'billing') renderBillingView();
    if (pageId === 'support') renderSupportDesk();
    if (pageId === 'admin') renderAdminConsole();
    if (pageId === 'admin-users') renderAdminUsers();
    if (pageId === 'admin-telemetry') renderAdminTelemetry();

    // User portal renders
    if (pageId === 'user-devices') renderUserDevices();
    if (pageId === 'user-apps') renderAppCatalog();
    if (pageId === 'user-requests') renderHardwareRequests();
  }

  function openMobileSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
    document.getElementById('sidebarOverlay')?.classList.add('open');
  }

  function closeMobileSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('open');
  }

  // =========================================================================
  // 7. Interactive SVG Chart Component (Overview Timeline)
  // =========================================================================
  function renderActivityChart() {
    const svg = document.getElementById('activityChartSvg');
    if (!svg) return;

    const days = state.chartTimeframe;
    const pointsCount = days === 7 ? 7 : (days === 30 ? 15 : 20);
    const baseValue = 200;
    const dataPoints = [];
    for (let i = 0; i < pointsCount; i++) {
      const variation = Math.sin(i * 0.7) * 20 + Math.cos(i * 0.3) * 15 + (Math.random() * 8);
      const val = Math.min(248, Math.max(160, Math.round(baseValue + variation)));
      dataPoints.push(val);
    }

    const width = 640;
    const height = 210;
    const paddingX = 40;
    const paddingY = 25;
    const plotWidth = width - paddingX * 2;
    const plotHeight = height - paddingY * 2;
    const minVal = 140;
    const maxVal = 260;

    const coords = dataPoints.map((val, idx) => {
      const x = paddingX + (idx / (pointsCount - 1)) * plotWidth;
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * plotHeight;
      return { x, y, val };
    });

    let pathD = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const cur = coords[i];
      const cpx1 = prev.x + (cur.x - prev.x) / 2;
      const cpy1 = prev.y;
      const cpx2 = prev.x + (cur.x - prev.x) / 2;
      const cpy2 = cur.y;
      pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${cur.x} ${cur.y}`;
    }

    const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;
    const labels = days === 7 
      ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
      : (days === 30 ? ['01/10', '05/10', '10/10', '15/10', '20/10', '25/10', '27/10'] : ['Tháng 8', 'Tháng 9', 'Tháng 10']);

    let svgInner = `
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <g stroke="var(--border-color)" stroke-dasharray="3 3" stroke-width="1">
        <line x1="${paddingX}" y1="${paddingY}" x2="${width - paddingX}" y2="${paddingY}" />
        <line x1="${paddingX}" y1="${paddingY + plotHeight * 0.33}" x2="${width - paddingX}" y2="${paddingY + plotHeight * 0.33}" />
        <line x1="${paddingX}" y1="${paddingY + plotHeight * 0.66}" x2="${width - paddingX}" y2="${paddingY + plotHeight * 0.66}" />
        <line x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}" />
      </g>
      <path d="${areaD}" fill="url(#chartGradient)" />
      <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" />
    `;

    coords.forEach((pt, i) => {
      svgInner += `
        <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#ffffff" stroke="#3b82f6" stroke-width="2.5" 
          class="chart-point" data-val="${pt.val}" data-idx="${i}" style="cursor:pointer; transition:r 0.15s ease;" />
      `;
    });

    labels.forEach((lbl, i) => {
      const x = paddingX + (i / (labels.length - 1)) * plotWidth;
      svgInner += `<text x="${x}" y="${height - 6}" font-size="10" fill="var(--text-muted)" text-anchor="middle" font-weight="600">${lbl}</text>`;
    });

    svg.innerHTML = svgInner;

    const tooltip = document.getElementById('chartTooltip');
    svg.querySelectorAll('.chart-point').forEach(circle => {
      circle.addEventListener('mouseenter', () => {
        circle.setAttribute('r', '7');
        if (tooltip) {
          const val = circle.dataset.val;
          tooltip.innerHTML = `<strong>${val} thiết bị</strong> trực tuyến`;
          tooltip.style.left = `${circle.getAttribute('cx')}px`;
          tooltip.style.top = `${circle.getAttribute('cy')}px`;
          tooltip.style.opacity = '1';
        }
      });
      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '4');
        if (tooltip) tooltip.style.opacity = '0';
      });
    });
  }

  // =========================================================================
  // 8. Overview Dashboard Metrics & Widgets
  // =========================================================================
  function renderOverviewDashboard() {
    const total = state.devices.length;
    const online = state.devices.filter(d => d.status === 'online').length;
    const warning = state.devices.filter(d => d.status === 'warning').length;
    const offline = state.devices.filter(d => d.status === 'offline').length;
    const locked = state.devices.filter(d => d.status === 'locked').length;

    let compliantCount = 0;
    state.devices.forEach(d => {
      const c = d.compliance || {};
      if (c.fileVault && c.passcode && c.firewall && c.antivirus && !c.jailbreak) compliantCount++;
    });
    const complianceRate = total > 0 ? ((compliantCount / total) * 100).toFixed(1) : '100.0';

    setText('metricTotalDevices', total);
    setText('metricOnlineDevices', online);
    setText('metricWarningDevices', warning);
    setText('metricComplianceRate', `${complianceRate}%`);

    const onlinePct = total > 0 ? (online / total) * 100 : 0;
    const warnPct = total > 0 ? (warning / total) * 100 : 0;
    const offPct = total > 0 ? ((offline + locked) / total) * 100 : 0;

    setWidth('barOnline', `${onlinePct}%`);
    setWidth('barWarning', `${warnPct}%`);
    setWidth('barOffline', `${offPct}%`);

    setText('countOnline', online);
    setText('countWarning', warning);
    setText('countOffline', offline + locked);

    setText('heroComplianceScore', `${complianceRate}%`);
    setWidth('heroComplianceBar', `${complianceRate}%`);

    const recentRows = document.getElementById('recentDevicesRows');
    if (recentRows) {
      recentRows.innerHTML = state.devices.slice(0, 5).map(d => renderDeviceRowHtml(d, false)).join('');
      attachDeviceTableListeners();
    }

    renderActivityChart();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setWidth(id, width) {
    const el = document.getElementById(id);
    if (el) el.style.width = width;
  }

  // =========================================================================
  // 9. Device Fleet Management (CRUD + Filtering + Bulk Actions)
  // =========================================================================
  function renderDeviceTable() {
    const container = document.getElementById('deviceListRows');
    if (!container) return;

    const search = (document.getElementById('deviceSearchInput')?.value || '').toLowerCase();
    const osFilter = document.getElementById('deviceOsFilter')?.value || 'all';
    const statusFilter = document.getElementById('deviceStatusFilter')?.value || 'all';
    const deptFilter = document.getElementById('deviceDeptFilter')?.value || 'all';

    const filtered = state.devices.filter(d => {
      const matchesSearch = 
        d.name.toLowerCase().includes(search) ||
        d.id.toLowerCase().includes(search) ||
        d.user.toLowerCase().includes(search) ||
        d.department.toLowerCase().includes(search) ||
        d.ip.toLowerCase().includes(search);

      const matchesOs = osFilter === 'all' || d.osType === osFilter;
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchesDept = deptFilter === 'all' || d.department.includes(deptFilter);

      return matchesSearch && matchesOs && matchesStatus && matchesDept;
    });

    setText('statAllDevices', state.devices.length);
    setText('statAndroidCount', state.devices.filter(d => d.osType === 'Android').length);
    setText('statWindowsCount', state.devices.filter(d => d.osType === 'Windows').length);
    setText('statAppleCount', state.devices.filter(d => d.osType === 'macOS' || d.osType === 'iOS').length);
    setText('navDeviceBadge', state.devices.length);
    setText('deviceFilterCountBadge', `${filtered.length} / ${state.devices.length}`);

    if (filtered.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 40px; color: var(--text-muted);">
            <div style="font-size: 28px; margin-bottom: 8px;">🔍</div>
            <strong>Không tìm thấy thiết bị nào phù hợp bộ lọc</strong>
            <p style="font-size:12px; margin-top:4px;">Thử thay đổi từ khóa hoặc đặt lại bộ lọc tìm kiếm.</p>
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = filtered.map(d => renderDeviceRowHtml(d, true)).join('');
    attachDeviceTableListeners();
  }

  function getOsIcon(osType) {
    switch (osType) {
      case 'macOS': return '🍏';
      case 'iOS': return '📱';
      case 'Windows': return '🪟';
      case 'Android': return '🤖';
      default: return '💻';
    }
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'online': return '<span class="status-pill status-online">Trực tuyến</span>';
      case 'warning': return '<span class="status-pill status-warning">Cảnh báo</span>';
      case 'offline': return '<span class="status-pill status-offline">Ngoại tuyến</span>';
      case 'locked': return '<span class="status-pill status-locked">Đã khóa từ xa</span>';
      default: return `<span class="status-pill status-offline">${escapeHtml(status)}</span>`;
    }
  }

  function renderDeviceRowHtml(d, hasCheckbox = false) {
    const isChecked = state.selectedDeviceIds.has(d.id);
    return `
      <tr data-device-id="${escapeHtml(d.id)}">
        ${hasCheckbox ? `
          <td>
            <input type="checkbox" class="device-select-checkbox" data-id="${escapeHtml(d.id)}" ${isChecked ? 'checked' : ''}>
          </td>
        ` : ''}
        <td>
          <div class="device-cell">
            <div class="device-avatar-icon">${getOsIcon(d.osType)}</div>
            <div class="device-info-text">
              <b>${escapeHtml(d.name)}</b>
              <small>${escapeHtml(d.id)} · ${escapeHtml(d.ip)}</small>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight:600; font-size:13px">${escapeHtml(d.user)}</div>
          <small style="color:var(--text-muted); font-size:11px">${escapeHtml(d.department)}</small>
        </td>
        <td><span class="os-pill">${escapeHtml(d.os)}</span></td>
        <td>${getStatusBadge(d.status)}</td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <div style="width:38px; height:5px; background:var(--border-light); border-radius:99px; overflow:hidden;">
              <div style="width:${d.battery}%; height:100%; background:${d.battery < 20 ? 'var(--danger)' : 'var(--success)'}"></div>
            </div>
            <small style="font-size:11px; font-weight:600">${d.battery}%</small>
          </div>
        </td>
        <td><small style="color:var(--text-muted); font-size:11px">${escapeHtml(d.lastSync)}</small></td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary btn-sm action-inspect-device" data-id="${escapeHtml(d.id)}" title="Xem thông tin chi tiết & điều khiển từ xa">
              Chi tiết & MDM
            </button>
            <button class="btn btn-secondary btn-sm action-edit-device" data-id="${escapeHtml(d.id)}" title="Sửa thông tin">
              ✏️
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function attachDeviceTableListeners() {
    document.querySelectorAll('.device-select-checkbox').forEach(cb => {
      cb.onchange = e => {
        const id = e.target.dataset.id;
        if (e.target.checked) state.selectedDeviceIds.add(id);
        else state.selectedDeviceIds.delete(id);
        updateBulkActionToolbar();
      };
    });

    const selectAll = document.getElementById('selectAllDevices');
    if (selectAll) {
      selectAll.onchange = e => {
        if (e.target.checked) state.devices.forEach(d => state.selectedDeviceIds.add(d.id));
        else state.selectedDeviceIds.clear();
        renderDeviceTable();
        updateBulkActionToolbar();
      };
    }

    document.querySelectorAll('.action-inspect-device').forEach(btn => {
      btn.onclick = () => openDeviceModal(btn.dataset.id);
    });

    document.querySelectorAll('.action-edit-device').forEach(btn => {
      btn.onclick = () => openEditDeviceModal(btn.dataset.id);
    });
  }

  function updateBulkActionToolbar() {
    const toolbar = document.getElementById('bulkActionsBar');
    const countBadge = document.getElementById('bulkSelectedCount');
    if (!toolbar) return;

    if (state.selectedDeviceIds.size > 0) {
      toolbar.style.display = 'flex';
      if (countBadge) countBadge.textContent = `${state.selectedDeviceIds.size} thiết bị được chọn`;
    } else {
      toolbar.style.display = 'none';
    }
  }

  // =========================================================================
  // 10. Device Detail Modal & Remote MDM Actions
  // =========================================================================
  function openDeviceModal(deviceId) {
    const device = state.devices.find(d => d.id === deviceId);
    if (!device) return;

    const modal = document.getElementById('deviceDetailModal');
    if (!modal) return;

    setText('deviceModalTitle', `${device.name} (${device.id})`);
    setText('deviceModalSubtitle', `Người sở hữu: ${device.user} · ${device.department}`);

    setText('detailDevName', device.name);
    setText('detailDevId', device.id);
    setText('detailDevUser', `${device.user} (${device.email})`);
    setText('detailDevDept', device.department);
    setText('detailDevOs', device.os);
    setText('detailDevSerial', device.serial);
    setText('detailDevMac', device.mac);
    setText('detailDevIp', device.ip);
    setText('detailDevCpu', device.cpu);
    setText('detailDevRam', device.ram);
    setText('detailDevStorage', `${device.storage} (${device.storagePercent}%)`);
    setText('detailDevBattery', `${device.battery}% (${device.battery > 50 ? 'Tốt' : 'Trung bình'})`);
    setText('detailDevEnrollDate', device.enrolledDate);
    setText('detailDevLocation', device.location);

    const statusContainer = document.getElementById('detailDevStatus');
    if (statusContainer) statusContainer.innerHTML = getStatusBadge(device.status);

    const appList = document.getElementById('detailDevApps');
    if (appList) {
      appList.innerHTML = (device.apps || []).map(app => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px 14px; border-bottom: 1px solid var(--border-light);">
          <div>
            <b style="font-size:13px;">${escapeHtml(app.name)}</b>
            <div style="font-size:11px; color:var(--text-muted);">Phiên bản: ${escapeHtml(app.version)}</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="status-pill status-online">${escapeHtml(app.status)}</span>
            <button class="btn btn-secondary btn-sm" onclick="TTH.triggerAppUpdate('${escapeHtml(app.name)}')">Kiểm tra cập nhật</button>
          </div>
        </div>
      `).join('') || '<div style="padding:20px; color:var(--text-muted);">Không có ứng dụng nào được cài đặt.</div>';
    }

    const compList = document.getElementById('detailDevCompliance');
    if (compList) {
      const c = device.compliance || {};
      const items = [
        { label: 'Mã hóa ổ đĩa (BitLocker / FileVault)', pass: c.fileVault },
        { label: 'Mật khẩu khóa màn hình phức tạp', pass: c.passcode },
        { label: 'Tường lửa hệ điều hành (Firewall)', pass: c.firewall },
        { label: 'Phần mềm diệt virus & EDR thời gian thực', pass: c.antivirus },
        { label: 'Không bị can thiệp hệ điều hành (Root/Jailbreak)', pass: !c.jailbreak },
        { label: 'Phiên bản hệ điều hành đáp ứng yêu cầu', pass: c.osUpToDate }
      ];

      compList.innerHTML = items.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px 14px; border-bottom: 1px solid var(--border-light);">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:16px;">${item.pass ? '✅' : '❌'}</span>
            <span style="font-size:13px; font-weight:600; color:${item.pass ? 'var(--text-main)' : 'var(--danger)'};">${item.label}</span>
          </div>
          <span class="status-pill ${item.pass ? 'status-online' : 'status-locked'}">
            ${item.pass ? 'Đạt chuẩn' : 'Không đạt'}
          </span>
        </div>
      `).join('');
    }

    const logList = document.getElementById('detailDevLogs');
    if (logList) {
      logList.innerHTML = (device.logs || []).map(log => `
        <div style="display:flex; gap:14px; padding: 12px 14px; border-bottom: 1px solid var(--border-light);">
          <div style="font-size:16px;">🕒</div>
          <div style="flex:1">
            <b style="font-size:12px; color:var(--text-muted);">${escapeHtml(log.time)}</b>
            <p style="font-size:13px; color:var(--text-main); margin-top:2px;">${escapeHtml(log.event)}</p>
          </div>
        </div>
      `).join('');
    }

    attachRemoteActionHandlers(device);
    switchModalTab('info');
    modal.classList.add('open');
    playBeep('click');
  }

  function switchModalTab(tabId) {
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.modal-tab-content').forEach(content => {
      content.style.display = content.id === `tabContent-${tabId}` ? 'block' : 'none';
    });
  }

  function attachRemoteActionHandlers(device) {
    const btnLock = document.getElementById('actionRemoteLock');
    if (btnLock) {
      btnLock.onclick = () => {
        if (confirm(`Khóa màn hình từ xa thiết bị ${device.name} (${device.id})?`)) {
          device.status = 'locked';
          device.logs.unshift({ time: 'Vừa xong', event: 'Lệnh Khóa màn hình từ xa được gửi từ Admin Console' });
          saveAll();
          renderDeviceTable();
          renderOverviewDashboard();
          if (state.role === 'user') renderUserDevices();
          openDeviceModal(device.id);
          addAudit(`Đã thực hiện Khóa màn hình từ xa thiết bị ${device.name} (${device.id})`, 'warning');
          toast(`Đã gửi lệnh KHÓA THIẾT BỊ ${device.id} thành công!`, 'warning');
        }
      };
    }

    const btnMsg = document.getElementById('actionBroadcastMsg');
    if (btnMsg) {
      btnMsg.onclick = () => {
        const msg = prompt(`Nội dung thông báo khẩn tới ${device.name}:`, 'Vui lòng liên hệ phòng IT TTH Technology để rà soát bảo mật định kỳ.');
        if (msg) {
          device.logs.unshift({ time: 'Vừa xong', event: `Gửi tin nhắn khẩn cấp: "${msg}"` });
          saveAll();
          openDeviceModal(device.id);
          addAudit(`Đã gửi thông điệp khẩn tới ${device.name}: "${msg}"`, 'info');
          toast(`Đã gửi thông điệp khẩn cấp tới màn hình thiết bị ${device.id}!`, 'success');
        }
      };
    }

    const btnReboot = document.getElementById('actionRemoteReboot');
    if (btnReboot) {
      btnReboot.onclick = () => {
        if (confirm(`Khởi động lại thiết bị ${device.name} ngay bây giờ?`)) {
          device.logs.unshift({ time: 'Vừa xong', event: 'Khởi động lại thiết bị từ xa qua MDM' });
          device.status = 'offline';
          saveAll();
          renderDeviceTable();
          if (state.role === 'user') renderUserDevices();
          addAudit(`Khởi động lại từ xa thiết bị ${device.name}`, 'info');
          toast(`Đã gửi lệnh Khởi động lại tới ${device.name}. Thiết bị đang reboot...`, 'info');
          setTimeout(() => {
            device.status = 'online';
            saveAll();
            renderDeviceTable();
            renderOverviewDashboard();
            if (state.role === 'user') renderUserDevices();
            toast(`Thiết bị ${device.name} đã trực tuyến trở lại!`, 'success');
          }, 3500);
        }
      };
    }

    const btnPin = document.getElementById('actionResetPin');
    if (btnPin) {
      btnPin.onclick = () => {
        const newPin = Math.floor(100000 + Math.random() * 900000);
        device.logs.unshift({ time: 'Vừa xong', event: `Đặt lại mã PIN mở khóa mới: ${newPin}` });
        saveAll();
        openDeviceModal(device.id);
        addAudit(`Đã cấp phát mã PIN mở khóa mới cho ${device.name}`, 'warning');
        alert(`MÃ MỞ KHÓA TẠM THỜI ĐÃ ĐƯỢC CẤP:\n\nPIN: ${newPin}\n\nMã PIN có hiệu lực trong 60 phút.`);
        toast(`Đã đặt lại mã PIN tạm thời cho thiết bị ${device.id}!`, 'success');
      };
    }

    const btnPing = document.getElementById('actionPingGps');
    if (btnPing) {
      btnPing.onclick = () => {
        toast(`Đang ping tọa độ GPS thiết bị ${device.id}...`, 'info');
        setTimeout(() => {
          device.lastSync = 'Vừa xong';
          saveAll();
          setText('detailDevLocation', `Tọa độ: ${device.lat.toFixed(4)}, ${device.lng.toFixed(4)} · Bán kính chính xác ±5m`);
          addAudit(`Đã ping vị trí GPS thiết bị ${device.name}`, 'info');
          toast(`Đã nhận tín hiệu vị trí GPS từ thiết bị ${device.name}!`, 'success');
        }, 1200);
      };
    }

    const btnWipe = document.getElementById('actionRemoteWipe');
    if (btnWipe) {
      btnWipe.onclick = () => {
        const confirmCode = prompt(`⚠️ CẢNH BÁO NGUY HIỂM CAO:\nHành động này sẽ XÓA SẠCH toàn bộ dữ liệu công ty và đưa thiết bị về trạng thái xuất xưởng.\n\nNhập mã: "${device.id}" để xác nhận:`);
        if (confirmCode === device.id) {
          device.status = 'offline';
          device.compliance.fileVault = false;
          device.apps = [];
          device.logs.unshift({ time: 'Vừa xong', event: 'THỰC HIỆN LỆNH REMOTE WIPE: Đã xóa toàn bộ dữ liệu an toàn' });
          saveAll();
          renderDeviceTable();
          renderOverviewDashboard();
          if (state.role === 'user') renderUserDevices();
          openDeviceModal(device.id);
          addAudit(`Đã kích hoạt LỆNH XÓA SẠCH DỮ LIỆU (REMOTE WIPE) thiết bị ${device.name} (${device.id})`, 'danger');
          toast(`Đã gửi lệnh REMOTE WIPE tới thiết bị ${device.id}!`, 'danger');
        } else if (confirmCode !== null) {
          toast('Mã xác nhận không đúng! Hủy lệnh an toàn.', 'warning');
        }
      };
    }
  }

  function openEditDeviceModal(deviceId) {
    const device = state.devices.find(d => d.id === deviceId);
    if (!device) return;

    state.editingDeviceId = deviceId;
    const modal = document.getElementById('editDeviceModal');
    if (!modal) return;

    document.getElementById('editDevName').value = device.name;
    document.getElementById('editDevUser').value = device.user;
    document.getElementById('editDevEmail').value = device.email;
    document.getElementById('editDevDept').value = device.department;
    document.getElementById('editDevStatus').value = device.status;

    modal.classList.add('open');
  }

  // =========================================================================
  // 11. Security Policies & Zero-Trust Suite
  // =========================================================================
  function renderPolicies() {
    const container = document.getElementById('policyListContainer');
    if (!container) return;

    const activeCount = state.policies.filter(p => p.enabled).length;
    const totalCount = state.policies.length;
    const score = Math.round((activeCount / totalCount) * 100);

    setText('securityScoreDisplay', `${score}/100`);
    setText('securityActivePoliciesText', `${activeCount} / ${totalCount} chính sách đang kích hoạt`);
    setWidth('securityScoreProgress', `${score}%`);

    container.innerHTML = state.policies.map(p => `
      <div class="policy-item" data-id="${p.id}">
        <div class="policy-details">
          <div class="policy-title-row">
            <b>${escapeHtml(p.title)}</b>
            <span class="policy-tag ${p.severity}">${p.severity === 'critical' ? 'Bắt buộc' : 'Khuyến nghị'}</span>
            <span class="policy-tag standard">${escapeHtml(p.category)}</span>
          </div>
          <p style="font-size:12px; margin: 4px 0 0; color:var(--text-muted);">${escapeHtml(p.description)}</p>
        </div>
        <label class="switch" title="Bật/Tắt chính sách">
          <input type="checkbox" class="policy-toggle-input" data-id="${p.id}" ${p.enabled ? 'checked' : ''}>
          <span class="switch-slider"></span>
        </label>
      </div>
    `).join('');

    container.querySelectorAll('.policy-toggle-input').forEach(input => {
      input.onchange = e => {
        const pol = state.policies.find(p => p.id === e.target.dataset.id);
        if (pol) {
          pol.enabled = e.target.checked;
          saveAll();
          renderPolicies();
          renderOverviewDashboard();
          addAudit(`Đã ${pol.enabled ? 'BẬT' : 'TẮT'} chính sách: "${pol.title}"`, pol.enabled ? 'info' : 'warning');
          toast(`Đã cập nhật chính sách "${pol.title}"!`, 'success');
        }
      };
    });
  }

  // =========================================================================
  // 12. Reports & Analytics View
  // =========================================================================
  function renderReportsView() {
    const total = state.devices.length;
    const win = state.devices.filter(d => d.osType === 'Windows').length;
    const mac = state.devices.filter(d => d.osType === 'macOS').length;
    const ios = state.devices.filter(d => d.osType === 'iOS').length;
    const android = state.devices.filter(d => d.osType === 'Android').length;

    setText('repTotalFleet', total);
    setText('repWindowsPct', `${total ? Math.round((win / total) * 100) : 0}% (${win} máy)`);
    setText('repMacPct', `${total ? Math.round((mac / total) * 100) : 0}% (${mac} máy)`);
    setText('repIosPct', `${total ? Math.round((ios / total) * 100) : 0}% (${ios} máy)`);
    setText('repAndroidPct', `${total ? Math.round((android / total) * 100) : 0}% (${android} máy)`);
  }

  function exportCsv(type) {
    let rows = [];
    let filename = `tth-${type}-${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === 'devices') {
      rows.push(['Tên thiết bị', 'Mã tài sản', 'Người dùng', 'Email', 'Phòng ban', 'Hệ điều hành', 'Trạng thái', 'Địa chỉ IP', 'Địa chỉ MAC', 'Dung lượng PIN', 'Đồng bộ gần nhất']);
      state.devices.forEach(d => {
        rows.push([d.name, d.id, d.user, d.email, d.department, d.os, d.status, d.ip, d.mac, `${d.battery}%`, d.lastSync]);
      });
    } else if (type === 'security') {
      rows.push(['Mã chính sách', 'Tên chính sách', 'Nhóm', 'Mức độ', 'Trạng thái kích hoạt', 'Mô tả']);
      state.policies.forEach(p => {
        rows.push([p.id, p.title, p.category, p.severity, p.enabled ? 'Đang bật' : 'Tắt', p.description]);
      });
    } else if (type === 'audit') {
      rows.push(['Người thực hiện', 'Hành động', 'Địa chỉ IP', 'Thời gian', 'Mức độ']);
      state.auditLogs.forEach(a => {
        rows.push([a.actor, a.action, a.ip, a.time, a.severity]);
      });
    }

    const csvContent = '\uFEFF' + rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addAudit(`Xuất tệp báo cáo CSV: ${filename}`, 'info');
    toast(`Đã tải xuống file báo cáo ${filename}!`, 'success');
  }

  // =========================================================================
  // 13. Billing & VietQR Payment Engine
  // =========================================================================
  function renderBillingView() {
    const invoicesContainer = document.getElementById('billingInvoicesRows');
    if (!invoicesContainer) return;

    invoicesContainer.innerHTML = state.invoices.map(inv => `
      <tr>
        <td><b>${escapeHtml(inv.id)}</b></td>
        <td>${escapeHtml(inv.date)}</td>
        <td>${escapeHtml(inv.plan)}</td>
        <td><b>${escapeHtml(inv.amount)}</b></td>
        <td>${escapeHtml(inv.method)}</td>
        <td><span class="status-pill status-online">${escapeHtml(inv.status)}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="TTH.viewReceipt('${escapeHtml(inv.id)}')">
            📄 Xem hóa đơn VAT
          </button>
        </td>
      </tr>
    `).join('');
  }

  function openPaymentModal(planName, priceVnd) {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;

    setText('payPlanName', planName);
    setText('payPlanPrice', priceVnd);
    setText('payMemoCode', `TTH-MDM-${Math.floor(100000 + Math.random() * 900000)}`);

    modal.classList.add('open');
  }

  // =========================================================================
  // 14. Support Desk & Interactive Ticket Chat Threads
  // =========================================================================
  function renderSupportDesk() {
    const list = document.getElementById('supportTicketsList');
    if (!list) return;

    list.innerHTML = state.tickets.map(t => `
      <div class="ticket-item ${state.activeTicketId === t.id ? 'active' : ''}" onclick="TTH.selectTicket('${t.id}')">
        <div class="ticket-info">
          <b>${escapeHtml(t.title)}</b>
          <p style="color:var(--text-muted); font-size:12px;">Gửi bởi: ${escapeHtml(t.author)} · ${escapeHtml(t.date)}</p>
        </div>
        <div class="ticket-meta">
          <span class="status-pill ${t.status === 'Đã giải quyết' ? 'status-online' : (t.status === 'Đang xử lý' ? 'status-warning' : 'status-locked')}">
            ${escapeHtml(t.status)}
          </span>
          <span style="font-size:11px; font-weight:700; color:${t.priority === 'Khẩn cấp' ? 'var(--danger)' : 'var(--text-muted)'};">
            Mức: ${escapeHtml(t.priority)}
          </span>
        </div>
      </div>
    `).join('');

    if (state.activeTicketId) {
      renderTicketThread(state.activeTicketId);
    } else if (state.tickets.length > 0) {
      renderTicketThread(state.tickets[0].id);
    }
  }

  function renderTicketThread(ticketId) {
    state.activeTicketId = ticketId;
    const ticket = state.tickets.find(t => t.id === ticketId);
    const box = document.getElementById('ticketThreadBox');
    if (!ticket || !box) return;

    setText('threadTicketTitle', ticket.title);
    setText('threadTicketAuthor', `${ticket.author} · ${ticket.date}`);

    const msgList = document.getElementById('threadMessageList');
    if (msgList) {
      msgList.innerHTML = ticket.messages.map(m => `
        <div style="margin-bottom: 14px; background: var(--bg-card-subtle); padding: 12px 16px; border-radius: var(--radius-md); border-left: 3px solid ${m.sender.includes('Admin') ? 'var(--primary)' : 'var(--text-muted)'};">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; font-weight:700;">
            <span style="color:${m.sender.includes('Admin') ? 'var(--primary)' : 'var(--text-main)'};">${escapeHtml(m.sender)}</span>
            <span style="color:var(--text-muted);">${escapeHtml(m.time)}</span>
          </div>
          <div style="font-size:13px; line-height:1.5;">${escapeHtml(m.text)}</div>
        </div>
      `).join('');
      msgList.scrollTop = msgList.scrollHeight;
    }
  }

  // =========================================================================
  // 15. Admin Console: Workspaces & Audit Logs
  // =========================================================================
  function renderAdminConsole() {
    const wsContainer = document.getElementById('adminWorkspaceRows');
    if (wsContainer) {
      wsContainer.innerHTML = state.workspaces.map(ws => `
        <tr>
          <td>
            <b>${escapeHtml(ws.name)}</b>
            <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(ws.address)}</div>
          </td>
          <td><b>${ws.deviceCount}</b> thiết bị</td>
          <td>${escapeHtml(ws.plan)}</td>
          <td>
            ${ws.isCurrent 
              ? '<span class="status-pill status-online">Đang hoạt động</span>' 
              : '<span class="status-pill status-offline">Chi nhánh</span>'}
          </td>
          <td>
            ${!ws.isCurrent ? `
              <button class="btn btn-secondary btn-sm" onclick="TTH.switchWorkspace('${ws.id}')">
                Chuyển sang workspace này
              </button>
            ` : '<span style="font-size:11px; color:var(--text-muted);">Workspace hiện tại</span>'}
          </td>
        </tr>
      `).join('');
    }

    renderAuditLogs();
  }

  function renderAuditLogs() {
    const container = document.getElementById('auditLogTableRows');
    if (!container) return;

    container.innerHTML = state.auditLogs.slice(0, 15).map(log => `
      <tr>
        <td><b>${escapeHtml(log.actor)}</b></td>
        <td>${escapeHtml(log.action)}</td>
        <td><code>${escapeHtml(log.ip)}</code></td>
        <td><small style="color:var(--text-muted); font-size:11px;">${escapeHtml(log.time)}</small></td>
        <td><span class="audit-badge audit-${log.severity}">${log.severity}</span></td>
      </tr>
    `).join('');
  }

  // =========================================================================
  // 16. Dedicated Admin Views: User & RBAC Management + Server Telemetry
  // =========================================================================
  function renderAdminUsers() {
    const container = document.getElementById('adminUsersTableRows');
    if (!container) return;

    container.innerHTML = state.adminUsers.map(user => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="user-avatar" style="width:34px; height:34px; font-size:12px;">${escapeHtml(user.name.split(' ').map(n=>n[0]).slice(-2).join(''))}</div>
            <div>
              <b style="font-size:13px;">${escapeHtml(user.name)}</b>
              <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(user.email)}</div>
            </div>
          </div>
        </td>
        <td>${escapeHtml(user.department)}</td>
        <td>
          <span class="status-pill ${user.role.includes('Super') ? 'status-locked' : (user.role.includes('Admin') || user.role.includes('Manager') ? 'status-warning' : 'status-online')}">
            ${escapeHtml(user.role)}
          </span>
        </td>
        <td><b>${user.devicesCount}</b> máy gán</td>
        <td>
          <span class="status-pill ${user.mfa ? 'status-online' : 'status-warning'}">
            ${user.mfa ? 'Bắt buộc MFA: Bật' : 'Chưa bật 2FA'}
          </span>
        </td>
        <td>
          <span class="status-pill status-online">${escapeHtml(user.status)}</span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary btn-sm" onclick="TTH.toggleUserRole('${user.id}')" title="Đổi vai trò">Phân quyền</button>
            <button class="btn btn-secondary btn-sm" onclick="alert('Đã gửi liên kết đặt lại mật khẩu tới email: ${user.email}')" title="Reset mật khẩu">🔑</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function renderAdminTelemetry() {
    setText('telemCpu', '24.2%');
    setText('telemRam', '6.4 GB / 16 GB (40%)');
    setText('telemLatency', '2.1 ms');
    setText('telemCertDays', '364 ngày');
  }

  // =========================================================================
  // 17. User Portal Views: My Devices, App Catalog, Hardware Requests
  // =========================================================================
  function renderUserDevices() {
    const container = document.getElementById('myDevicesContainer');
    if (!container) return;

    // Filter devices assigned to logged in user "Nguyễn Minh Anh"
    const myDevs = state.devices.filter(d => d.user.includes('Minh Anh'));

    if (myDevs.length === 0) {
      container.innerHTML = '<div style="padding:30px; text-align:center; color:var(--text-muted);">Bạn chưa có thiết bị nào được gán. Vui lòng liên hệ phòng IT.</div>';
      return;
    }

    container.innerHTML = myDevs.map(d => `
      <div class="my-device-card">
        <div class="my-device-header">
          <div class="my-device-icon">${getOsIcon(d.osType)}</div>
          <div style="flex:1">
            <h3 style="font-size:16px; font-weight:800; margin-bottom:2px;">${escapeHtml(d.name)}</h3>
            <span style="font-size:12px; font-family:monospace; color:var(--text-muted);">${escapeHtml(d.id)} · ${escapeHtml(d.os)}</span>
          </div>
          <div>${getStatusBadge(d.status)}</div>
        </div>

        <div class="my-device-specs-grid">
          <div><small>Bộ vi xử lý & RAM:</small><strong>${escapeHtml(d.cpu)} (${escapeHtml(d.ram)})</strong></div>
          <div><small>Dung lượng ổ cứng:</small><strong>${escapeHtml(d.storage)}</strong></div>
          <div><small>Pin hiện tại:</small><strong style="color:${d.battery < 20 ? 'var(--danger)' : 'var(--success)'};">${d.battery}%</strong></div>
          <div><small>Địa chỉ IP mạng:</small><strong>${escapeHtml(d.ip)}</strong></div>
          <div><small>Số Serial:</small><code>${escapeHtml(d.serial)}</code></div>
          <div><small>Đồng bộ gần nhất:</small><strong>${escapeHtml(d.lastSync)}</strong></div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:var(--radius-md);">
          <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700;">
            <span>🛡️</span> Tuân thủ Zero-Trust: <span style="color:var(--success);">Đạt chuẩn an toàn</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="TTH.openDeviceModal('${escapeHtml(d.id)}')">Xem chi tiết</button>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="TTH.downloadWifiProfile('${escapeHtml(d.id)}')">
            📶 Tải cấu hình WiFi & VPN
          </button>
          <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="TTH.pingMyDevice('${escapeHtml(d.id)}')">
            📍 Định vị máy
          </button>
          <button class="btn btn-danger btn-sm" onclick="TTH.emergencyLockDevice('${escapeHtml(d.id)}')">
            🔒 Khóa khẩn cấp
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderAppCatalog() {
    const container = document.getElementById('appCatalogGrid');
    if (!container) return;

    container.innerHTML = state.catalogApps.map(app => `
      <div class="app-catalog-card">
        <div class="app-catalog-icon">${app.icon}</div>
        <div class="app-catalog-meta">
          <span class="app-catalog-tag">${escapeHtml(app.category)}</span>
          <h4 style="margin-top:6px;">${escapeHtml(app.name)}</h4>
          <p>${escapeHtml(app.desc)}</p>
          <small style="color:var(--text-muted); font-size:11px;">Phiên bản: ${escapeHtml(app.version)} · ${escapeHtml(app.size)}</small>
        </div>
        <div>
          ${app.installed ? `
            <button class="app-install-btn installed">
              ✓ Đã cài đặt
            </button>
          ` : `
            <button class="btn btn-primary app-install-btn" onclick="TTH.installCatalogApp('${app.id}')">
              ⬇ Cài đặt ngay
            </button>
          `}
        </div>
      </div>
    `).join('');
  }

  function renderHardwareRequests() {
    const container = document.getElementById('hardwareRequestsContainer');
    if (!container) return;

    container.innerHTML = state.hardwareRequests.map(req => {
      const steps = ['Đã gửi yêu cầu', 'Trưởng phòng duyệt', 'IT chuẩn bị', 'Đã bàn giao'];
      return `
        <div class="hardware-request-item">
          <div class="request-header">
            <div>
              <span class="status-pill status-warning" style="font-size:10px; margin-bottom:4px;">${escapeHtml(req.category)}</span>
              <h4 style="font-size:15px; font-weight:800; margin:2px 0;">${escapeHtml(req.item)}</h4>
              <p style="font-size:12px; color:var(--text-muted);">${escapeHtml(req.reason)}</p>
            </div>
            <div style="text-align:right;">
              <span class="status-pill ${req.currentStep === 4 ? 'status-online' : 'status-warning'}">${escapeHtml(req.status)}</span>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Ngày yêu cầu: ${escapeHtml(req.requestedDate)}</div>
            </div>
          </div>

          <!-- Timeline Stepper -->
          <div class="request-timeline">
            ${steps.map((st, idx) => {
              const stepNum = idx + 1;
              let cls = '';
              if (stepNum < req.currentStep) cls = 'completed';
              else if (stepNum === req.currentStep) cls = 'current';
              return `
                <div class="timeline-step ${cls}">
                  <div class="timeline-step-dot">${cls === 'completed' ? '✓' : stepNum}</div>
                  <span class="timeline-step-label">${st}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 18. Command Palette (Ctrl + K) Engine
  // =========================================================================
  function initCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandPaletteInput');
    const list = document.getElementById('commandPaletteList');
    if (!palette || !input || !list) return;

    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
      if (e.key === 'Escape' && palette.classList.contains('open')) {
        closePalette();
      }
    });

    document.getElementById('cmdSearchBtn')?.addEventListener('click', openPalette);
    palette.addEventListener('click', e => {
      if (e.target === palette) closePalette();
    });

    function openPalette() {
      palette.classList.add('open');
      input.value = '';
      input.focus();
      renderPaletteItems('');
    }

    function closePalette() {
      palette.classList.remove('open');
    }

    input.addEventListener('input', e => {
      renderPaletteItems(e.target.value.toLowerCase().trim());
    });

    function renderPaletteItems(query) {
      const items = [
        { label: '👑 Chuyển sang: Chế độ Quản Trị Viên (Admin Console)', action: () => setRole('admin'), group: 'Chế độ' },
        { label: '👤 Chuyển sang: Chế độ Nhân Viên (User Portal)', action: () => setRole('user'), group: 'Chế độ' },
        { label: '📱 Đi đến: Thiết bị của tôi (My Devices)', action: () => { setRole('user'); navigateTo('user-devices'); }, group: 'User Portal' },
        { label: '🛍️ Đi đến: Kho ứng dụng nội bộ (App Store)', action: () => { setRole('user'); navigateTo('user-apps'); }, group: 'User Portal' },
        { label: '📦 Đi đến: Yêu cầu cấp phát thiết bị', action: () => { setRole('user'); navigateTo('user-requests'); }, group: 'User Portal' },
        { label: '👥 Đi đến: Quản lý người dùng & RBAC', action: () => { setRole('admin'); navigateTo('admin-users'); }, group: 'Admin' },
        { label: '🖥️ Đi đến: Giám sát hạ tầng máy chủ & APNs', action: () => { setRole('admin'); navigateTo('admin-telemetry'); }, group: 'Admin' },
        { label: '📊 Đi đến: Tổng quan hệ thống', action: () => { setRole('admin'); navigateTo('overview'); }, group: 'Admin' },
        { label: '💻 Đi đến: Quản lý thiết bị doanh nghiệp', action: () => { setRole('admin'); navigateTo('devices'); }, group: 'Admin' },
        { label: '🛡️ Đi đến: Bảo mật & Chính sách Zero-Trust', action: () => { setRole('admin'); navigateTo('security'); }, group: 'Admin' },
        { label: '➕ Thêm thiết bị mới vào hệ thống', action: () => openAddDeviceModal(), group: 'Thao tác' },
        { label: '🌗 Chuyển đổi giao diện Sáng / Tối', action: () => applyTheme(state.theme === 'dark' ? 'light' : 'dark'), group: 'Cài đặt' }
      ];

      state.devices.forEach(d => {
        items.push({
          label: `💻 Thiết bị: ${d.name} (${d.id}) - ${d.user}`,
          action: () => { setRole('admin'); navigateTo('devices'); openDeviceModal(d.id); },
          group: 'Thiết bị'
        });
      });

      const filtered = items.filter(it => it.label.toLowerCase().includes(query));

      if (filtered.length === 0) {
        list.innerHTML = '<div style="padding:16px; color:var(--text-muted); font-size:12px;">Không tìm thấy kết quả nào phù hợp.</div>';
        return;
      }

      list.innerHTML = filtered.slice(0, 10).map((it, idx) => `
        <div class="command-palette-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
          <span>${escapeHtml(it.label)}</span>
          <small style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">${it.group}</small>
        </div>
      `).join('');

      list.querySelectorAll('.command-palette-item').forEach((el, idx) => {
        el.onclick = () => {
          filtered[idx].action();
          closePalette();
        };
      });
    }
  }

  // =========================================================================
  // 19. Modal Controls
  // =========================================================================
  function openAddDeviceModal() {
    const modal = document.getElementById('addDeviceModal');
    if (!modal) return;
    
    const count = state.devices.length + 1;
    const autoId = `TTH-DEV-${String(count).padStart(4, '0')}`;
    const idInput = document.getElementById('newDevId');
    if (idInput) idInput.value = autoId;

    modal.classList.add('open');
  }

  function openQrEnrollModal() {
    document.getElementById('qrEnrollModal')?.classList.add('open');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }

  // =========================================================================
  // 20. Initialization & Event Bindings
  // =========================================================================
  function init() {
    applyTheme(state.theme);
    const maintenanceBanner = document.getElementById('maintenanceBanner');
    if (maintenanceBanner) maintenanceBanner.classList.toggle('show', Boolean(state.settings.maintenanceMode));

    // Setup theme toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      toast(`Đã chuyển sang giao diện ${state.theme === 'dark' ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}`);
    });

    // Setup Role Switcher buttons
    document.getElementById('roleSwitchAdminBtn')?.addEventListener('click', () => setRole('admin'));
    document.getElementById('roleSwitchUserBtn')?.addEventListener('click', () => setRole('user'));

    // Navigation buttons
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.page));
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.goto));
    });

    // Mobile sidebar toggles
    document.getElementById('mobileMenuToggle')?.addEventListener('click', openMobileSidebar);
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);

    // Notification Drawer
    const notifBtn = document.getElementById('notificationBtn');
    const notifDrawer = document.getElementById('notificationDrawer');
    const closeNotifBtn = document.getElementById('closeNotifDrawer');

    notifBtn?.addEventListener('click', () => {
      notifDrawer?.classList.toggle('open');
      playBeep('click');
    });

    closeNotifBtn?.addEventListener('click', () => {
      notifDrawer?.classList.remove('open');
    });

    const notifList = document.getElementById('notificationList');
    if (notifList) {
      notifList.innerHTML = state.notifications.map(n => `
        <div class="notification-item ${n.unread ? 'unread' : ''}">
          <div style="font-size:18px;">${n.type === 'warning' ? '⚠️' : (n.type === 'success' ? '✅' : 'ℹ️')}</div>
          <div>
            <b style="font-size:12px; display:block; margin-bottom:2px;">${escapeHtml(n.title)}</b>
            <small style="font-size:10px; color:var(--text-muted);">${escapeHtml(n.time)}</small>
          </div>
        </div>
      `).join('');
    }

    // Modal close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeAllModals();
      });
    });

    // Modal Tabs
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchModalTab(btn.dataset.tab));
    });

    // Add Device Form
    document.getElementById('addDeviceForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('newDevName').value.trim();
      const user = document.getElementById('newDevUser').value.trim();
      const email = document.getElementById('newDevEmail').value.trim();
      const dept = document.getElementById('newDevDept').value;
      const os = document.getElementById('newDevOs').value;
      const id = document.getElementById('newDevId').value.trim();

      let osType = 'Windows';
      if (/macOS/i.test(os)) osType = 'macOS';
      else if (/iOS/i.test(os)) osType = 'iOS';
      else if (/Android/i.test(os)) osType = 'Android';

      const newDev = {
        id,
        name,
        user,
        email: email || `${user.toLowerCase().replace(/\s+/g, '')}@tth.vn`,
        department: dept,
        status: 'online',
        os,
        osType,
        ip: `192.168.1.${Math.floor(100 + Math.random() * 150)}`,
        mac: `A4:C2:${Math.floor(10 + Math.random() * 89)}:55:77:88`,
        serial: `SN-TTH-${Math.floor(100000 + Math.random() * 900000)}`,
        battery: 100,
        storage: '80 GB / 256 GB',
        storagePercent: 31,
        cpu: 'Multi-Core Processor',
        ram: '16 GB',
        lastSync: 'Vừa xong',
        enrolledDate: new Date().toLocaleDateString('vi-VN'),
        location: 'Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội',
        lat: 21.028511,
        lng: 105.783452,
        compliance: { fileVault: true, passcode: true, firewall: true, antivirus: true, jailbreak: false, osUpToDate: true },
        apps: [{ name: 'TTH Enterprise Agent', version: '3.0.1', status: 'Tuân thủ' }],
        logs: [{ time: 'Vừa xong', event: 'Thiết bị hoàn tất đăng ký vào hệ thống MDM' }]
      };

      state.devices.unshift(newDev);
      saveAll();
      closeAllModals();
      e.target.reset();
      renderDeviceTable();
      renderOverviewDashboard();
      if (state.role === 'user') renderUserDevices();
      addAudit(`Đăng ký thành công thiết bị mới: ${name} (${id}) cho nhân viên ${user}`, 'success');
      toast(`Đã thêm thiết bị ${name} vào hệ thống quản lý!`, 'success');
    });

    // Edit Device Form
    document.getElementById('editDeviceForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const dev = state.devices.find(d => d.id === state.editingDeviceId);
      if (dev) {
        dev.name = document.getElementById('editDevName').value.trim();
        dev.user = document.getElementById('editDevUser').value.trim();
        dev.email = document.getElementById('editDevEmail').value.trim();
        dev.department = document.getElementById('editDevDept').value;
        dev.status = document.getElementById('editDevStatus').value;
        dev.logs.unshift({ time: 'Vừa xong', event: 'Cập nhật thông tin thiết bị từ Quản trị viên' });
        saveAll();
        closeAllModals();
        renderDeviceTable();
        renderOverviewDashboard();
        if (state.role === 'user') renderUserDevices();
        addAudit(`Cập nhật thông tin thiết bị ${dev.name} (${dev.id})`, 'info');
        toast(`Đã lưu thay đổi cho thiết bị ${dev.name}!`, 'success');
      }
    });

    // Filter Inputs
    ['deviceSearchInput', 'deviceOsFilter', 'deviceStatusFilter', 'deviceDeptFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', renderDeviceTable);
        el.addEventListener('change', renderDeviceTable);
      }
    });

    // Chart Timeframe Buttons
    document.querySelectorAll('[data-timeframe]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-timeframe]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.chartTimeframe = parseInt(btn.dataset.timeframe, 10);
        renderActivityChart();
        playBeep('click');
      });
    });

    // Support Reply Box
    document.getElementById('sendTicketReplyBtn')?.addEventListener('click', () => {
      const input = document.getElementById('ticketReplyInput');
      if (!input || !input.value.trim() || !state.activeTicketId) return;

      const ticket = state.tickets.find(t => t.id === state.activeTicketId);
      if (ticket) {
        const text = input.value.trim();
        ticket.messages.push({
          sender: state.role === 'admin' ? 'Hỗ trợ TTH (Admin)' : 'Nguyễn Minh Anh (User)',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          text: text
        });
        ticket.status = 'Đang xử lý';
        saveAll();
        input.value = '';
        renderTicketThread(ticket.id);
        renderSupportDesk();
        toast('Đã gửi phản hồi hỗ trợ!', 'success');

        setTimeout(() => {
          ticket.messages.push({
            sender: state.role === 'admin' ? ticket.author.split('(')[0].trim() : 'Chuyên viên TTH (Admin)',
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            text: state.role === 'admin' ? 'Cảm ơn admin đã hỗ trợ, em đang kiểm tra lại trên máy ạ.' : 'Hệ thống IT đã tiếp nhận và đang hỗ trợ xử lý cho bạn ngay.'
          });
          saveAll();
          if (state.activeTicketId === ticket.id) renderTicketThread(ticket.id);
          toast(`Nhận tin nhắn phản hồi mới`, 'info');
        }, 2200);
      }
    });

    // Hardware Request Form
    document.getElementById('hardwareRequestForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const item = document.getElementById('hwItemSelect').value;
      const cat = document.getElementById('hwItemCategory').value;
      const reason = document.getElementById('hwItemReason').value.trim();

      const newReq = {
        id: `REQ-${new Date().getFullYear()}-${String(state.hardwareRequests.length + 1).padStart(3, '0')}`,
        item: item,
        category: cat,
        requestedDate: new Date().toLocaleDateString('vi-VN'),
        status: 'Chờ trưởng phòng duyệt',
        currentStep: 1,
        reason: reason
      };

      state.hardwareRequests.unshift(newReq);
      saveAll();
      closeAllModals();
      e.target.reset();
      renderHardwareRequests();
      addAudit(`Gửi yêu cầu cấp phát phần cứng mới: ${item}`, 'info');
      toast(`Đã gửi yêu cầu cấp phát ${item} thành công!`, 'success');
    });

    // Add Admin User Form
    document.getElementById('addAdminUserForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('newUserName').value.trim();
      const email = document.getElementById('newUserEmail').value.trim();
      const dept = document.getElementById('newUserDept').value;
      const role = document.getElementById('newUserRole').value;

      state.adminUsers.unshift({
        id: `USR-${String(state.adminUsers.length + 1).padStart(2, '0')}`,
        name: name,
        email: email,
        department: dept,
        role: role,
        devicesCount: 0,
        mfa: true,
        status: 'Hoạt động'
      });

      saveAll();
      closeAllModals();
      e.target.reset();
      renderAdminUsers();
      addAudit(`Thêm tài khoản người dùng mới: ${name} (${role})`, 'success');
      toast(`Đã thêm thành công người dùng ${name}!`, 'success');
    });

    // Bulk Actions
    document.getElementById('bulkLockBtn')?.addEventListener('click', () => {
      if (state.selectedDeviceIds.size === 0) return;
      if (confirm(`Khóa toàn bộ ${state.selectedDeviceIds.size} thiết bị đã chọn?`)) {
        state.devices.forEach(d => {
          if (state.selectedDeviceIds.has(d.id)) {
            d.status = 'locked';
            d.logs.unshift({ time: 'Vừa xong', event: 'Khóa hàng loạt từ Bảng điều khiển Quản trị' });
          }
        });
        saveAll();
        renderDeviceTable();
        renderOverviewDashboard();
        addAudit(`Khóa hàng loạt ${state.selectedDeviceIds.size} thiết bị`, 'warning');
        toast(`Đã khóa thành công ${state.selectedDeviceIds.size} thiết bị!`, 'warning');
      }
    });

    document.getElementById('bulkExportBtn')?.addEventListener('click', () => exportCsv('devices'));

    // Real-time Live Clock
    setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
      setText('liveHeaderClock', `${dateStr} · ${timeStr}`);
    }, 1000);

    initCommandPalette();

    // Initial role & navigation
    setRole(state.role);
  }

  // =========================================================================
  // 21. Global Namespace Exposure
  // =========================================================================
  window.TTH = {
    navigateTo,
    setRole,
    toggleRole: function () { setRole(state.role === 'admin' ? 'user' : 'admin'); },
    openAddDeviceModal,
    openQrEnrollModal,
    openDeviceModal,
    openPaymentModal,
    exportCsv,
    selectTicket: renderTicketThread,
    triggerAppUpdate: function (appName) {
      toast(`Đang đẩy gói cập nhật an ninh cho ${appName}...`, 'info');
      setTimeout(() => toast(`Cập nhật ${appName} hoàn tất!`, 'success'), 1400);
    },
    switchWorkspace: function (wsId) {
      state.workspaces.forEach(w => w.isCurrent = (w.id === wsId));
      state.currentWorkspace = state.workspaces.find(w => w.id === wsId);
      saveAll();
      renderAdminConsole();
      setText('currentWsBadgeName', state.currentWorkspace.name);
      addAudit(`Chuyển ngữ cảnh sang workspace: ${state.currentWorkspace.name}`, 'info');
      toast(`Đã chuyển sang workspace: ${state.currentWorkspace.name}!`, 'success');
    },
    viewReceipt: function (invId) {
      const inv = state.invoices.find(i => i.id === invId);
      if (!inv) return;
      alert(`HÓA ĐƠN ĐIỆN TỬ VAT TTH TECHNOLOGY\n\nMã hóa đơn: ${inv.id}\nNgày phát hành: ${inv.date}\nDịch vụ: ${inv.plan}\nTổng tiền thanh toán: ${inv.amount}\nHình thức: ${inv.method}\nTrạng thái: ${inv.status}\n\nĐơn vị cung cấp: Công ty Cổ phần Công nghệ TTH Việt Nam\nMST: 0109887766`);
    },
    resetFactoryData: function () {
      if (confirm('BẠN CÓ CHẮC MUỐN ĐẶT LẠI DỮ LIỆU GỐC?\nToàn bộ thiết bị, chính sách và lịch sử sẽ được phục hồi về trạng thái mẫu ban đầu.')) {
        Object.values(STORAGE_KEYS).forEach(key => {
          try { localStorage.removeItem(key); } catch (e) { console.warn('Không thể xóa dữ liệu:', key, e); }
        });
        location.reload();
      }
    },
    // User Portal Actions
    installCatalogApp: function (appId) {
      const app = state.catalogApps.find(a => a.id === appId);
      if (!app) return;
      toast(`Đang tải và cài đặt ${app.name}... (Gói an toàn MDM)`, 'info');
      setTimeout(() => {
        app.installed = true;
        saveAll();
        renderAppCatalog();
        addAudit(`Người dùng đã cài đặt ứng dụng: ${app.name}`, 'info');
        toast(`Cài đặt thành công ${app.name}! Ứng dụng đã sẵn sàng sử dụng.`, 'success');
      }, 1800);
    },
    downloadWifiProfile: function (devId) {
      alert(`ĐÃ TẢI XUỐNG HỒ SƠ KẾT NỐI (PROVISIONING PROFILE)\n\nMạng: TTH-Corporate-5G (WPA3 Enterprise)\nVPN: TTH WireGuard Gateway (10.20.0.1)\nChứng chỉ: tth-ca-cert-2026.mobileconfig\n\nThiết bị sẽ tự động xác thực khi vào văn phòng TTH.`);
      toast(`Đã tải hồ sơ WiFi & VPN cho thiết bị ${devId}!`, 'success');
    },
    pingMyDevice: function (devId) {
      toast(`Đang ping vị trí thiết bị ${devId}...`, 'info');
      setTimeout(() => {
        alert(`TỌA ĐỘ THỜI GIAN THỰC:\n\nThiết bị: ${devId}\nVị trí: Tòa nhà TTH Tech Hub, Cầu Giấy, Hà Nội\nTọa độ: 21.0285° N, 105.7835° E\nBán kính định vị: ±3 mét\nThời gian: Vừa xong`);
        toast(`Đã nhận tọa độ thiết bị ${devId}!`, 'success');
      }, 1000);
    },
    emergencyLockDevice: function (devId) {
      const dev = state.devices.find(d => d.id === devId);
      if (!dev) return;
      if (confirm(`⚠️ KHÓA KHẨN CẤP THIẾT BỊ ${dev.name}?\n\nThiết bị sẽ lập tức tắt màn hình và đòi mã PIN quản trị. Sử dụng khi bạn bị thất lạc hoặc rơi máy.`)) {
        dev.status = 'locked';
        dev.logs.unshift({ time: 'Vừa xong', event: 'Người dùng kích hoạt KHÓA KHẨN CẤP từ Cổng nhân viên' });
        saveAll();
        renderUserDevices();
        addAudit(`Người dùng kích hoạt KHÓA KHẨN CẤP thiết bị ${dev.name} (${devId})`, 'warning');
        toast(`ĐÃ KHÓA KHẨN CẤP THIẾT BỊ ${devId}!`, 'danger');
      }
    },
    toggleMaintenanceMode: function () {
      state.settings.maintenanceMode = !state.settings.maintenanceMode;
      saveAll();
      const banner = document.getElementById('maintenanceBanner');
      if (banner) {
        banner.classList.toggle('show', state.settings.maintenanceMode);
      }
      toast(`Đã ${state.settings.maintenanceMode ? 'BẬT' : 'TẮT'} Chế độ bảo trì hệ thống!`, state.settings.maintenanceMode ? 'warning' : 'success');
    },
    toggleUserRole: function (userId) {
      const u = state.adminUsers.find(x => x.id === userId);
      if (!u) return;
      const roles = ['Nhân viên (User)', 'IT Manager', 'Super Admin', 'Ban Giám Đốc (Auditor)'];
      const nextIdx = (roles.indexOf(u.role) + 1) % roles.length;
      u.role = roles[nextIdx];
      saveAll();
      renderAdminUsers();
      addAudit(`Thay đổi vai trò người dùng ${u.name} thành "${u.role}"`, 'info');
      toast(`Đã cập nhật vai trò của ${u.name} thành "${u.role}"!`, 'success');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
