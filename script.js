// rotate text js code 
const text = document.querySelector(".text p");

if (text) {
    text.innerHTML = text.innerHTML.split("").map((char, i) =>
        `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`
    ).join("");
}

// switch between about buttons 
const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Update the text in the about section
const aboutText = document.querySelector(".about-content p");
if (aboutText) {
    aboutText.innerHTML = "As a recent graduate, I am eager to apply my skills in web development and design. I am passionate about creating user-friendly applications and continuously learning new technologies.";
}

// portfolio filter 
const mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});

// Initialize swiperjs 
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});


// Contact Form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
});
// skill Progress bar 
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

let skillsPlayed = false;

window.addEventListener("scroll", () => {
    if (!skillsPlayed && first_skill) {
        skillsCounter();
    }
});

function hasReached(el) {
    const topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
}

function updateCount(num, maxNum) {
    const currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        const target = +counter.dataset.target;
        const strokeValue = 465 - 465 * (target / 100);

        if (progress_bars[i]) {
            progress_bars[i].style.setProperty("--target", strokeValue);
        }

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// side progress bar 
const calcScrollValue = () => {
    const scrollProgress = document.getElementById("progress");
    const pos = document.documentElement.scrollTop;

    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    if (scrollProgress) {
        scrollProgress.style.display = pos > 100 ? "grid" : "none";
        scrollProgress.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
        });

        scrollProgress.style.background = getComputedStyle(document.body).getPropertyValue('--progress-bar-color');
    }
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu 
const menuLi = document.querySelectorAll("header ul li a");
const section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    if (menuLi[len]) menuLi[len].classList.add("active"); // Check if menuLi exists
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll reveal
ScrollReveal({
    distance: "90px",
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.hero-info, .main-text, .proposal, .heading', { origin: "top" });
ScrollReveal().reveal('.about-img, .fillter-buttons, .contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content, .skills', { origin: "right" });
ScrollReveal().reveal('.allServices, .portfolio-gallery, .blog-box, footer, .img-hero', { origin: "bottom" });

// Activating the theme by clicking the button
document.getElementById('themeButton').addEventListener('click', function () {
    // Toggle black and white theme
    document.body.classList.toggle('black-and-white-theme');

    // Update skill circles and progress bar colors
    const skillCircles = document.querySelectorAll('.outer-circle svg circle');
    skillCircles.forEach(circle => {
        circle.style.stroke = getComputedStyle(document.body).getPropertyValue('--skill-color');
    });

    const progressBar = document.getElementById('progress');
    progressBar.style.background = getComputedStyle(document.body).getPropertyValue('--progress-bar-color');
});

// Add this function to handle menu toggle
document.querySelector('.menu-icon').addEventListener('click', function() {
    const navList = document.querySelector('.navlist');
    navList.classList.toggle('active'); // Toggle the active class to show/hide menu
});