function initPromoSlider() {
    const promoContainer = document.querySelector('#promo');

    if (!promoContainer || !promoContainer.innerHTML.trim()) {
        setTimeout(initPromoSlider, 100);
        return;
    }

    const slider = promoContainer.querySelector(".promo__slider");
    const dotsContainer = promoContainer.querySelector(".promo__slider-dots");
    const cards = promoContainer.querySelectorAll(".promo__slider .promo__card--active");

    if (!slider || !dotsContainer || !cards.length) {
        setTimeout(initPromoSlider, 100);
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
            dot.className = 'promo__slider-dot';
            if (i === 0) dot.classList.add('promo__slider-dot--active');
            dotsContainer.appendChild(dot);
        }

        return dotsContainer.querySelectorAll('.promo__slider-dot');
    }

    let dots = createDots();

    const updateActiveDot = () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 18;

        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(index, dots.length - 1));

        dots.forEach((dot, i) => {
            dot.classList.toggle("promo__slider-dot--active", i === clampedIndex);
        });
    };

    const addDotEventListeners = () => {
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
                    d.classList.toggle("promo__slider-dot--active", i === index);
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

window.addEventListener('promoCardsReady', initPromoSlider);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initPromoSlider, 200);
    });
} else {
    setTimeout(initPromoSlider, 200);
}
