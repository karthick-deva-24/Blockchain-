window.initParticles = function(pageType) {
    pageType = pageType || document.body.getAttribute('data-page') || 'home';

    // Base config options for different patterns
    let particleConfig = {};

    if (pageType === 'home') {
        // Pattern 1: Classic Constellation Network (Home)
        particleConfig = {
            "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": ["#14b8a6", "#ffffff", "#c99339", "#4a90e2"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true },
                "size": { "value": 5, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#4e6a80", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        };
    } 
    else if (pageType === 'about') {
        // Pattern 2: Geometric Triangles (About)
        particleConfig = {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#9b51e0", "#ffffff", "#f2994a", "#2d9cdb"] },
                "shape": { "type": "polygon", "polygon": { "nb_sides": 3 } }, // Triangles
                "opacity": { "value": 0.7, "random": false },
                "size": { "value": 8, "random": true },
                "line_linked": { "enable": true, "distance": 200, "color": "#9b51e0", "opacity": 0.2, "width": 2 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "out_mode": "bounce" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 150, "duration": 0.4 }, "push": { "particles_nb": 2 } }
            },
            "retina_detect": true
        };
    } 
    else if (pageType === 'services') {
        // Pattern 3: Data Flow / Matrix (Services)
        particleConfig = {
            "particles": {
                "number": { "value": 300, "density": { "enable": true, "value_area": 1200 } },
                "color": { "value": ["#27ae60", "#ffffff", "#f2c94c", "#1abc9c"] },
                "shape": { "type": "edge" }, // Squares/Edges
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": false }, // No lines, just flowing data points
                "move": { "enable": true, "speed": 3, "direction": "top", "random": false, "straight": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
                "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 1, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 } }
            },
            "retina_detect": true
        };
    } 
    else if (pageType === 'blog') {
        // Pattern 4: Abstract Stars (Blog)
        particleConfig = {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#eb5757", "#ffffff", "#f2994a", "#bb6bd9"] },
                "shape": { "type": "star", "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 6, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 120, "color": "#eb5757", "opacity": 0.3, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        };
    } 
    else if (pageType === 'contact') {
        // Pattern 5: Hexagon Snow (Contact)
        particleConfig = {
            "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#3498db", "#ffffff", "#8e44ad"] },
                "shape": { "type": "polygon", "polygon": { "nb_sides": 6 } }, // Hexagons
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 8, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false }, // No lines, just floating objects
                "move": { "enable": true, "speed": 2, "direction": "bottom", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 150, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        };
    } 
    else if (pageType === 'login' || pageType === 'signup') {
        // Pattern 6: Magic / Fairy Dust (Auth Pages)
        particleConfig = {
            "particles": {
                "number": { "value": 200, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#9b59b6", "#e74c3c", "#3498db", "#ffffff"] }, // Magic colors: Purple, Pink, Blue, White
                "shape": { "type": "star", "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.7, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false }, // No rigid lines for magic dust
                "move": { "enable": true, "speed": 1.5, "direction": "top", "random": true, "straight": false, "out_mode": "out" } // Drifting upwards
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "bubble": { "distance": 200, "size": 12, "duration": 2, "opacity": 1 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        };
    }
    else if (pageType === '404') {
        // Pattern 7: Sparks (404 Page)
        particleConfig = {
            "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff9d00", "#ff5e00", "#ffbb00"] }, // Spark colors
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 3, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 4, "direction": "top", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
                "modes": { "bubble": { "distance": 150, "size": 6, "duration": 2, "opacity": 1 }, "repulse": { "distance": 100, "duration": 0.4 } }
            },
            "retina_detect": true
        };
    }

    /* Destroy existing instances if any */
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach(dom => {
            if (dom && dom.pJS) {
                try { dom.pJS.fn.vendors.destroypJS(); } catch(e){}
            }
        });
        window.pJSDom = [];
    }

    /* Initialize Particles.js with the selected config */
    const pDiv = document.getElementById('particles-js');
    if (pDiv) {
        pDiv.innerHTML = '';
        particlesJS("particles-js", particleConfig);
    }

    /* Initialize Footer Particles (Spark Effect) */
    const fDiv = document.getElementById('particles-footer');
    if (fDiv) {
        fDiv.innerHTML = '';
        particlesJS("particles-footer", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff9d00", "#ff5e00", "#ffbb00"] }, // Spark colors
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 3, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 3, "direction": "top", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
                "modes": { "bubble": { "distance": 150, "size": 6, "duration": 2, "opacity": 1 }, "repulse": { "distance": 100, "duration": 0.4 } }
            },
            "retina_detect": true
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    window.initParticles();

    // Hamburger Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    }
});

