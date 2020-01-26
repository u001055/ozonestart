export default function actionPage() {
    const cards = document.querySelectorAll('.goods .card')
    discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filter);
    /* () => {
            cards.forEach((card) => {
                const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent);
                if (discountCheckbox.checked) {
                    if (!card.querySelector('.card-sale') || (min.value && price < min.value) || (max.value && price > max.value)) {
                        card.parentNode.style.display = 'none';
                    }
                } else {
                    card.parentNode.style.display = '';
                };
            });
            
        }); */

    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent);
            if (((discountCheckbox.checked) && !card.querySelector('.card-sale')) || ((min.value && price < min.value) || (max.value && price > max.value)) || ((card.dataset.category !== currentCategory) && (currentCategory !== 'All'))) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    };

    max.addEventListener('change', filter);
    max.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            filter();
        }
    });

    min.addEventListener('change', filter);
    min.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            filter();
        }
    });

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });


    });

};