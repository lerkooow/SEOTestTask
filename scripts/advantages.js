let advantagesInitialized = false;

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvantagesCards);
} else {
    initAdvantagesCards();
}
