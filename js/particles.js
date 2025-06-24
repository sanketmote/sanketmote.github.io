// ===== PARTICLES BACKGROUND =====

// Initialize particles background if canvas exists
document.addEventListener('DOMContentLoaded', function() {
    const particlesCanvas = document.getElementById('particles');
    if (particlesCanvas) {
        new ParticlesBackground(particlesCanvas);
    }
});

class ParticlesBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        this.addEventListeners();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = Math.random() * 2 - 1;
            const directionY = Math.random() * 2 - 1;
            
            this.particles.push({
                x,
                y,
                size,
                directionX,
                directionY,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            // Move particles
            particle.x += particle.directionX;
            particle.y += particle.directionY;
            
            // Bounce off edges
            if (particle.x > this.canvas.width || particle.x < 0) {
                particle.directionX = -particle.directionX;
            }
            if (particle.y > this.canvas.height || particle.y < 0) {
                particle.directionY = -particle.directionY;
            }
            
            // Mouse interaction
            if (this.mouse.x != null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    
                    particle.x -= directionX * force * 2;
                    particle.y -= directionY * force * 2;
                }
            }
            
            // Draw particles
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        }
        
        // Draw connections
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    addEventListeners() {
        // Mouse move
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }
}

// ===== WAVE BACKGROUND =====

class WaveBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createWaves();
        this.animate();
        this.addEventListeners();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createWaves() {
        this.waves = [
            {
                amplitude: 50,
                frequency: 0.02,
                speed: 0.02,
                color: 'rgba(255, 255, 255, 0.1)',
                offset: 0
            },
            {
                amplitude: 30,
                frequency: 0.03,
                speed: 0.03,
                color: 'rgba(255, 255, 255, 0.05)',
                offset: Math.PI / 2
            },
            {
                amplitude: 20,
                frequency: 0.04,
                speed: 0.04,
                color: 'rgba(255, 255, 255, 0.03)',
                offset: Math.PI
            }
        ];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.waves.forEach(wave => {
            this.drawWave(wave);
            wave.offset += wave.speed;
        });
        
        this.time += 0.01;
        requestAnimationFrame(() => this.animate());
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        
        for (let x = 0; x <= this.canvas.width; x += 2) {
            const y = this.canvas.height / 2 + 
                     Math.sin(x * wave.frequency + wave.offset) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2 + wave.offset * 2) * wave.amplitude * 0.5;
            
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.closePath();
        
        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

// ===== FLUID BACKGROUND =====

class FluidBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.points = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createPoints();
        this.animate();
        this.addEventListeners();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createPoints() {
        const numberOfPoints = 6;
        for (let i = 0; i < numberOfPoints; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 100 + 50
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update points
        this.points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;
            
            // Draw point
            const gradient = this.ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.size
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.time += 0.01;
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const dx = this.points[i].x - this.points[j].x;
                const dy = this.points[i].y - this.points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const opacity = (200 - distance) / 200 * 0.1;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.moveTo(this.points[i].x, this.points[i].y);
                    this.ctx.lineTo(this.points[j].x, this.points[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    addEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
            
            // Attract points to mouse
            this.points.forEach(point => {
                const dx = this.mouse.x - point.x;
                const dy = this.mouse.y - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    point.vx += (dx / distance) * force * 0.1;
                    point.vy += (dy / distance) * force * 0.1;
                }
            });
        });
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

// ===== BACKGROUND SWITCHER =====

class BackgroundSwitcher {
    constructor() {
        this.currentBackground = 'particles';
        this.backgrounds = ['particles', 'waves', 'fluid'];
        this.canvases = {};
        
        this.init();
    }
    
    init() {
        this.createCanvases();
        this.switchBackground(this.currentBackground);
        this.addControls();
    }
    
    createCanvases() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        this.backgrounds.forEach(type => {
            const canvas = document.createElement('canvas');
            canvas.className = `${type}-canvas background-canvas`;
            canvas.style.display = 'none';
            heroSection.appendChild(canvas);
            this.canvases[type] = canvas;
        });
    }
    
    switchBackground(type) {
        // Hide all canvases
        Object.values(this.canvases).forEach(canvas => {
            canvas.style.display = 'none';
        });
        
        // Show selected canvas
        if (this.canvases[type]) {
            this.canvases[type].style.display = 'block';
            this.currentBackground = type;
        }
    }
    
    addControls() {
        const controls = document.createElement('div');
        controls.className = 'background-controls';
        controls.innerHTML = `
            <button class="bg-btn active" data-bg="particles">Particles</button>
            <button class="bg-btn" data-bg="waves">Waves</button>
            <button class="bg-btn" data-bg="fluid">Fluid</button>
        `;
        
        document.querySelector('.hero').appendChild(controls);
        
        controls.addEventListener('click', (e) => {
            if (e.target.classList.contains('bg-btn')) {
                const type = e.target.getAttribute('data-bg');
                this.switchBackground(type);
                
                // Update active button
                controls.querySelectorAll('.bg-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }
}

// Initialize background switcher
document.addEventListener('DOMContentLoaded', function() {
    new BackgroundSwitcher();
}); 