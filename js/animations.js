// ============================================
// Premium Web Animations (GSAP, Lenis, Barba, etc.)
// ============================================

let lenis;
function initLenis() {
    if (lenis) return;
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

function initAnimations() {
    if (window.ScrollTrigger) ScrollTrigger.refresh();

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
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('.card'), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // 3. Shery.js Magnetic Effects
    if (window.Shery) {
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
}

// 5. Three.js Interactive Visuals
let threeInitialized = false;
function initThree() {
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
                return gsap.to(data.current.container, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            },
            enter(data) {
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
                
                // Hack to reset scroll manually for lenis when changing pages
                window.scrollTo(0,0);
            }
        }]
    });
});
