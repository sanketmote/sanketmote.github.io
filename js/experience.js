// Experience Management
class ExperienceManager {
    constructor() {
        this.experienceData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadExperienceData();
            this.renderExperience();
        } catch (error) {
            console.error('Error loading experience data:', error);
        }
    }

    async loadExperienceData() {
        const response = await fetch('data/experience.json');
        this.experienceData = await response.json();
    }

    renderExperience() {
        const experienceContainer = document.getElementById('experienceTimeline');
        if (!experienceContainer) return;

        const experienceHTML = this.experienceData.experience.map(exp => `
            <div class="experience-item">
                <div class="experience-content">
                    <div class="experience-header">
                        <h3>${exp.position}</h3>
                        <span class="experience-company">${exp.company}</span>
                    </div>
                    <div class="experience-details">
                        <p class="experience-location">${exp.location}</p>
                        <p class="experience-duration">${exp.duration}</p>
                    </div>
                    <p class="experience-description">${exp.description}</p>
                    <div class="experience-responsibilities">
                        <h4>Key Responsibilities:</h4>
                        <ul>
                            ${exp.responsibilities.map(responsibility => `
                                <li>${responsibility}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="experience-technologies">
                        <h4>Technologies Used:</h4>
                        <div class="tech-tags">
                            ${exp.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        experienceContainer.innerHTML = experienceHTML;
    }
}

// Initialize experience manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceManager();
}); 