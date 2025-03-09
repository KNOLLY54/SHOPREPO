document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.profile-sidebar ul li a');
    const sections = document.querySelectorAll('.profile-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('data-section');

            // Remove active class from all links and sections
            sidebarLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to the clicked link and corresponding section
            link.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Logout button functionality
    document.getElementById('logout').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Logging out...');
        // Add logout logic here
    });

    // Load initial section
    if (sidebarLinks.length > 0) {
        sidebarLinks[0].click();
    }
});