document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.textContent = isLight ? '🌙' : '☀️';
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Fungsi redirect ke waitlist.html
function redirectToWaitlist() {
    // Tambahkan efek animasi sebelum redirect
    const button = document.querySelector('.cta-button');
    button.classList.add('clicked');
    
    setTimeout(() => {
        window.location.href = "waitlist.html";
    }, 500); // Delay 0.5 detik untuk animasi
}

// Add this to your existing script.js
function checkWaitlistStatus() {
    if (localStorage.getItem('waitlistSubmitted')) {
        window.location.href = 'waitlist.html';
        return false;
    }
    return true;
}

// Update your existing redirect function
function redirectToWaitlist() {
    if (!checkWaitlistStatus()) return;
    window.location.href = "waitlist.html";
}