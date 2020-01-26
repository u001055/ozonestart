export default function offCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox'),
        discountCheckbox = document.getElementById('discount-checkbox');
    discountCheckbox.checked = false;
    checkbox.forEach((elem) => {
        elem.nextElementSibling.classList.remove('checked');
    });
};