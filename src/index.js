
// checkbox

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach((elem) =>{
    elem.addEventListener('change', function(){
    if (this.checked) {
        this.nextElementSibling.classList.add('checked');
    } else {
        this.nextElementSibling.classList.remove('checked');
    }
  });
});

// end checkbox

//cart

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

//end cart

// add remove items

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

// end add remove items