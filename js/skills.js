// Skills Management
class SkillsManager {
    constructor() {
        this.skillsData = null;
        this.currentCategory = 'all';
        this.showAllSkills = false;
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
        
        // Apply mobile view logic
        this.applyMobileView();
    }

    applyMobileView() {
        const skillCards = document.querySelectorAll('.skill-card');
        const viewMoreBtn = document.getElementById('viewMoreSkills');
        
        if (!skillCards.length || !viewMoreBtn) return;

        // Check if we're on mobile (768px and below)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Show only first 6 skills initially (3 rows of 2 cards each)
            skillCards.forEach((card, index) => {
                if (index < 6) {
                    card.style.display = 'block';
                } else {
                    card.style.display = this.showAllSkills ? 'block' : 'none';
                }
            });
            
            // Show/hide view more button based on number of skills
            if (skillCards.length > 6) {
                viewMoreBtn.style.display = 'block';
                viewMoreBtn.innerHTML = this.showAllSkills 
                    ? '<i class="fas fa-minus"></i> Show Less' 
                    : '<i class="fas fa-plus"></i> View More Skills';
            } else {
                viewMoreBtn.style.display = 'none';
            }
        } else {
            // On desktop, show all skills and hide view more button
            skillCards.forEach(card => {
                card.style.display = 'block';
            });
            viewMoreBtn.style.display = 'none';
        }
    }

    bindEvents() {
        const categoriesContainer = document.getElementById('skillsCategories');
        const viewMoreBtn = document.getElementById('viewMoreSkills');
        
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
                this.showAllSkills = false; // Reset view more state when changing category
                this.renderSkills();
            }
        });

        // View more button event
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', () => {
                this.showAllSkills = !this.showAllSkills;
                this.applyMobileView();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.applyMobileView();
        });
    }
}

// Initialize skills manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsManager();
}); 