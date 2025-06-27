// ===== PROJECTS JAVASCRIPT =====

// Global variables to store fetched data
let projectsData = [];
let categoriesData = [];

// Slider functionality
let currentSlide = 0;
let slidesPerView = 3;
let totalSlides = 0;
let autoSlideInterval = null;
let autoSlideDelay = 4000; // 4 seconds between slides

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects.js loaded');
    
    // Fetch data from JSON files
    fetchProjectsData();
});

// Fetch projects data from JSON file
async function fetchProjectsData() {
    try {
        console.log('Fetching projects data from JSON...');
        const response = await fetch('data/projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        projectsData = data.projects;
        categoriesData = data.categories;
        
        console.log('Projects data loaded successfully:', projectsData.length, 'projects');
        
        // Initialize based on current page
        initializePage();
        
    } catch (error) {
        console.error('Error fetching projects data:', error);
        // Fallback to default data if fetch fails
        loadFallbackData();
    }
}

// Fallback data in case JSON fetch fails
function loadFallbackData() {
    console.log('Loading fallback data...');
    projectsData = [
        {
            title: "Portfolio Website",
            category: "web",
            description: "A modern, responsive portfolio website showcasing professional experience, skills, and projects with interactive animations.",
            image: "assets/images/portolio_website.JPG",
            technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            github: "#",
            live: "https://sanketmote.github.io/",
            featured: true
        },
        {
            title: "WCE SPACE",
            category: "web",
            description: "A comprehensive web platform for Walchand College of Engineering students to access academic resources, announcements, and student services.",
            image: "assets/images/wcespace.PNG",
            technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Bootstrap"],
            github: "https://github.com/pavanshinde7494/WCE-SPACE",
            live: "https://wcespace.herokuapp.com/home",
            featured: true
        },
        {
            title: "Drushti",
            category: "ai",
            description: "Developed the Drushti app, designed to assist visually impaired users by providing audible navigation through object detection and distance measurement.",
            image: "assets/images/python.png",
            technologies: ["Python", "TensorFlow", "OpenCV", "Flutter", "Flask"],
            github: "#",
            live: "#",
            featured: true
        }
    ];
    
    categoriesData = [
        { id: "all", name: "All" },
        { id: "ai", name: "AI/ML" },
        { id: "web", name: "Web Development" },
        { id: "backend", name: "Backend" },
        { id: "data", name: "Data Analysis" }
    ];
    
    initializePage();
}

// Initialize page based on current location
function initializePage() {
    // Check if we're on the home page (has slider)
    const slider = document.getElementById('projectsSlider');
    if (slider) {
        console.log('Initializing projects slider for home page');
        initializeProjectsSlider();
    }
    
    // Check if we're on the projects page (has grid and categories)
    const projectsGrid = document.getElementById('projectsGrid');
    const categoriesContainer = document.getElementById('projectsCategories');
    if (projectsGrid || categoriesContainer) {
        console.log('Initializing projects page');
        initializeProjectsPage();
    }
}

// Initialize projects slider for home page
function initializeProjectsSlider() {
    const slider = document.getElementById('projectsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slider) return;
    
    // Get featured projects (first 5 for slider)
    const featuredProjects = projectsData.slice(0, 5);
    totalSlides = featuredProjects.length;
    
    console.log(`Creating ${totalSlides} featured project slides`);
    
    // Create slides
    featuredProjects.forEach((project, index) => {
        const slide = createProjectSlide(project, index);
        slider.appendChild(slide);
    });
    
    // Set initial position
    updateSliderPosition();
    
    // Add event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
            }
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            if (currentSlide < totalSlides - slidesPerView) {
                currentSlide++;
                updateSliderPosition();
            }
            startAutoSlide();
        });
    }
    
    // Update slides per view based on screen size
    updateSlidesPerView();
    window.addEventListener('resize', () => {
        updateSlidesPerView();
        updateSlideVisibility();
    });
    
    // Start auto-sliding
    startAutoSlide();
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

// Start auto-sliding
function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    
    autoSlideInterval = setInterval(() => {
        if (currentSlide < totalSlides - slidesPerView) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to first slide
        }
        updateSliderPosition();
    }, autoSlideDelay);
}

// Stop auto-sliding
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Update slider position
function updateSliderPosition() {
    const slider = document.getElementById('projectsSlider');
    if (!slider) return;
    
    const slideWidth = 350 + 32; // slide width + gap
    const translateX = -currentSlide * slideWidth;
    
    slider.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide >= totalSlides - slidesPerView;
    }
    
    // Update slide visibility and tilt effects
    updateSlideVisibility();
}

