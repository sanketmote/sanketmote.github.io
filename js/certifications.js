class CertificationsManager {
    constructor() {
        this.certificationsData = null;
        this.init();
    }

    async init() {
        await this.loadCertifications();
        this.renderTopCertifications();
        this.setupViewAllButton();
    }

    async loadCertifications() {
        try {
            const response = await fetch('data/certifications.json');
            this.certificationsData = await response.json();
        } catch (error) {
            console.error('Error loading certifications:', error);
        }
    }

    renderTopCertifications() {
        const certificationsGrid = document.querySelector('.certifications-grid');
        if (!certificationsGrid || !this.certificationsData) return;

        // Clear existing content
        certificationsGrid.innerHTML = '';

        // Show only top 3 certifications
        const topCertifications = this.certificationsData.certifications.slice(0, 3);

        topCertifications.forEach((cert, index) => {
            const certificationCard = this.createCertificationCard(cert, index);
            certificationsGrid.appendChild(certificationCard);
        });
    }

    createCertificationCard(cert, index) {
        const card = document.createElement('div');
        card.className = 'certification-card';
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', `${(index + 1) * 200}`);

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

    setupViewAllButton() {
        const certClass = document.querySelector('.cert-class');
        if (!certClass || !this.certificationsData) return;

        // Check if there are more than 3 certifications
        if (this.certificationsData.certifications.length > 3) {
            const viewAllButton = document.createElement('div');
            viewAllButton.className = 'view-all-certifications';
            viewAllButton.setAttribute('data-aos', 'fade-up');
            viewAllButton.setAttribute('data-aos-delay', '600');
            viewAllButton.innerHTML = `
                <a href="certifications.html" class="btn btn-outline" data-tooltip="View all certifications and awards">
                    <i class="fas fa-trophy"></i>
                    View All Certifications & Awards
                </a>
            `;
            
            // Insert after the certifications grid
            certClass.appendChild(viewAllButton);
        }
    }
}

// Initialize certifications when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CertificationsManager();
}); 