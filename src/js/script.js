document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});

//Animation
document.querySelector(".animate-btn").addEventListener("click", function() {
    const interactiveBox = document.querySelector(".interactive-box");
    interactiveBox.classList.toggle("active");

    let circle1 = document.querySelector(".extra-circle-1");
    let circle2 = document.querySelector(".extra-circle-2");

    if (circle1 && circle2) {
        circle1.remove();
        circle2.remove();
    } else {
        circle1 = document.createElement("div");
        circle2 = document.createElement("div");

        circle1.classList.add("extra-circle", "extra-circle-1");
        circle2.classList.add("extra-circle", "extra-circle-2");

        const container = document.querySelector(".animated-btn-wrapper");
        container.appendChild(circle1);
        container.appendChild(circle2);
    }
});