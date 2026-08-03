// ============================================
// Premium Web Animations (GSAP, Lenis, Barba, etc.)
// ============================================

const isMobile = () => window.innerWidth <= 768;

let lenis;
function initLenis() {
    if (lenis || isMobile()) return; // Disable Lenis on mobile for better performance
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);
}

function initAOS() {
    // Dynamically assign AOS attributes to specific elements
    document.querySelectorAll('.card').forEach((card, i) => {
        if (!card.hasAttribute('data-aos')) {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (i % 3) * 100);
        }
    });

    document.querySelectorAll('.image-block').forEach(img => {
        if (!img.hasAttribute('data-aos')) {
            img.setAttribute('data-aos', 'zoom-in');
            img.setAttribute('data-aos-duration', '800');
        }
    });

    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
        setTimeout(() => AOS.refreshHard(), 100);
    }
}

function initHeroGSAP() {
    const hero = document.querySelector('.hero');
    if (hero && !hero.classList.contains('gsap-initialized')) {
        const tl = gsap.timeline();
        tl.from('.hero p', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.2 }, "+=0.8")
          .from('.hero .scroll-down, .hero .hero-actions a, .hero .btn-primary, .hero .btn-text', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, "-=0.4");
        hero.classList.add('gsap-initialized');
    }
}

function initAnimations() {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    initAOS();
    initHeroGSAP();


    // 1. SplitType + GSAP Text Reveals
    const titles = document.querySelectorAll('.section-title, h1, h2');
    titles.forEach(title => {
        if (!title.classList.contains('split-applied')) {
            const split = new SplitType(title, { types: 'chars, words' });
            gsap.from(split.chars, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.015,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                }
            });
            title.classList.add('split-applied');
        }
    });

    // 2. Vanilla Tilt on Cards
    if (window.VanillaTilt && !isMobile()) {
        VanillaTilt.init(document.querySelectorAll('.card'), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // 3. Shery.js Magnetic Effects
    if (window.Shery && !isMobile()) {
        Shery.makeMagnet(".btn-primary, .nav a", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1
        });
    }

    // 4. CountUp.js Statistics
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        if (!stat.classList.contains('counted') && window.countUp) {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let numAnim = new countUp.CountUp(stat, target, { duration: 2.5, separator: ',' });
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    if (!numAnim.error) {
                        numAnim.start();
                        stat.classList.add('counted');
                    }
                }
            });
        }
    });

    // 5. Spotlight Hover Effect
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

}

// 5. Three.js Interactive Visuals
let threeInitialized = false;
function initThree() {
    if (isMobile()) return; // Disable Three.js on mobile
    const canvasContainer = document.getElementById('three-container');
    if (!canvasContainer || canvasContainer.hasChildNodes()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x14b8a6, wireframe: true, transparent: true, opacity: 0.6 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;
        
        mesh.position.x += (mouseX - mesh.position.x) * 0.05;
        mesh.position.y += (mouseY - mesh.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        if (!canvasContainer) return;
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
}

// 6. Barba.js Initialization
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initThree();
    
    // Delayed init to let DOM settle
    setTimeout(() => {
        initAnimations();
    }, 100);

    barba.init({
        sync: true,
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                // Save scroll position for the current path
                sessionStorage.setItem('scroll_' + data.current.url.path, window.scrollY);

                return gsap.to(data.current.container, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            },
            enter(data) {
                // Clear any leftover overflow hidden from mobile menu
                document.body.style.overflow = '';
                
                // Re-init logic
                gsap.from(data.next.container, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        initAnimations();
                        initThree();
                        if (window.initParticles) {
                            window.initParticles(data.next.namespace);
                        }
                    }
                });
                
                // Restore scroll on back/forward, otherwise reset to top
                if (data.trigger === 'back' || data.trigger === 'forward' || data.trigger === 'popstate') {
                    const savedScroll = sessionStorage.getItem('scroll_' + data.next.url.path);
                    if (savedScroll !== null) {
                        const y = parseInt(savedScroll, 10);
                        if (typeof lenis !== 'undefined' && lenis) {
                            lenis.scrollTo(y, { immediate: true });
                        } else {
                            window.scrollTo(0, y);
                        }
                    } else {
                        if (typeof lenis !== 'undefined' && lenis) lenis.scrollTo(0, { immediate: true });
                        else window.scrollTo(0, 0);
                    }
                } else {
                    if (typeof lenis !== 'undefined' && lenis) lenis.scrollTo(0, { immediate: true });
                    else window.scrollTo(0, 0);
                }
            }
        }]
    });
});