// Update slide visibility and apply tilt effects
function updateSlideVisibility() {
    const slides = document.querySelectorAll('.project-slide');
    const sliderContainer = document.querySelector('.projects-showcase');
    
    if (!sliderContainer) return;
    
    const containerRect = sliderContainer.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;
    const containerCenter = containerLeft + (containerRight - containerLeft) / 2;
    
    slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const slideLeft = slideRect.left;
        const slideRight = slideRect.right;
        const slideWidth = slideRect.width;
        const slideCenter = slideLeft + slideWidth / 2;
        
        // Calculate visibility percentage
        const visibleLeft = Math.max(slideLeft, containerLeft);
        const visibleRight = Math.min(slideRight, containerRight);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        const visibilityPercentage = (visibleWidth / slideWidth) * 100;
        
        // Calculate distance from center for 3D effect
        const distanceFromCenter = Math.abs(slideCenter - containerCenter);
        const maxDistance = (containerRight - containerLeft) / 2;
        const depthFactor = distanceFromCenter / maxDistance;
        
        // Remove existing classes and inline styles
        slide.classList.remove('fully-visible', 'partial-visible');
        slide.style.transform = '';
        slide.style.opacity = '';
        
        // Apply classes based on visibility and position
        if (visibilityPercentage >= 80) {
            // Fully visible - center slide
            slide.classList.add('fully-visible');
        } else if (visibilityPercentage > 30) {
            // Partially visible - apply 3D depth effect
            slide.classList.add('partial-visible');
            
            // Add custom transform based on position
            const zDepth = -150 - (depthFactor * 100); // Much deeper for better 3D effect
            const rotation = slideCenter < containerCenter ? 30 : -30; // More rotation
            const scale = 0.8 - (depthFactor * 0.2); // Smaller scale for depth
            
            slide.style.transform = `translateY(-5px) rotateY(${rotation}deg) translateZ(${zDepth}px) scale(${scale})`;
        } else {
            // Barely visible - hide completely
            slide.style.transform = `translateY(-5px) rotateY(0deg) translateZ(-200px) scale(0.6)`;
            slide.style.opacity = '0.2';
        }
    });
}

// Update slides per view based on screen size
function updateSlidesPerView() {
    const width = window.innerWidth;
    
    if (width < 768) {
        slidesPerView = 1;
    } else if (width < 1024) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }
    
    updateSliderPosition();
}

// Create project slide element
function createProjectSlide(project, index) {
    const slide = document.createElement('div');
    slide.className = 'project-slide';
    slide.style.animationDelay = `${index * 0.1}s`;
    
    slide.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="project-image-fallback" style="display: none;">
                <div class="project-name-placeholder">
                    <h3>${project.title}</h3>
                    <div class="project-icon">
                        <i class="fas fa-code"></i>
                    </div>
                </div>
            </div>
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.live}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    return slide;
}

// Initialize projects page (for projects.html)
function initializeProjectsPage() {
    const projectsGrid = document.getElementById('projectsGrid');
    const categoriesContainer = document.getElementById('projectsCategories');
    
    console.log('Initializing projects page with', projectsData.length, 'projects');
    
    // Create categories
    if (categoriesContainer) {
        createProjectCategories(categoriesContainer);
    }
    
    // Create projects grid
    if (projectsGrid) {
        createProjectsGrid(projectsGrid, projectsData);
    }
}

// Create project categories
function createProjectCategories(container) {
    console.log('Creating categories:', categoriesData);
    
    categoriesData.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.setAttribute('data-category', category.id);
        button.textContent = category.name;
        
        if (category.id === 'all') {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            container.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filteredProjects = category.id === 'all' 
                ? projectsData 
                : projectsData.filter(project => project.category === category.id);
            
            const projectsGrid = document.getElementById('projectsGrid');
            if (projectsGrid) {
                createProjectsGrid(projectsGrid, filteredProjects);
            }
        });
        
        container.appendChild(button);
    });
}

// Create projects grid
function createProjectsGrid(container, projects) {
    container.innerHTML = '';
    
    console.log(`Rendering ${projects.length} projects`);
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Create fallback image display with project name
    const imageFallback = `
        <div class="project-image-fallback">
            <div class="project-name-placeholder">
                <h3>${project.title}</h3>
                <div class="project-icon">
                    <i class="fas fa-code"></i>
                </div>
            </div>
        </div>
    `;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="project-image-fallback" style="display: none;">
                <div class="project-name-placeholder">
                    <h3>${project.title}</h3>
                    <div class="project-icon">
                        <i class="fas fa-code"></i>
                    </div>
                </div>
            </div>
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.live}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
} 