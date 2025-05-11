document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = L.map('map').setView([10.7905, 78.7047], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Define route coordinates (Tirunelveli to Ooty)
    const routeCoordinates = [
        [8.7139, 77.7567],  // Tirunelveli
        [9.9252, 78.1198],  // Madurai
        [10.0105, 77.4768], // Theni
        [11.4980, 76.4905], // Ooty
        [11.4169, 76.7122]  // Thotapata
    ];
    
    // Add route to the map
    L.polyline(routeCoordinates, {
        color: '#2196F3',
        weight: 5,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Add markers
    const startMarker = L.marker([8.7139, 77.7567]).addTo(map)
        .bindPopup('<b>Tirunelveli</b><br>Starting point of your journey');
    
    const gardenMarker = L.marker([11.4169, 76.7122]).addTo(map)
        .bindPopup('<b>Ooty Botanical Garden</b><br>55-acre garden with exotic plants');
    
    const thotapataMarker = L.marker([11.4980, 76.4905]).addTo(map)
        .bindPopup('<b>Thotapata</b><br>Scenic viewpoint');
    
    // Fit map to show all markers
    const featureGroup = L.featureGroup([startMarker, gardenMarker, thotapataMarker]);
    map.fitBounds(featureGroup.getBounds().pad(0.5));
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navigation
    const nav = document.querySelector('nav');
    const navOffsetTop = nav.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navOffsetTop) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
});