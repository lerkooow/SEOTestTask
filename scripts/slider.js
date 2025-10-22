function initPromoSlider() {
    const promoContainer = document.querySelector('#promo');

    if (!promoContainer || !promoContainer.innerHTML.trim()) {
        setTimeout(initPromoSlider, 100);
        return;
    }

    const slider = promoContainer.querySelector(".promo-slider");
    const dotsContainer = promoContainer.querySelector(".slider-dots");
    const cards = promoContainer.querySelectorAll(".promo-slider .promo-card");

    console.log('Поиск элементов слайдера:', {
        promoContainer: !!promoContainer,
        slider: !!slider,
        dotsContainer: !!dotsContainer,
        cardsFound: cards.length
    });

    if (!slider || !dotsContainer || !cards.length) {
        console.log('Не все элементы слайдера найдены');
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

        console.log('Создание точек:', {
            sliderWidth,
            cardWidth,
            visibleCards,
            totalCards: cards.length,
            totalDots
        });

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

    console.log('Инициализация слайдера успешна:', {
        slider: !!slider,
        dotsCount: dots.length,
        cardsCount: cards.length
    });

    const updateActiveDot = () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 18;

        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(index, dots.length - 1));

        console.log('Обновление точки:', {
            scrollLeft,
            cardWidth,
            index: clampedIndex,
            dotsLength: dots.length
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === clampedIndex);
        });
    };

    const addDotEventListeners = () => {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", (e) => {
                e.preventDefault();
                console.log('Клик по точке:', index);

                const cardWidth = cards[0].offsetWidth;
                const gap = 18;
                const scrollPosition = (cardWidth + gap) * index;

                console.log('Прокрутка к позиции:', scrollPosition);

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
    document.addEventListener('DOMContentLoaded', initPromoSlider);
} else {
    initPromoSlider();
}
