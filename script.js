document.addEventListener('DOMContentLoaded', function() {
    // Remove the 'loggedIn' status from localStorage on every page load.
    // This forces the user to re-enter the code if they refresh the page.
    localStorage.removeItem('loggedIn');

    // --- Login Page Elements ---
    const loginPage = document.getElementById('loginPage');
    const mainContent = document.getElementById('mainContent');
    const accessCodeInput = document.getElementById('accessCode');
    const loginButton = document.getElementById('loginButton');
    const loginMessage = document.getElementById('loginMessage');
    const loadingSpinner = document.getElementById('loadingSpinner'); // Get the loading spinner element

    // --- Main Content Elements (Existing) ---
    const darkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const tocButton = document.getElementById('toggle-toc');
    const leftSidebar = document.querySelector('.left-sidebar');
    const closeTocButton = document.getElementById('close-toc');
    const tableOfContents = document.getElementById('table-of-contents');
    const articleHeadings = document.querySelectorAll('.main-content h2, .main-content h3');
    const darkModeText = document.getElementById('dark-mode-text');

    // --- Access Code Configuration ---
    const CORRECT_ACCESS_CODES = [
        "pagarnusa2025",
        "unusia123",
        "admin456",
        "secretkey",
        "M06I0304M",
    ];

    // Function to initialize main page features after login
    function initializeMainPage() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeText.textContent = 'Light Mode';
        } else {
            darkModeText.textContent = 'Dark Mode';
        }

        darkModeButton.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        });

        tocButton.addEventListener('click', function() {
            leftSidebar.classList.add('active');
            body.classList.add('overlay-active');
        });

        closeTocButton.addEventListener('click', function() {
            leftSidebar.classList.remove('active');
            body.classList.remove('overlay-active');
        });

        let headingCount = 1;
        articleHeadings.forEach(function(heading) {
            const id = 'heading-' + headingCount++;
            heading.id = id;

            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.textContent = heading.textContent;
            anchor.href = '#' + heading.id;
            listItem.appendChild(anchor);

            if (heading.tagName === 'H3') {
                listItem.classList.add('sub-heading');
            }
            tableOfContents.appendChild(listItem);
        });

        tableOfContents.addEventListener('click', function(event) {
            if (event.target.tagName === 'A' && window.innerWidth <= 768) {
                leftSidebar.classList.remove('active');
                body.classList.remove('overlay-active');
            }
        });

        body.addEventListener('click', function(event) {
            if (body.classList.contains('overlay-active') && !leftSidebar.contains(event.target) && event.target !== tocButton) {
                leftSidebar.classList.remove('active');
                body.classList.remove('overlay-active');
            }
        });
    }

    // --- Login Logic ---
    function handleLogin() {
        const enteredCode = accessCodeInput.value.trim();

        // 1. Show the loading spinner
        loadingSpinner.classList.add('active');
        loginButton.disabled = true; // Disable button to prevent multiple clicks
        accessCodeInput.disabled = true; // Disable input during loading
        loginMessage.style.display = 'none'; // Hide any previous error messages

        // 2. Wait for 2 seconds (2000 milliseconds)
        setTimeout(() => {
            // 3. Hide the loading spinner
            loadingSpinner.classList.remove('active');
            loginButton.disabled = false; // Re-enable button
            accessCodeInput.disabled = false; // Re-enable input

            // 4. Perform the actual login check
            if (CORRECT_ACCESS_CODES.includes(enteredCode)) {
                loginPage.classList.add('hidden');
                mainContent.classList.remove('hidden');
                localStorage.setItem('loggedIn', 'true'); // Temporarily set login state
                initializeMainPage();
            } else {
                loginMessage.textContent = "Kode akses salah. Silakan coba lagi.";
                loginMessage.style.display = 'block';
                accessCodeInput.value = '';
                accessCodeInput.focus();
            }
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    // Event listener for login button click
    loginButton.addEventListener('click', handleLogin);

    // Event listener for Enter key in the access code input
    accessCodeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    });

    // Initial check (will always force login due to removeItem at start)
    if (localStorage.getItem('loggedIn') === 'true') {
        loginPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        initializeMainPage();
    } else {
        loginPage.classList.remove('hidden');
        mainContent.classList.add('hidden');
        accessCodeInput.focus();
    }
});
