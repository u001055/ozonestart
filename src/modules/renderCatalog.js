

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogList = document.querySelector('.catalog-list'),
        catalogWrapper = document.querySelector('.catalog'),
        catalogBtn = document.querySelector('.catalog-button'),
        categories = new Set();

    cards.forEach(card => {
        categories.add(card.dataset.category);
    });
    categories.add('All');

    categories.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        catalogWrapper.style.display = catalogWrapper.style.display ? '' : 'block';
        if (event.target.tagName === 'LI') {
            cards.forEach(card => card.parentNode.style.display = (card.dataset.category === event.target.textContent) ? '' : 'none');
            currentCategory = event.target.textContent;
            const min = document.getElementById('min'),
                max = document.getElementById('max');

            offCheckbox();
            min.value = '';
            max.value = '';
        }
        if (event.target.textContent === 'All') {
            cards.forEach(card => card.parentNode.style.display = '');
        }
    });
}