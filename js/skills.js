// Skills Management
class SkillsManager {
    constructor() {
        this.skillsData = null;
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadSkillsData();
            this.renderCategories();
            this.renderSkills();
            this.bindEvents();
        } catch (error) {
            console.error('Error loading skills data:', error);
        }
    }

    async loadSkillsData() {
        const response = await fetch('data/skills.json');
        this.skillsData = await response.json();
    }

    renderCategories() {
        const categoriesContainer = document.getElementById('skillsCategories');
        if (!categoriesContainer) return;

        const categoriesHTML = this.skillsData.categories.map(category => `
            <button class="category-btn ${category.id === 'all' ? 'active' : ''}" 
                    data-category="${category.id}">
                ${category.name}
            </button>
        `).join('');

        categoriesContainer.innerHTML = categoriesHTML;
    }

    renderSkills() {
        const skillsContainer = document.getElementById('skillsGrid');
        if (!skillsContainer) return;

        const filteredSkills = this.currentCategory === 'all' 
            ? this.skillsData.skills 
            : this.skillsData.skills.filter(skill => skill.category === this.currentCategory);

        const skillsHTML = filteredSkills.map(skill => `
            <div class="skill-card" data-category="${skill.category}">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <h3>${skill.name}</h3>
            </div>
        `).join('');

        skillsContainer.innerHTML = skillsHTML;
    }

    bindEvents() {
        const categoriesContainer = document.getElementById('skillsCategories');
        if (!categoriesContainer) return;

        categoriesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // Remove active class from all buttons
                categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Update current category and re-render skills
                this.currentCategory = e.target.dataset.category;
                this.renderSkills();
            }
        });
    }
}

// Initialize skills manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsManager();
}); 