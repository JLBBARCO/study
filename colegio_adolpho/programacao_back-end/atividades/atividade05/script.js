document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        if (document.body.getAttribute('data-theme') === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const techSkills = [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js-square' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'NPM', icon: 'fab fa-npm' },
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Docker', icon: 'fab fa-docker' }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsGrid.innerHTML = '';
    
    techSkills.forEach(skill => {
        const skillHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
                <span class="skill-name">${skill.name}</span>
            </div>
        `;
        skillsGrid.innerHTML += skillHTML;
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillObserver.disconnect();

    const projects = [
        {
            title: 'Estudos',
            description: 'Um site de estudos onde salvo todos os arquivos que faço quando estou estudando programação.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
            liveLink: 'https://jlbbarco.github.io/study',
            codeLink: 'https://github.com/jlbbarco/study/'
        },
        {
            title: 'Site do portfólio',
            description: 'Esse site de portfólio, tendo o template sido desenvolvido por José Luiz B Barco.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            liveLink: 'https://jlbbarco.github.io/',
            codeLink: 'https://github.com/jlbbarco/jlbbarco.github.io/'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const techHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const projectHTML = `
            <div class="project-card">
                <div class="project-image"></div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techHTML}</div>
                    <div class="project-links">
                        <a href="${project.liveLink}" class="project-link" target="_blank">Live Demo</a>
                        <a href="${project.codeLink}" class="project-link" target="_blank">View Code</a>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectHTML;
    });

    const initParticles = () => {
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = Math.floor(window.innerWidth / 10);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + 
                        Math.pow(p.y - p2.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });
    };

    initParticles();

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
});