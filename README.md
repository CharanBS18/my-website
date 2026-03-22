# Charan BS - Personal Portfolio Website

A modern, animated personal portfolio website showcasing the work and skills of Charan BS, a Full-Stack Developer. This website features a stunning visual design with smooth animations, a loading screen, and responsive layout.

![Portfolio Preview](https://via.placeholder.com/1200x630/0f0f1a/6366f1?text=Charan+BS+Portfolio)

## ✨ Features

### Visual Design
- **Animated Background**: Floating, colorful orbs with smooth animations
- **Loading Screen**: Interactive loader with name animation
- **Profile Ring**: Animated rotating border around profile image
- **Scroll Animations**: Cards and elements fade in as you scroll
- **Parallax Effect**: Background elements move with mouse position
- **Typing Effect**: Animated text in the hero section

### Sections
1. **Hero Section**
   - Animated profile image with decorative ring
   - Name and title with gradient text
   - Tagline with typing animation
   - Call-to-action buttons (Code, Preview, Deploy)
   - Scroll indicator

2. **About Section**
   - 4 feature cards:
     - Web Development
     - AI Integration
     - UI/UX Design
     - Data Analysis

3. **Skills Section**
   - 6 skill items with icons:
     - Full-Stack Development
     - AI-Assisted Development
     - UI/UX Design
     - Data Analysis
     - Strategic Problem Solving
     - Innovation

4. **Social Section**
   - Links to professional networks:
     - LinkedIn
     - GitHub
     - Twitter
     - Instagram
     - Discord
   - Hover effects with tooltips

### Technical Features
- **Responsive Design**: Works on all screen sizes (desktop, tablet, mobile)
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Intersection Observer**: Efficient scroll animations
- **Event Handlers**: Mouse movement parallax and typing effects
- **Error Handling**: Graceful fallback for missing profile images

## 🛠 Technologies Used

- **HTML5**: Semantic structure and layout
- **CSS3**: Custom styling with CSS variables, animations, and transitions
- **JavaScript (ES6+)**: Interactive features and animations
- **Font Awesome 6.4**: Icon library
- **Google Fonts**: Space Grotesk and Outfit fonts
- **No Frameworks**: Pure HTML, CSS, and JavaScript

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - it's a static site

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/CharanBS18/portfolio.git
cd portfolio
```

2. Open the project folder in your code editor

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop the `index.html` file into your browser.

## 📁 Project Structure

```
my/
├── index.html       # Main portfolio website
├── char.png         # Profile image
└── README.md        # This file
```

## 🎨 Customization

### Changing Profile Image
Replace `char.png` with your own photo. For best results:
- Use a square image
- Recommended size: 400x400 pixels
- Supported formats: PNG, JPG, JPEG

### Updating Personal Information
Edit `index.html` and search for these text elements:

```html
<!-- Name in multiple places -->
<h1 class="loading-name">Charan BS</h1>
<a href="#" class="nav-logo">Charan BS</a>

<!-- Hero Section -->
<h1 class="hero-title">
    Full-Stack<br>
    <span class="highlight">Developer</span>
</h1>
<p class="hero-subtitle">AI-Driven Applications · Design-Focused · Data-Aware</p>
```

### Modifying Colors
The website uses CSS variables. Find the `:root` section in the CSS:

```css
:root {
    --primary: #6366f1;      /* Main accent color */
    --secondary: #a855f7;    /* Secondary accent */
    --accent: #ec4899;       /* Pink accent */
    --cyan: #06b6d4;         /* Cyan accent */
    --dark: #0f0f1a;         /* Dark background */
    --darker: #080810;       /* Darker background */
    --light: #f8fafc;        /* Light text */
    --gray: #94a3b8;         /* Gray text */
}
```

### Changing Social Links
Find the social section in `index.html` and update the `href` attributes:

```html
<a href="https://www.linkedin.com/in/your-profile" target="_blank" data-social="linkedin">
<a href="https://github.com/your-username" target="_blank" data-social="github">
<!-- ... etc -->
```

### Modifying Skills/About Cards
Search for these sections in the HTML and edit the content:

```html
<!-- About Cards -->
<div class="about-card">
    <h3>Your Skill</h3>
    <p>Your description here</p>
</div>

<!-- Skill Items -->
<div class="skill-item">
    <div class="skill-info">
        <h4>Your Skill</h4>
        <p>Your description</p>
    </div>
</div>
```

## 📱 Responsive Design

The website automatically adjusts to different screen sizes:
- **Desktop**: Full layout with all animations
- **Tablet**: Adjusted padding and font sizes
- **Mobile**: Simplified layout, hidden navigation menu

## ⚡ Performance Tips

1. **Image Optimization**: Compress `char.png` for faster loading
2. **Font Loading**: The fonts are loaded from Google Fonts CDN
3. **Animation Performance**: Animations use CSS transforms for GPU acceleration

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available for personal use and modification.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any issues or have suggestions, please open an issue or pull request.

## 📞 Contact

- **LinkedIn**: [Charan BS](https://www.linkedin.com/in/charan-bs-b34975391)
- **GitHub**: [CharanBS18](https://github.com/CharanBS18)
- **Twitter**: [CharanBS114](https://twitter.com/CharanBS114)
- **Instagram**: [charan._._25](https://www.instagram.com/charan._._25)
- **Discord**: [charan00002](https://discord.com/users/charan00002)

---

Made with ❤️ by Charan BS

