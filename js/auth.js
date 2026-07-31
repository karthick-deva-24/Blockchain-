document.addEventListener('DOMContentLoaded', function() {
    
    function showMessage(msg, isError = true) {
        let msgDiv = document.getElementById('auth-message');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'auth-message';
            msgDiv.style.position = 'fixed';
            msgDiv.style.bottom = '20px';
            msgDiv.style.right = '20px';
            msgDiv.style.padding = '1rem 2rem';
            msgDiv.style.borderRadius = '8px';
            msgDiv.style.color = '#fff';
            msgDiv.style.fontWeight = '600';
            msgDiv.style.zIndex = '9999';
            msgDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
            msgDiv.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(msgDiv);
        }
        msgDiv.style.backgroundColor = isError ? '#eb5757' : '#14b8a6';
        msgDiv.textContent = msg;
        msgDiv.style.opacity = '1';
        
        setTimeout(() => {
            msgDiv.style.opacity = '0';
        }, 3000);
    }

    // Check for Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const role = document.getElementById('role').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                showMessage("Passwords do not match!");
                return;
            }
            
            // In a real app, send to backend. Here we simulate success and redirect to login.
            showMessage("Account created successfully! Please login.", false);
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // Check for Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const role = document.getElementById('role').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showMessage("Please fill all fields.");
                return;
            }
            
            // Save state to localStorage
            localStorage.setItem('currentUserEmail', email);
            localStorage.setItem('currentUserRole', role);
            
            // Route based on role
            if (role === 'admin') {
                window.location.href = "admin_dashboard.html";
            } else {
                window.location.href = "user_dashboard.html";
            }
        });
    }
});
