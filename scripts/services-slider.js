function initServiceSlider() {
    const servicesContainer = document.querySelector('.services');

    if (!servicesContainer || !servicesContainer.innerHTML.trim()) {
        setTimeout(initServiceSlider, 100);
        return;
    }

    const slider = servicesContainer.querySelector(".services__slider");
    const dotsContainer = servicesContainer.querySelector(".services__dots");
    const cards = servicesContainer.querySelectorAll(".services__slider .services__card");

    if (!slider || !dotsContainer || !cards.length) {
        return;
    }

    function createDots() {
        const sliderWidth = slider.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const gap = 18;

        const rawValue = sliderWidth / (cardWidth + gap);
        const fractionalPart = rawValue - Math.floor(rawValue);

        let visibleCards;
        if (fractionalPart >= 0.8) {
            visibleCards = Math.ceil(rawValue);
        } else {
            visibleCards = Math.floor(rawValue);
        }

        const totalDots = Math.max(1, cards.length - visibleCards + 1);

        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'services__dot';
            if (i === 0) dot.classList.add('services__dot--active');
            dotsContainer.appendChild(dot);
        }

        return dotsContainer.querySelectorAll('.services__dot');
    }

    let dots = createDots();

    const updateActiveDot = () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 18;
        const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;

        if (scrollLeft >= maxScrollLeft - 5) {
            dots.forEach((dot, i) => {
                dot.classList.toggle("services__dot--active", i === dots.length - 1);
            });
            return;
        }

        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(index, dots.length - 1));

        dots.forEach((dot, i) => {
            dot.classList.toggle("services__dot--active", i === clampedIndex);
        });
    };

    const addDotEventListeners = () => {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", (e) => {
                e.preventDefault();

                const cardWidth = cards[0].offsetWidth;
                const gap = 18;
                const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;

                if (index === dots.length - 1) {
                    slider.scrollTo({
                        left: maxScrollLeft,
                        behavior: "smooth",
                    });
                } else {
                    const scrollPosition = (cardWidth + gap) * index;
                    slider.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth",
                    });
                }

                dots.forEach((d, i) => {
                    d.classList.toggle("services__dot--active", i === index);
                });
            });
        });
    };

    addDotEventListeners();

    let scrollTimeout;
    slider.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveDot();
        }, 50);
    });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            dots = createDots();
            addDotEventListeners();
            updateActiveDot();
        }, 100);
    });

    updateActiveDot();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceSlider);
} else {
    initServiceSlider();
}
