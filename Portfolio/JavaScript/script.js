document.addEventListener('DOMContentLoaded', function() {

    // Navigation Bar Animations
    const navItems = document.querySelectorAll('#nav ul li');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-effect');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-effect');
        });
    });

    // Skills Section Animation
    const skillDescriptions = document.querySelectorAll('.skills-description p');
    const skillBars = document.querySelectorAll('.skill-bar .skill-level');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    skillDescriptions.forEach(desc => observer.observe(desc));
    skillBars.forEach(bar => observer.observe(bar));

    // Experience Section Animation
    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the speed, the faster the count

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(counter);
    });

    // Services Section Animation
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Project Section Modal
    const projectImages = document.querySelectorAll('.project-img');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.appendChild(modalContent);

    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    const modalImage = document.createElement('img');
    modalContent.appendChild(modalImage);

    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = image.src;
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('form-card').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';
    });
    
    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('thankYouMessage').style.display = 'none';
        document.getElementById('form-card').style.display = 'block';
    });

    // About Me Section Animation
    const aboutElements = document.querySelectorAll('.animate-img, .animate-text');
    aboutElements.forEach(element => observer.observe(element));

    // Education Section Animation
    const educationTexts = document.querySelectorAll('.education .animate-text');
    educationTexts.forEach(text => observer.observe(text));
});
