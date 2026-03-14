// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card, .section-header');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Handle Waitlist Form
    const waitlistForm = document.getElementById('waitlistForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // Show loading state
            submitBtn.textContent = 'Joining...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                waitlistForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
            }, 1200);
        });
    }

    // Role Selection Modal Logic
    const roleSelectionModal = document.getElementById('roleSelectionModal');
    const closeRoleModalBtn = document.getElementById('closeRoleModalBtn');
    const navGetAccessBtn = document.getElementById('navGetAccessBtn');
    const heroStartEscrowBtn = document.getElementById('heroStartEscrowBtn');
    const roleCards = document.querySelectorAll('.role-card');
    const enterDashboardBtn = document.getElementById('enterDashboardBtn');

    let selectedRole = null;

    if (roleSelectionModal) {
        // Open Modal
        const openModal = () => roleSelectionModal.classList.add('active');
        if (navGetAccessBtn) navGetAccessBtn.addEventListener('click', openModal);
        if (heroStartEscrowBtn) heroStartEscrowBtn.addEventListener('click', openModal);

        // Close Modal
        const closeModal = () => roleSelectionModal.classList.remove('active');
        if (closeRoleModalBtn) closeRoleModalBtn.addEventListener('click', closeModal);
        roleSelectionModal.addEventListener('click', (e) => {
            if (e.target === roleSelectionModal) closeModal();
        });



        // Handle Role Selection
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all
                roleCards.forEach(c => {
                    c.classList.remove('selected');
                    c.style.borderColor = 'var(--border-glass)';
                    c.style.background = 'rgba(255,255,255,0.03)';
                });

                // Add to clicked
                card.classList.add('selected');
                card.style.borderColor = 'var(--accent-cyan)';
                card.style.background = 'rgba(0, 240, 255, 0.05)';
                selectedRole = card.getAttribute('data-role');

                // Enable button
                enterDashboardBtn.style.opacity = '1';
                enterDashboardBtn.style.pointerEvents = 'auto';
                enterDashboardBtn.innerText = `Continue as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`;
            });
        });

        // Redirect on Continue
        if (enterDashboardBtn) {
            enterDashboardBtn.addEventListener('click', () => {
                if (selectedRole) {
                    localStorage.setItem('trustledgerRole', selectedRole);
                    window.location.href = 'login.html';
                }
            });
        }
    }
});
