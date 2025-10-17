function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuClose = document.getElementById("menuClose");

    if (!menuToggle || !mobileMenu || !menuClose) {
        setTimeout(initMobileMenu, 100);
        return;
    }

    const menuLinks = mobileMenu.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active")
            ? "hidden"
            : "auto";
    });

    menuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });
}

function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const mobileNavLinks = document.querySelectorAll(".mobile-menu a");

    if (navLinks.length === 0) {
        setTimeout(initNavigation, 100);
        return;
    }

    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach(link => link.classList.remove("main"));
        clickedLink.classList.add("main");
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            setActiveLink(link, navLinks);
            const href = link.getAttribute("href");
            const correspondingMobileLink = document.querySelector(`.mobile-menu a[href="${href}"]`);
            if (correspondingMobileLink) {
                setActiveLink(correspondingMobileLink, mobileNavLinks);
            }
        });
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            setActiveLink(link, mobileNavLinks);
            const href = link.getAttribute("href");
            const correspondingDesktopLink = document.querySelector(`.nav-links a[href="${href}"]`);
            if (correspondingDesktopLink) {
                setActiveLink(correspondingDesktopLink, navLinks);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initMobileMenu();
        initNavigation();
    });
} else {
    initMobileMenu();
    initNavigation();
}
