// checkbox
function toggleCheckbox() {

    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach((elem) => {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
};

// end checkbox

//cart

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
};

//end cart

// add remove items

function addCart() {

    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();

            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;
        cardsPrice.forEach((cardPrice) => {
            sum += parseInt(cardPrice.textContent);
        });
        cardTotal.textContent = sum;
        //console.log(cardsCart.length);
        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);

        };

    };
};
// end add remove items

//filter hot sales + price

function actionPage() {
    const cards = document.querySelectorAll('.goods .card display')
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
            if (((discountCheckbox.checked) && !card.querySelector('.card-sale')) || ((min.value && price < min.value) || (max.value && price > max.value))) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    };

    max.addEventListener('change', filter);
    min.addEventListener('change', filter);

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


//end filter hot sales + price


// server data receive

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены, ошибка:' + response.status);
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style=color:red>Errrror</div>';
        })
}


function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
        <div class="card" data-category="${good.category}">
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>

        `;
        goodsWrapper.appendChild(card);
    });
}

function renderCatalog() {
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
        console.log(event.target.textContent);
        if (event.target.tagName === 'LI') {
            cards.forEach(card => card.parentNode.style.display = (card.dataset.category === event.target.textContent) ? '' : 'none');
        }
        if (event.target.textContent === 'All') {
            cards.forEach(card => card.parentNode.style.display = '');
        }
    });
}
// server data receive

getData().then(data => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});