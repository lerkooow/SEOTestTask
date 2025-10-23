function initPromoCards() {
    const promoContainer = document.querySelector('#promo');

    if (!promoContainer || !promoContainer.innerHTML.trim()) {
        setTimeout(initPromoCards, 100);
        return;
    }

    const allCards = promoContainer.querySelectorAll('.promo__card--small, .promo__card--active');

    if (allCards.length === 0) {
        setTimeout(initPromoCards, 100);
        return;
    }

    const cardData = {
        '02': {
            title: 'DIGITAL ПРОДУКТЫ',
            text: 'Создаем и развиваем digital-продукты: от веб-сервисов и мобильных приложений до сложных платформ.',
            icon: '/icons/digital.svg',
            bg: '/images/bg2.jpg',
            smallTitle: 'Digital продукты'
        },
        '03': {
            title: 'МАРКЕТИНГ',
            text: 'Настраиваем и ведем рекламу, продвигаем в соцсетях, привлекаем лидов и повышаем лояльность.',
            icon: '/icons/marketing.svg',
            bg: '/images/bg3.jpg',
            smallTitle: 'Маркетинг',
            isBlue: true
        },
        '04': {
            title: 'ТОПОВОЕ SEO ПРОДВИЖЕНИЕ',
            text: 'Продвигаем сайты, повышаем их видимость и привлекаем целевой трафик для роста бизнеса.',
            icon: '/icons/seo.svg',
            bg: '/images/bg4.jpg',
            smallTitle: 'SEO продвижение'
        },
        '05': {
            title: 'СОЗДАНИЕ САЙТОВ',
            text: 'Разрабатываем продающие сайты, которые привлекают клиентов, отражают ценности бренда',
            icon: '/icons/create.svg',
            bg: '/images/bg5.jpg',
            smallTitle: 'Создание сайтов',
            isBlue: true
        },
        '06': {
            title: 'ДИЗАЙН',
            text: 'Создаем целостный визуальный образ бренда: от логотипа и айдентики до дизайна интерфейсов.',
            icon: '/icons/design.svg',
            bg: '/images/bg6.jpg',
            smallTitle: 'Дизайн'
        }
    };

    function createActiveCard(number, data) {
        return `
            <img class="promo__bg" src="${data.bg}" alt="Background" />
            <div class="promo__blur">
                <span class="promo__number--four">${number}</span>
                <div class="promo__icon-circle">
                    <img src="${data.icon}" alt="Icon" />
                </div>
                <div class="promo__active-content">
                    <p class="promo__active-title">${data.title}</p>
                    <p class="promo__active-text">${data.text}</p>
                    <a href="#" class="promo__btn-more">
                        Подробнее
                        <img src="/icons/arrow-black.svg" alt="arrow right" />
                    </a>
                </div>
            </div>
        `;
    }

    function createSmallCard(number, data) {
        return `
            <p>${data.smallTitle}</p>
            <span>${number}</span>
        `;
    }

    promoContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.promo__card--small');

        if (!card) return;

        const cardNumber = card.querySelector('span').textContent;

        const allCardsNow = promoContainer.querySelectorAll('.promo__card--small, .promo__card--active');
        allCardsNow.forEach(otherCard => {
            if (otherCard.classList.contains('promo__card--active')) {
                const activeNumber = otherCard.querySelector('.promo__number--four').textContent;
                const activeData = cardData[activeNumber];

                if (activeData) {
                    otherCard.className = `promo__card--small${activeData.isBlue ? ' promo__card--small-blue' : ''}`;
                    otherCard.innerHTML = createSmallCard(activeNumber, activeData);
                }
            }
        });

        if (cardData[cardNumber]) {
            card.className = 'promo__card--active';
            card.innerHTML = createActiveCard(cardNumber, cardData[cardNumber]);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPromoCards);
} else {
    initPromoCards();
}
