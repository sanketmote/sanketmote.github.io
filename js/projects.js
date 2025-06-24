// Projects Management
class ProjectsManager {
    constructor() {
        this.projectsData = null;
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadProjectsData();
            this.renderCategories();
            this.renderProjects();
            this.bindEvents();
        } catch (error) {
            console.error('Error loading projects data:', error);
        }
    }

    async loadProjectsData() {
        const response = await fetch('data/projects.json');
        this.projectsData = await response.json();
    }

    renderCategories() {
        const categoriesContainer = document.getElementById('projectsCategories');
        if (!categoriesContainer) return;

        const categoriesHTML = this.projectsData.categories.map(category => `
            <button class="category-btn ${category.id === 'all' ? 'active' : ''}" 
                    data-category="${category.id}">
                ${category.name}
            </button>
        `).join('');

        categoriesContainer.innerHTML = categoriesHTML;
    }

    renderProjects() {
        const projectsContainer = document.getElementById('projectsGrid');
        if (!projectsContainer) return;

        const filteredProjects = this.currentCategory === 'all' 
            ? this.projectsData.projects 
            : this.projectsData.projects.filter(project => project.category === this.currentCategory);

        const projectsHTML = filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            ${project.github !== '#' ? `
                                <a href="${project.github}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            ` : ''}
                            ${project.live !== '#' ? `
                                <a href="${project.live}" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        projectsContainer.innerHTML = projectsHTML;
    }

    bindEvents() {
        const categoriesContainer = document.getElementById('projectsCategories');
        if (!categoriesContainer) return;

        categoriesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // Remove active class from all buttons
                categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Update current category and re-render projects
                this.currentCategory = e.target.dataset.category;
                this.renderProjects();
            }
        });
    }
}

// Initialize projects manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
}); 