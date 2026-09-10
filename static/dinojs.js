

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVIGATION
    ========================= */

    const nav = document.getElementById("mainNav");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("nav1");
    const navLinks = document.querySelectorAll(".nav1 a");

    // Mobile navigation toggle
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu after clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);

    // Run once when page loads
    handleNavbarScroll();


    /* =========================
       COURSE SEARCH
    ========================= */

    const searchInput = document.getElementById("courseSearch");
    const searchCount = document.getElementById("searchCount");

    const courseCards = document.querySelectorAll(".course-card");

    function searchCourses() {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCourses = 0;

        courseCards.forEach(card => {

            const courseName = card.dataset.course
                ? card.dataset.course.toLowerCase()
                : card.textContent.toLowerCase();

            const displayName = card.textContent.toLowerCase();

            const matches =
                courseName.includes(searchValue) ||
                displayName.includes(searchValue);

            if (matches) {
                card.classList.remove("hidden");
                visibleCourses++;
            } else {
                card.classList.add("hidden");
            }
        });

        // Show result count only when searching
        if (searchValue === "") {
            searchCount.textContent = "";
        } else {
            searchCount.textContent =
                `${visibleCourses} course${visibleCourses !== 1 ? "s" : ""} found`;
        }
    }

    searchInput.addEventListener("input", searchCourses);


    /* =========================
       SMOOTH SCROLLING
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    /* =========================
       ACTIVE NAVIGATION LINK
    ========================= */

    const sections = document.querySelectorAll(
        "header[id], main section[id]"
    );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop - 150 &&
                window.scrollY < sectionTop + sectionHeight - 150
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================
       REVEAL ANIMATIONS
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-head, .course-card, .strata, .dig-item, .about-inner, .form, .contact"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       APPLICATION FORM
    ========================= */

    const problemForm = document.getElementById("problemForm");
    const formStatus = document.getElementById("formStatus");

    const fullName = document.getElementById("fullName");
    const emailAddr = document.getElementById("emailAddr");
    const problemText = document.getElementById("problemText");

    problemForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Clear previous status
        formStatus.textContent = "";
        formStatus.className = "form-status";

        const name = fullName.value.trim();
        const email = emailAddr.value.trim();
        const problem = problemText.value.trim();


        /* Validation */

        if (name === "") {

            showError("Please enter your name.");
            fullName.focus();
            return;
        }

        if (email === "") {

            showError("Please enter your email.");
            emailAddr.focus();
            return;
        }

        if (!isValidEmail(email)) {

            showError("Please enter a valid email address.");
            emailAddr.focus();
            return;
        }

        if (problem === "") {

            showError("Please tell us what is blocking your learning.");
            problemText.focus();
            return;
        }


        /* Successful submission */

        formStatus.textContent =
            `Thanks, ${name}! Your response has been submitted.`;

        formStatus.classList.add("success");

        // Reset form
        problemForm.reset();

    });


    /* =========================
       EMAIL VALIDATION
    ========================= */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    /* =========================
       FORM ERROR MESSAGE
    ========================= */

    function showError(message) {

        formStatus.textContent = message;

        formStatus.classList.add("error");
    }


    /* =========================
       COURSE CARD KEYBOARD SUPPORT
    ========================= */

    courseCards.forEach(card => {

        card.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                card.click();
            }

        });

    });


    /* =========================
       ESCAPE KEY
       CLOSE MOBILE MENU
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================
       PREVENT EMPTY INSTAGRAM LINK
    ========================= */

    const contactLinks = document.querySelectorAll(".contact-links a");

    contactLinks.forEach(link => {

        if (link.getAttribute("href") === "#") {

            link.addEventListener("click", event => {
                event.preventDefault();
            });

        }

    });

});
const slide = document.getElementById("python");
    const details = document.getElementById("python-course");
    slide.addEventListener("click",event =>{
        if(details.style.display === "none"){
            details.style.display = "block";
        }
        else{
            details.style.display = "none";
        }
    });
    const slide1 = document.getElementById("kotlin");
    const details1 = document.getElementById("kotlin-course");
    slide1.addEventListener("click",event =>{
        if(details1.style.display === "none"){
            details1.style.display = "block";
        }
        else{
            details1.style.display = "none";
        }
    });
    const slide2 = document.getElementById("go");
    const details2 = document.getElementById("go-course");
    slide2.addEventListener("click",event =>{
        if(details2.style.display === "none"){
            details2.style.display = "block";
        }
        else{
            details2.style.display = "none";
        }
    });
    const slide3 = document.getElementById("java");
    const details3 = document.getElementById("java-course");
    slide3.addEventListener("click",event =>{
        if(details3.style.display === "none"){
            details3.style.display = "block";
        }
        else{
            details3.style.display = "none";
        }
    });
    const slide4 = document.getElementById("cpp");
    const details4 = document.getElementById("cpp-course");
    slide4.addEventListener("click",event =>{
        if(details4.style.display === "none"){
            details4.style.display = "block";
        }
        else{
            details4.style.display = "none";
        }
    });
    const slide5 = document.getElementById("c");
    const details5 = document.getElementById("c-course");
    slide5.addEventListener("click",event =>{
        if(details5.style.display === "none"){
            details5.style.display = "block";
        }
        else{
            details5.style.display = "none";
        }
    });
   const slide6 = document.getElementById("html");
    const details6 = document.getElementById("html-course");
    slide6.addEventListener("click",event =>{
        if(details6.style.display === "none"){
            details6.style.display = "block";
        }
        else{
            details6.style.display = "none";
        }
    });
    const slide7 = document.getElementById("css");
    const details7 = document.getElementById("css-course");
    slide7.addEventListener("click",event =>{
        if(details7.style.display === "none"){
            details7.style.display = "block";
        }
        else{
            details7.style.display = "none";
        }
    });
    const slide8 = document.getElementById("javascript");
    const details8 = document.getElementById("javascript-course");
    slide8.addEventListener("click",event =>{
        if(details8.style.display === "none"){
            details8.style.display = "block";
        }
        else{
            details8.style.display = "none";
        }
    });
    const slide9 = document.getElementById("react");
    const details9 = document.getElementById("react-course");
    slide9.addEventListener("click",event =>{
        if(details9.style.display === "none"){
            details9.style.display = "block";
        }
        else{
            details9.style.display = "none";
        }
    });
    const slide10 = document.getElementById("angular");
    const details10 = document.getElementById("angular-course");
    slide10.addEventListener("click",event =>{
        if(details10.style.display === "none"){
            details10.style.display = "block";
        }
        else{
            details10.style.display = "none";
        }
    });
    const slide11 = document.getElementById("node");
    const details11 = document.getElementById("node-course");
    slide11.addEventListener("click",event =>{
        if(details11.style.display === "none"){
            details11.style.display = "block";
        }
        else{
            details11.style.display = "none";
        }
    });
    const slide12 = document.getElementById("django");
    const details12 = document.getElementById("django-course");
    slide12.addEventListener("click",event =>{
        if(details12.style.display === "none"){
            details12.style.display = "block";
        }
        else{
            details12.style.display = "none";
        }
    });
    const slide13 = document.getElementById("flask");
    const details13 = document.getElementById("flask-course");
    slide13.addEventListener("click",event =>{
        if(details13.style.display === "none"){
            details13.style.display = "block";
        }
        else{
            details13.style.display = "none";
        }
    });
    const slide14 = document.getElementById("fastapi");
    const details14 = document.getElementById("fastapi-course");
    slide14.addEventListener("click",event =>{
        if(details14.style.display === "none"){
            details14.style.display = "block";
        }
        else{
            details14.style.display = "none";
        }
    });
  