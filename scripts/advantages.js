let advantagesInitialized = false;
let advantagesSliderInitialized = false;

function initAdvantagesCards() {
    if (advantagesInitialized) {
        return;
    }

    const advantagesContainer = document.querySelector('#advantages');

    if (!advantagesContainer || !advantagesContainer.innerHTML.trim()) {
        setTimeout(initAdvantagesCards, 100);
        return;
    }

    const advantagesCards = advantagesContainer.querySelectorAll('.advantages-card');

    if (advantagesCards.length === 0) {
        setTimeout(initAdvantagesCards, 100);
        return;
    }

    advantagesInitialized = true;

    advantagesCards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.classList.toggle('active');
        });
    });
}

function initAdvantagesSlider() {
    const advantagesContainer = document.querySelector('#advantages');

    if (!advantagesContainer || !advantagesContainer.innerHTML.trim()) {
        setTimeout(initAdvantagesSlider, 100);
        return;
    }

    const slider = advantagesContainer.querySelector(".advantages-cards");
    const dotsContainer = advantagesContainer.querySelector(".advantages-slider-dots");
    const cards = advantagesContainer.querySelectorAll(".advantages-cards .advantages-card");

    if (!slider || !dotsContainer || !cards.length) {
        return;
    }

    function isSliderMode() {
        return window.innerWidth <= 949;
    }

    function createDots() {
        if (!isSliderMode()) {
            dotsContainer.innerHTML = '';
            return [];
        }

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
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        return dotsContainer.querySelectorAll('.dot');
    }

    let dots = createDots();

    const updateActiveDot = () => {
        if (!isSliderMode() || dots.length === 0) return;

        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 18;

        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(index, dots.length - 1));

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === clampedIndex);
        });
    };

    const addDotEventListeners = () => {
        if (!isSliderMode()) return;

        dots.forEach((dot, index) => {
            dot.addEventListener("click", (e) => {
                e.preventDefault();

                const cardWidth = cards[0].offsetWidth;
                const gap = 18;
                const scrollPosition = (cardWidth + gap) * index;

                slider.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });

                dots.forEach((d, i) => {
                    d.classList.toggle("active", i === index);
                });
            });
        });
    };

    addDotEventListeners();

    let scrollTimeout;
    slider.addEventListener("scroll", () => {
        if (!isSliderMode()) return;

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
    advantagesSliderInitialized = true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAdvantagesCards();
        initAdvantagesSlider();
    });
} else {
    initAdvantagesCards();
    initAdvantagesSlider();
}
