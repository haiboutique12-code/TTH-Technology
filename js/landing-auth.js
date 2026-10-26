/**
 * TTH TECHNOLOGY — LANDING & AUTH PORTAL WITH DYNAMIC VIDEO INTRO CONTROLLER
 * High-performance Video Background, Cyber Grid Canvas & Auth State Management
 */

(function () {
  'use strict';

  const AUTH_STORAGE_KEY = 'tth_auth_session_v1';

  // Tech Video Playlist for Background & Intro
  const TECH_VIDEOS = [
    {
      id: 'matrix',
      name: 'Ma Trận Hạt Dữ Liệu (Cyber Matrix)',
      src: 'https://cdn.pixabay.com/video/2019/10/24/28236-368501609_large.mp4',
      badge: '4K Ultra-Tech'
    },
    {
      id: 'quantum',
      name: 'Mạng Lưới Lượng Tử (Quantum Plexus)',
      src: 'https://cdn.pixabay.com/video/2021/07/30/83228-581349035_large.mp4',
      badge: 'AI Telemetry'
    },
    {
      id: 'cloud',
      name: 'Hạ Tầng Cloud Toàn Cầu (Global Infrastructure)',
      src: 'https://cdn.pixabay.com/video/2023/10/15/185092-874643408_large.mp4',
      badge: 'APNs & Knox'
    }
  ];

  let currentVideoIdx = 0;
  let canvasAnimationId = null;

  // Video Subtitles & Script for Cinematic Intro
  const INTRO_SUBTITLES = [
    { start: 0, end: 7, text: 'Chào mừng bạn đến với TTH Technology — Nền tảng Quản trị Thiết bị Doanh nghiệp Tập trung (MDM).' },
    { start: 7, end: 15, text: 'Đồng bộ tức thì hơn 100,000+ điểm cuối qua Apple APNs, Android Knox và Windows Autopilot.' },
    { start: 15, end: 23, text: 'Kiến trúc Zero-Trust toàn diện: Mã hóa BitLocker/FileVault, cách ly mối đe dọa chỉ trong 0.5 giây.' },
    { start: 23, end: 32, text: 'Cổng thông tin tự phục vụ nhân viên: Tải ứng dụng doanh nghiệp 1-chạm và định vị thiết bị tức thì.' },
    { start: 32, end: 60, text: 'Sẵn sàng nâng tầm vận hành IT của tổ chức bạn. Hãy đăng nhập hoặc đăng ký để trải nghiệm ngay!' }
  ];

  // =========================================================================
  // 1. Interactive HTML5 Cyber Matrix Canvas Simulation
  // =========================================================================
  function initCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 65 : 28, 80);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#818cf8' : '#34d399'
      });
    }

    let mouse = { x: width / 2, y: height / 2, active: false };

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with glowing cyber lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.28 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse elastic reaction
        if (mouse.active) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.4 * (1 - mDist / 160)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      canvasAnimationId = requestAnimationFrame(render);
    }

    render();
  }

  // =========================================================================
  // 2. Video Background Controller
  // =========================================================================
  function initVideoBackground() {
    const video = document.getElementById('landingBgVideo');
    const playBtn = document.getElementById('videoTogglePlayBtn');
    const muteBtn = document.getElementById('videoToggleMuteBtn');
    const switchBtn = document.getElementById('videoSwitchStreamBtn');
    const currentNameBadge = document.getElementById('videoCurrentStreamName');

    if (!video) return;

    // Autoplay handling
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Autoplay prevented by browser policy, waiting for user click:', err);
      });
    }

    // Toggle Play / Pause
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.innerHTML = '<span>⏸</span><span>Tạm dừng</span>';
        } else {
          video.pause();
          playBtn.innerHTML = '<span>▶</span><span>Tiếp tục</span>';
        }
      });
    }

    // Toggle Mute / Sound
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<span>🔇</span><span>Âm thanh</span>' : '<span>🔊</span><span>Đang bật</span>';
      });
    }

    // Switch Video Stream Loop
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        currentVideoIdx = (currentVideoIdx + 1) % TECH_VIDEOS.length;
        const target = TECH_VIDEOS[currentVideoIdx];
        video.style.opacity = '0.2';
        setTimeout(() => {
          video.src = target.src;
          video.play();
          video.style.opacity = '1';
          if (currentNameBadge) currentNameBadge.textContent = target.name;
        }, 300);
      });
    }
  }

  // =========================================================================
  // 3. Cinematic 4K Intro Modal Experience
  // =========================================================================
  function initIntroModal() {
    const modal = document.getElementById('introVideoModal');
    const openBtns = document.querySelectorAll('[data-open-intro-video]');
    const closeBtns = document.querySelectorAll('[data-close-intro-modal]');
    const introVideo = document.getElementById('introMainVideo');
    const subtitleEl = document.getElementById('introSubtitleText');
    const timelineFill = document.getElementById('introTimelineFill');
    const timelineBar = document.getElementById('introTimelineBar');
    const playPauseBtn = document.getElementById('introModalPlayPause');
    const muteBtn = document.getElementById('introModalMuteBtn');

    if (!modal || !introVideo) return;

    function openModal() {
      modal.classList.add('open');
      introVideo.currentTime = 0;
      introVideo.play().catch(e => console.warn(e));
      if (playPauseBtn) playPauseBtn.textContent = '⏸ Tạm dừng';
    }

    function closeModal() {
      modal.classList.remove('open');
      introVideo.pause();
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    // Subtitles & Progress Sync
    introVideo.addEventListener('timeupdate', () => {
      const cur = introVideo.currentTime;
      const dur = introVideo.duration || 60;
      if (timelineFill) {
        timelineFill.style.width = `${(cur / dur) * 100}%`;
      }

      // Find matching subtitle
      const sub = INTRO_SUBTITLES.find(s => cur >= s.start && cur < s.end);
      if (subtitleEl && sub) {
        subtitleEl.textContent = sub.text;
      }
    });

    // Play / Pause in Modal
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (introVideo.paused) {
          introVideo.play();
          playPauseBtn.textContent = '⏸ Tạm dừng';
        } else {
          introVideo.pause();
          playPauseBtn.textContent = '▶ Tiếp tục';
        }
      });
    }

    // Mute / Sound in Modal
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        introVideo.muted = !introVideo.muted;
        muteBtn.textContent = introVideo.muted ? '🔇 Bật tiếng' : '🔊 Đang bật';
      });
    }

    // Timeline Seeking
    if (timelineBar) {
      timelineBar.addEventListener('click', e => {
        const rect = timelineBar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        introVideo.currentTime = ratio * (introVideo.duration || 60);
      });
    }

    // Chapters Dock
    document.querySelectorAll('[data-intro-time]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-intro-time]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const timeSec = parseFloat(btn.dataset.introTime) || 0;
        introVideo.currentTime = timeSec;
        introVideo.play();
      });
    });
  }

  // =========================================================================
  // 4. Authentication (Login & Register) Tabs & Logic
  // =========================================================================
  function initAuthTabs() {
    const tabLogin = document.getElementById('authTabLogin');
    const tabRegister = document.getElementById('authTabRegister');
    const slider = document.getElementById('authTabSlider');
    const panelLogin = document.getElementById('authPanelLogin');
    const panelRegister = document.getElementById('authPanelRegister');

    function switchTab(target) {
      if (target === 'register') {
        tabLogin?.classList.remove('active');
        tabRegister?.classList.add('active');
        slider?.classList.add('tab-register');
        panelLogin?.classList.remove('active');
        panelRegister?.classList.add('active');
      } else {
        tabRegister?.classList.remove('active');
        tabLogin?.classList.add('active');
        slider?.classList.remove('tab-register');
        panelRegister?.classList.remove('active');
        panelLogin?.classList.add('active');
      }
    }

    tabLogin?.addEventListener('click', () => switchTab('login'));
    tabRegister?.addEventListener('click', () => switchTab('register'));

    // Links to switch tabs
    document.querySelectorAll('[data-switch-tab]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        switchTab(btn.dataset.switchTab);
      });
    });

    // Password Visibility Toggle
    document.querySelectorAll('.auth-toggle-pwd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        if (!input) return;
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.textContent = isPwd ? '👁️‍🗨️' : '👁️';
      });
    });

    // Password Strength Meter
    const regPwdInput = document.getElementById('regPasswordInput');
    const strengthBar1 = document.getElementById('pwdBar1');
    const strengthBar2 = document.getElementById('pwdBar2');
    const strengthBar3 = document.getElementById('pwdBar3');
    const strengthBar4 = document.getElementById('pwdBar4');
    const strengthText = document.getElementById('pwdStrengthText');

    if (regPwdInput) {
      regPwdInput.addEventListener('input', () => {
        const val = regPwdInput.value;
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const bars = [strengthBar1, strengthBar2, strengthBar3, strengthBar4];
        bars.forEach((b, idx) => {
          if (!b) return;
          if (idx < score) {
            b.style.background = score <= 1 ? '#ef4444' : score === 2 ? '#f59e0b' : score === 3 ? '#38bdf8' : '#10b981';
          } else {
            b.style.background = 'rgba(255, 255, 255, 0.1)';
          }
        });

        if (strengthText) {
          const labels = ['Chưa nhập', 'Yếu', 'Trung bình', 'Khá tốt', 'An toàn tối đa'];
          strengthText.textContent = val ? labels[score] : 'Độ bảo mật';
          strengthText.style.color = score <= 1 ? '#ef4444' : score === 2 ? '#f59e0b' : score === 3 ? '#38bdf8' : '#10b981';
        }
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('loginEmailInput').value.trim();
        const role = email.toLowerCase().includes('admin') || email.toLowerCase().includes('security') ? 'admin' : 'user';
        const name = role === 'admin' ? 'Quản trị viên IT' : 'Nguyễn Minh Anh';

        completeLogin({
          name: name,
          email: email || 'security@tth.vn',
          role: role
        });
      });
    }

    // Register Form Submit
    const regForm = document.getElementById('registerForm');
    if (regForm) {
      regForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('regNameInput').value.trim();
        const email = document.getElementById('regEmailInput').value.trim();
        const company = document.getElementById('regCompanyInput').value.trim();
        const roleChoice = document.getElementById('regRoleSelect').value || 'admin';

        completeLogin({
          name: name || 'Tài khoản Doanh Nghiệp',
          email: email,
          company: company,
          role: roleChoice
        });
      });
    }

    // One-Click Demo Logins
    document.querySelectorAll('[data-quick-role]').forEach(card => {
      card.addEventListener('click', () => {
        const role = card.dataset.quickRole;
        if (role === 'admin') {
          completeLogin({
            name: 'Quản trị viên IT (Admin)',
            email: 'security@tth.vn',
            role: 'admin'
          });
        } else if (role === 'user') {
          completeLogin({
            name: 'Nguyễn Minh Anh (Nhân viên)',
            email: 'minhanh.nguyen@tth.vn',
            role: 'user'
          });
        } else {
          // Direct Access
          completeLogin({
            name: 'Quản Trị Viên Khách',
            email: 'admin.guest@tth.vn',
            role: 'admin'
          });
        }
      });
    });

    // Biometric Authentication Simulation
    const bioBtn = document.getElementById('biometricAuthBtn');
    const bioModal = document.getElementById('biometricScanModal');
    if (bioBtn && bioModal) {
      bioBtn.addEventListener('click', () => {
        bioModal.classList.add('open');
        setTimeout(() => {
          bioModal.classList.remove('open');
          completeLogin({
            name: 'Xác thực Sinh trắc học Face ID',
            email: 'security@tth.vn',
            role: 'admin'
          });
        }, 1800);
      });
    }
  }

  // =========================================================================
  // 5. Complete Login & Session Transition
  // =========================================================================
  function completeLogin(user) {
    const portal = document.getElementById('landingPortal');
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    // Update global app state role
    if (window.TTH && typeof window.TTH.setRole === 'function') {
      window.TTH.setRole(user.role);
    }

    // Smooth exit animation
    if (portal) {
      portal.classList.add('portal-hidden');
    }

    if (window.TTH && typeof window.TTH.toast === 'function') {
      window.TTH.toast(`Đăng nhập thành công! Chào mừng ${user.name} vào hệ thống TTH Technology.`, 'success');
    } else {
      alert(`Đăng nhập thành công!\nChào mừng ${user.name} vào hệ thống.`);
    }
  }

  // =========================================================================
  // 6. Sign Out & Return to Landing Portal
  // =========================================================================
  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    const portal = document.getElementById('landingPortal');
    if (portal) {
      portal.classList.remove('portal-hidden');
      portal.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const bgVideo = document.getElementById('landingBgVideo');
    if (bgVideo && bgVideo.paused) {
      bgVideo.play().catch(e => console.warn(e));
    }
    if (window.TTH && typeof window.TTH.toast === 'function') {
      window.TTH.toast('Đã đăng xuất an toàn khỏi hệ thống TTH Technology.', 'info');
    }
  }

  function showLandingPortal() {
    const portal = document.getElementById('landingPortal');
    if (portal) {
      portal.classList.remove('portal-hidden');
      portal.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // =========================================================================
  // 7. Initialization on Page Load
  // =========================================================================
  function init() {
    initCyberCanvas();
    initVideoBackground();
    initIntroModal();
    initAuthTabs();

    // Check existing session
    const existingSession = localStorage.getItem(AUTH_STORAGE_KEY);
    const portal = document.getElementById('landingPortal');

    if (existingSession) {
      // User has logged in previously, default to hide portal
      if (portal) portal.classList.add('portal-hidden');
      try {
        const parsed = JSON.parse(existingSession);
        if (window.TTH && typeof window.TTH.setRole === 'function') {
          window.TTH.setRole(parsed.role || 'admin');
        }
      } catch (e) {}
    } else {
      // First visit: show landing portal
      if (portal) portal.classList.remove('portal-hidden');
    }

    // Expose functions globally to window.TTH
    if (window.TTH) {
      window.TTH.signOut = signOut;
      window.TTH.showLandingPortal = showLandingPortal;
      window.TTH.openIntroVideo = function () {
        const modal = document.getElementById('introVideoModal');
        const introVideo = document.getElementById('introMainVideo');
        if (modal) modal.classList.add('open');
        if (introVideo) introVideo.play().catch(e => console.warn(e));
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
