document.addEventListener('DOMContentLoaded', function() {
    const darkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const tocButton = document.getElementById('toggle-toc');
    const leftSidebar = document.querySelector('.left-sidebar');
    const tableOfContents = document.getElementById('table-of-contents');
    const articleHeadings = document.querySelectorAll('.main-content h2, .main-content h3');
    const container = document.querySelector('.container');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const darkModeText = document.getElementById('dark-mode-text');

    // Periksa preferensi mode malam yang tersimpan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Fungsi untuk mengaktifkan/menonaktifkan mode malam
    darkModeButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Fungsi untuk menampilkan/menyembunyikan daftar isi
    tocButton.addEventListener('click', function() {
        leftSidebar.classList.toggle('active');
        container.classList.toggle('sidebar-active');
    });

    // Membuat daftar isi secara dinamis
    articleHeadings.forEach(function(heading) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.textContent = heading.textContent;
        anchor.href = '#' + heading.id;
        listItem.appendChild(anchor);
        tableOfContents.appendChild(listItem);

        if (heading.tagName === 'H3') {
            listItem.classList.add('sub-heading');
        }
    });

    let headingCount = 1;
    articleHeadings.forEach(function(heading) {
        heading.id = 'heading-' + headingCount++;
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("table-of-contents");
  document.querySelectorAll("main h2").forEach(heading => {
    const id = heading.textContent.toLowerCase().replace(/\s+/g, "-");
    heading.id = id;
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    const li = document.createElement("li");
    li.appendChild(link);
    toc.appendChild(li);
  });
});

