// Education Management
class EducationManager {
    constructor() {
        this.educationData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadEducationData();
            this.renderEducation();
        } catch (error) {
            console.error('Error loading education data:', error);
        }
    }

    async loadEducationData() {
        const response = await fetch('data/education.json');
        this.educationData = await response.json();
    }

    renderEducation() {
        const educationContainer = document.getElementById('educationTimeline');
        if (!educationContainer) return;

        const educationHTML = this.educationData.education.map(edu => `
            <div class="education-item">
                <div class="education-content">
                    <div class="education-header">
                        <h3>${edu.degree}</h3>
                        <span class="education-grade">${edu.grade}</span>
                    </div>
                    <div class="education-details">
                        <p class="education-institution">${edu.institution}</p>
                        <p class="education-duration">${edu.duration}</p>
                    </div>
                    <p class="education-description">${edu.description}</p>
                    ${edu.achievements.length > 0 ? `
                        <div class="education-achievements">
                            <h4>Key Achievements:</h4>
                            <ul>
                                ${edu.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        educationContainer.innerHTML = educationHTML;
    }
}

// Initialize education manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EducationManager();
}); 