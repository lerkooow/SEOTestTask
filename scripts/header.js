function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuClose = document.getElementById("menu-close");

    if (!menuToggle || !mobileMenu || !menuClose) {
        setTimeout(initMobileMenu, 100);
        return;
    }

    const menuLinks = mobileMenu.querySelectorAll(".mobile-menu__link");

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
    const navLinks = document.querySelectorAll(".header__link");
    const mobileNavLinks = document.querySelectorAll(".mobile-menu__link");

    if (navLinks.length === 0) {
        setTimeout(initNavigation, 100);
        return;
    }

    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach((link) =>
            link.classList.remove("header__link--main")
        );
        clickedLink.classList.add("header__link--main");
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setActiveLink(link, navLinks);
            const href = link.getAttribute("href");
            const correspondingMobileLink = document.querySelector(
                `.mobile-menu__link[href="${href}"]`
            );
            if (correspondingMobileLink) {
                setActiveLink(correspondingMobileLink, mobileNavLinks);
            }
        });
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setActiveLink(link, mobileNavLinks);
            const href = link.getAttribute("href");
            const correspondingDesktopLink = document.querySelector(
                `.header__link[href="${href}"]`
            );
            if (correspondingDesktopLink) {
                setActiveLink(correspondingDesktopLink, navLinks);
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initMobileMenu();
        initNavigation();
    });
} else {
    initMobileMenu();
    initNavigation();
}
