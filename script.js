document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const mainContent = document.getElementById('mainContent');
    const accessCodeInput = document.getElementById('accessCode');
    const loginButton = document.getElementById('loginButton');
    const loginMessage = document.getElementById('loginMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // --- Login Logic (for index.html) ---
if (loginPage) {
    loginButton.addEventListener('click', () => {
        const enteredCode = accessCodeInput.value;
        // Definisikan array kode yang valid
        const correctCodes = ["12345", "PAGARNUSA2025", "UNUSIA_ADMIN"];

        loadingSpinner.classList.add('active');
        loginMessage.style.display = 'none';

        setTimeout(() => {
            loadingSpinner.classList.remove('active');
            // Periksa apakah kode yang dimasukkan ada dalam array kode yang benar
            if (correctCodes.includes(enteredCode)) {
                window.location.href = 'berita.html';
            } else {
                loginMessage.textContent = "Kode akses salah. Silakan coba lagi.";
                loginMessage.style.display = 'block';
            }
        }, 1500);
    });

    accessCodeInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            loginButton.click();
        }
    });
}

    // --- Main Content Logic (for berita.html) ---
    if (mainContent) {
        const toggleTocButton = document.getElementById('toggle-toc');
        const closeTocButton = document.getElementById('close-toc');
        const leftSidebar = document.querySelector('.left-sidebar');
        const tableOfContents = document.getElementById('table-of-contents');
        const mainContentElement = document.querySelector('.main-content');
        const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
        const darkModeText = document.getElementById('dark-mode-text');

        // Function to generate Table of Contents
        const generateTableOfContents = () => {
            tableOfContents.innerHTML = ''; // Clear existing
            const headings = mainContentElement.querySelectorAll('h2');
            headings.forEach(heading => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                const id = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                heading.id = id; // Assign ID to heading

                a.href = `#${id}`;
                a.textContent = heading.textContent;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                    // Close sidebar on mobile after clicking a link
                    if (window.innerWidth <= 768) {
                        leftSidebar.classList.remove('active');
                        document.body.classList.remove('overlay-active');
                    }
                });
                li.appendChild(a);
                tableOfContents.appendChild(li);
            });
        };

        generateTableOfContents(); // Generate on load

        // Toggle Table of Contents (sidebar)
        toggleTocButton.addEventListener('click', () => {
            leftSidebar.classList.toggle('active');
            document.body.classList.toggle('overlay-active');
        });

        closeTocButton.addEventListener('click', () => {
            leftSidebar.classList.remove('active');
            document.body.classList.remove('overlay-active');
        });

        // Close sidebar if overlay is clicked (on mobile)
        document.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('overlay-active') && window.innerWidth <= 768) {
                leftSidebar.classList.remove('active');
                document.body.classList.remove('overlay-active');
            }
        });


        // Dark Mode Toggle
        toggleDarkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeText.textContent = 'Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeText.textContent = 'Dark Mode';
            }
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeText.textContent = 'Light Mode';
        } else {
            darkModeText.textContent = 'Dark Mode';
        }

        // Handle sidebar behavior on resize (for desktop view)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { // Assuming 768px as the breakpoint for mobile/desktop
                leftSidebar.classList.remove('active'); // Ensure sidebar is not active on desktop view
                document.body.classList.remove('overlay-active');
            }
        });
    }
});
