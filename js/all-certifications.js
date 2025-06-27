class AllCertificationsManager {
    constructor() {
        this.certificationsData = null;
        this.init();
    }

    async init() {
        await this.loadCertifications();
        this.renderAllCertifications();
    }

    async loadCertifications() {
        try {
            const response = await fetch('data/certifications.json');
            this.certificationsData = await response.json();
        } catch (error) {
            console.error('Error loading certifications:', error);
        }
    }

    renderAllCertifications() {
        const certificationsGrid = document.getElementById('allCertificationsGrid');
        if (!certificationsGrid || !this.certificationsData) return;

        // Clear existing content
        certificationsGrid.innerHTML = '';

        // Show all certifications
        this.certificationsData.certifications.forEach((cert, index) => {
            const certificationCard = this.createCertificationCard(cert, index);
            certificationsGrid.appendChild(certificationCard);
        });
    }

    createCertificationCard(cert, index) {
        const card = document.createElement('div');
        card.className = 'certification-card';
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', `${(index % 3 + 1) * 200}`);

        card.innerHTML = `
            <div class="cert-icon">
                <i class="${cert.icon}"></i>
            </div>
            <h3>${cert.title}</h3>
            <h4>${cert.subtitle}</h4>
            <p>${cert.description}</p>
        `;

        return card;
    }
}

// Initialize all certifications when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AllCertificationsManager();
}); 