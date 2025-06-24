// Resume Management (Education and Experience)
class ResumeManager {
    constructor() {
        this.educationData = null;
        this.experienceData = null;
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadEducationData(),
                this.loadExperienceData()
            ]);
            this.renderEducation();
            this.renderExperience();
        } catch (error) {
            console.error('Error loading resume data:', error);
        }
    }

    async loadEducationData() {
        const response = await fetch('data/education.json');
        this.educationData = await response.json();
    }

    async loadExperienceData() {
        const response = await fetch('data/experience.json');
        this.experienceData = await response.json();
    }

    renderEducation() {
        const educationContainer = document.getElementById('educationTimeline');
        if (!educationContainer) return;

        const educationHTML = this.educationData.education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.institution}</h4>
                    <p class="timeline-date">${edu.duration}</p>
                    <p>${edu.description}</p>
                </div>
            </div>
        `).join('');

        educationContainer.innerHTML = educationHTML;
    }

    renderExperience() {
        const experienceContainer = document.getElementById('experienceTimeline');
        if (!experienceContainer) return;

        const experienceHTML = this.experienceData.experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${exp.position}</h3>
                    <h4>${exp.company}</h4>
                    <p class="timeline-date">${exp.duration}</p>
                    <ul>
                        ${exp.responsibilities.map(responsibility => `
                            <li>${responsibility}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        experienceContainer.innerHTML = experienceHTML;
    }
}

// Initialize resume manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeManager();
}); 