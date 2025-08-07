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
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Python', icon: 'fab fa-python' },
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

    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const techHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button-accessibility').addEventListener('click', () => {
        const accessibilityOptions = document.getElementById('accessibility-options');

        if (accessibilityOptions.style.display === 'flex') {
            accessibilityOptions.style.display = 'none';
        } else {
            accessibilityOptions.style.display = 'flex';
        };
    });

    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');
    let fontSize = 1;

    increaseFont.addEventListener('click', () => {
        fontSize += 0.1;
        document.body.style.fontSize = fontSize + 'em';
    });
    
    decreaseFont.addEventListener('click', () => {
        fontSize -= 0.1;
        document.body.style.fontSize = fontSize + 'em';
    // Botão de acessibilidade
    document.getElementById('button-accessibility').addEventListener('click', () => {
        const accessibilityOptions = document.getElementById('accessibility-options');
        accessibilityOptions.style.display = (accessibilityOptions.style.display === 'flex') ? 'none' : 'flex';
    });

    // Controle de tamanho da fonte
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');
    let fontSize = parseFloat(localStorage.getItem('fontSize')) || 1; // Restaurar tamanho da fonte salvo

    const updateFontSize = (delta) => {
        fontSize = Math.max(0.5, fontSize + delta); // Evitar tamanho de fonte muito pequeno
        document.body.style.fontSize = fontSize + 'em';
    };

    increaseFont.addEventListener('click', () => updateFontSize(0.1));
    decreaseFont.addEventListener('click', () => updateFontSize(-0.1));

    // Menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // Menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Alternância de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        themeIcon.className = savedTheme === 'dark' ? 'fa-sun' : 'fa-moon';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeIcon.className = newTheme === 'dark' ? 'fa-sun' : 'fa-moon';
        });
    }

    // Controle de tamanho da fonte
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');
    let fontSize = parseFloat(localStorage.getItem('fontSize')) || 1; // Restaurar tamanho da fonte salvo

    const updateFontSize = (delta) => {
        fontSize = Math.max(0.5, fontSize + delta); // Evitar tamanho de fonte muito pequeno
        document.body.style.fontSize = fontSize + 'em';
        localStorage.setItem('fontSize', fontSize); // Salvar tamanho da fonte no localStorage
    };

    if (increaseFont && decreaseFont) {
        increaseFont.addEventListener('click', () => updateFontSize(0.1));
        decreaseFont.addEventListener('click', () => updateFontSize(-0.1));
    }

    // Aplicar tamanho da fonte salvo ao carregar a página
    document.body.style.fontSize = fontSize + 'em';
});
    });

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    let fontSize = parseFloat(localStorage.getItem('fontSize')) || 1;

    // Alternar menu hambúrguer
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

    // Alternar tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Suavizar rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Aumentar e diminuir fonte
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');

    increaseFont.addEventListener('click', () => {
        fontSize += 0.1;
        document.body.style.fontSize = fontSize + 'em';
    });

    decreaseFont.addEventListener('click', () => {
        fontSize = Math.max(0.5, fontSize - 0.1); // Limitar tamanho mínimo
        document.body.style.fontSize = fontSize + 'em';
    });
});