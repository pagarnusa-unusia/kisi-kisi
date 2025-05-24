document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const tocButton = document.getElementById('toggle-toc');
    const leftSidebar = document.querySelector('.left-sidebar');
    const closeTocButton = document.getElementById('close-toc');
    const tableOfContents = document.getElementById('table-of-contents');
    const articleHeadings = document.querySelectorAll('.main-content h2, .main-content h3');
    const darkModeText = document.getElementById('dark-mode-text');

    // Periksa preferensi mode malam yang tersimpan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeText.textContent = 'Light Mode';
    } else {
        darkModeText.textContent = 'Dark Mode';
    }

    // Fungsi untuk mengaktifkan/menonaktifkan mode malam
    darkModeButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });

    // Fungsi untuk menampilkan daftar isi (untuk tombol "Daftar Isi")
    tocButton.addEventListener('click', function() {
        leftSidebar.classList.add('active');
        body.classList.add('overlay-active');
    });

    // Fungsi untuk menyembunyikan daftar isi (untuk tombol "Tutup")
    closeTocButton.addEventListener('click', function() {
        leftSidebar.classList.remove('active');
        body.classList.remove('overlay-active');
    });

    // Membuat daftar isi secara dinamis
    let headingCount = 1;
    articleHeadings.forEach(function(heading) {
        const id = 'heading-' + headingCount++;
        heading.id = id;

        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.textContent = heading.textContent;
        anchor.href = '#' + heading.id;
        listItem.appendChild(anchor);

        // Menambahkan indentasi untuk sub-heading (H3)
        if (heading.tagName === 'H3') {
            listItem.classList.add('sub-heading');
        }
        tableOfContents.appendChild(listItem);
    });

    // Opsional: Tutup sidebar saat link di Daftar Isi diklik (di HP)
    tableOfContents.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && window.innerWidth <= 768) {
            leftSidebar.classList.remove('active');
            body.classList.remove('overlay-active');
        }
    });

    // Event listener untuk menutup sidebar jika area overlay diklik
    body.addEventListener('click', function(event) {
        // Cek jika ada overlay aktif, klik di luar sidebar, dan bukan pada tombol toggle Daftar Isi
        if (body.classList.contains('overlay-active') && !leftSidebar.contains(event.target) && event.target !== tocButton) {
            leftSidebar.classList.remove('active');
            body.classList.remove('overlay-active');
        }
    });
});
