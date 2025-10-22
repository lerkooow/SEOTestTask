function initPromoCards() {
    const promoContainer = document.querySelector('#promo');

    if (!promoContainer || !promoContainer.innerHTML.trim()) {
        setTimeout(initPromoCards, 100);
        return;
    }

    const allCards = promoContainer.querySelectorAll('.promo-card');

    if (allCards.length === 0) {
        setTimeout(initPromoCards, 100);
        return;
    }

    console.log('Найдено карточек:', allCards.length);

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
            <img class="bg" src="${data.bg}" alt="Background" />
            <div class="blur">
                <span class="numberFour">${number}</span>
                <div class="icon-circle">
                    <img src="${data.icon}" alt="Icon" />
                </div>
                <div class="active-content">
                    <p class="active-title">${data.title}</p>
                    <p class="active-text">${data.text}</p>
                    <a href="#" class="btn-more">
                        Подробнее
                        <img src="/icons/arrowBlack.svg" alt="Arrow Black" />
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
        const card = e.target.closest('.promo-card.small');

        if (!card) return;

        const cardNumber = card.querySelector('span').textContent;

        const allCardsNow = promoContainer.querySelectorAll('.promo-card');
        allCardsNow.forEach(otherCard => {
            if (otherCard.classList.contains('active')) {
                const activeNumber = otherCard.querySelector('.numberFour').textContent;
                const activeData = cardData[activeNumber];

                if (activeData) {
                    otherCard.className = `promo-card small${activeData.isBlue ? ' blue' : ''}`;
                    otherCard.innerHTML = createSmallCard(activeNumber, activeData);
                }
            }
        });

        if (cardData[cardNumber]) {
            card.className = 'promo-card active';
            card.innerHTML = createActiveCard(cardNumber, cardData[cardNumber]);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPromoCards);
} else {
    initPromoCards();
}
