document.addEventListener('DOMContentLoaded', function() {
    
    // Auth Check
    const email = localStorage.getItem('currentUserEmail');
    const role = localStorage.getItem('currentUserRole');

    if (!email || !role) {
        // Not logged in
        window.location.href = "login.html";
        return;
    }

    // Display Profile Details
    const profileRole = document.getElementById('profile-role');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');

    if (profileRole) profileRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    if (profileEmail) profileEmail.textContent = email;
    if (profileAvatar) profileAvatar.textContent = email.charAt(0).toUpperCase();

    // Verify correct dashboard access
    const isDashboard = document.body.hasAttribute('data-dashboard');
    if (isDashboard) {
        const dashboardType = document.body.getAttribute('data-dashboard');
        if (dashboardType !== role) {
            // Wrong dashboard, redirect to correct one
            window.location.href = role === 'admin' ? 'admin_dashboard.html' : 'user_dashboard.html';
        }
    }

    // Tab Switching Logic
    const links = document.querySelectorAll('.sidebar-link');
    const panes = document.querySelectorAll('.tab-pane');

    links.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active from all links and panes
            links.forEach(l => l.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active to clicked link
            link.classList.add('active');

            // Add active to corresponding pane
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
            }

            // Close sidebar on mobile after clicking a link
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                const icon = document.querySelector('#dashboard-mobile-menu i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }

            // Initialize Node Network Map Visualization lazily when the Nodes tab is opened
            if (targetId === 'tab-nodes' && !window.nodesMapInitialized) {
                window.nodesMapInitialized = true;
                const mapDiv = document.getElementById('node-network-map');
                if (mapDiv && typeof particlesJS !== 'undefined') {
                    // Small delay to ensure display: block is fully rendered so canvas measures correctly
                    setTimeout(() => {
                        particlesJS("node-network-map", {
                            "particles": {
                                "number": { "value": 80, "density": { "enable": true, "value_area": 600 } },
                                "color": { "value": ["#14b8a6", "#4a90e2"] },
                                "shape": { "type": "circle" },
                                "opacity": { "value": 0.8, "random": false },
                                "size": { "value": 4, "random": true },
                                "line_linked": { "enable": true, "distance": 150, "color": "#14b8a6", "opacity": 0.4, "width": 1.5 },
                                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "out_mode": "bounce" }
                            },
                            "interactivity": {
                                "detect_on": "canvas",
                                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 4 } }
                            },
                            "retina_detect": true
                        });
                    }, 50);
                }
            }
        });
    });

    // Logout logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('currentUserRole');
            window.location.href = "login.html";
        });
    }
});
