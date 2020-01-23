'use strict';
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
//console.log(checkbox);


// end checkbox