# Personal Resume Website

A modern, responsive, and animated personal portfolio website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and interactive elements to showcase your professional experience and skills.

## 🌟 Features

### Design & Layout
- **Modern Design**: Clean and professional layout with modern typography
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Dark/Light Theme**: Toggle between dark and light themes with smooth transitions
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Interactive Backgrounds**: Multiple animated background options (particles, waves, fluid)

### Sections
- **Hero Section**: Animated introduction with typing effect and background animations
- **About Me**: Personal information with profile picture and bio
- **Skills**: Animated skill bars with proficiency levels
- **Projects**: Filterable project showcase with hover effects
- **Resume**: Timeline-based experience and education display
- **Contact**: Interactive contact form with validation
- **Footer**: Social media links and additional information

### Interactive Elements
- **Smooth Scrolling**: Smooth navigation between sections
- **Form Validation**: Real-time form validation with error messages
- **Project Filtering**: Filter projects by category
- **Scroll Progress**: Visual progress indicator
- **Back to Top**: Smooth scroll to top functionality
- **Mobile Menu**: Responsive mobile navigation

### Performance & Accessibility
- **Performance Optimized**: Efficient animations and lazy loading
- **Accessibility**: Keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags and structured data
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/personal-resume-website.git
   cd personal-resume-website
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

3. **Local Server (Optional)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
personal-resume-website/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Main stylesheet
│   └── animations.css      # Animation styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── particles.js        # Background animations
├── assets/
│   └── images/             # Images and icons
└── README.md               # Project documentation
```

## 🎨 Customization

### Personal Information
Edit the following sections in `index.html`:

1. **Hero Section**
   ```html
   <h1 class="hero-title">Your Name</h1>
   <p class="hero-subtitle">Your Title</p>
   <span class="typing-text">Your Skills</span>
   ```

2. **About Section**
   ```html
   <h2>Your Name</h2>
   <p>Your bio and description</p>
   ```

3. **Contact Information**
   ```html
   <div class="contact-item">
       <i class="fas fa-envelope"></i>
       <span>your.email@example.com</span>
   </div>
   ```

### Skills
Add or modify skills in the skills section:
```html
<div class="skill-card" data-aos="fade-up">
    <div class="skill-info">
        <h3>Skill Name</h3>
        <span class="skill-percentage">90%</span>
    </div>
    <div class="skill-progress" data-percentage="90"></div>
</div>
```

### Projects
Add your projects:
```html
<div class="project-card" data-category="web" data-aos="fade-up">
    <div class="project-image">
        <img src="project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description</p>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
            <a href="#" class="project-link"><i class="fab fa-github"></i></a>
        </div>
    </div>
</div>
```

### Colors & Theme
Customize colors in `css/style.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --accent-color: #28a745;
    --text-color: #333;
    --bg-color: #fff;
}
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed automatically
3. Custom domain can be added in site settings

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

## 🔧 Configuration

### Background Animations
Choose from three background types:
- **Particles**: Interactive particle system
- **Waves**: Animated wave patterns
- **Fluid**: Fluid-like animations

### Animation Settings
Modify animation speeds and effects in `js/main.js`:
```javascript
// Typing animation speed
let typeSpeed = isDeleting ? 50 : 100;

// Scroll animation threshold
{ threshold: 0.1 }
```

### Form Configuration
The contact form includes client-side validation. For server-side processing, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Configure form action and method
3. Handle form submission and email sending

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minimize HTTP Requests**: Combine CSS/JS files
3. **Enable Compression**: Use gzip or brotli compression
4. **Use CDN**: Serve external libraries from CDN
5. **Lazy Loading**: Implement lazy loading for images

## 🐛 Troubleshooting

### Common Issues

1. **Animations not working**
   - Check if JavaScript is enabled
   - Verify all JS files are loaded
   - Check browser console for errors

2. **Responsive issues**
   - Test on different screen sizes
   - Check CSS media queries
   - Verify viewport meta tag

3. **Form not submitting**
   - Check form validation
   - Verify form action URL
   - Check browser console for errors

### Debug Mode
Enable debug mode by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [AOS Library](https://michalsnik.github.io/aos/) for scroll animations

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for showcasing your professional journey**



