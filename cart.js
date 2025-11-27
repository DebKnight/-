/* --- JAVASCRIPT ЛОГИКА ДЛЯ КОРЗИНЫ --- */

// Массив для хранения товаров в корзине
let cart = [];

/**
 * Добавляет товар в массив корзины, считывая данные из HTML.
 * @param {HTMLElement} button Элемент кнопки, на которую нажали.
 */
function addToCart(button) {
    // Находим родительский элемент .card для считывания данных
    const card = button.closest('.card');

    // Получаем данные из data-атрибутов
    const id = parseInt(card.dataset.id);
    const title = card.dataset.title;
    const price = parseInt(card.dataset.price);
    const image = card.dataset.image;

    // Проверяем, что товар еще не в корзине (чтобы не добавлять одно и то же)
    if (cart.find(item => item.id === id)) {
        alert(`"${title}" уже в вашем списке избранного.`);
        return;
    }

    const item = {
        id: id,
        title: title,
        price: price,
        image: image
    };

    cart.push(item);
    updateCartUI();

    // Уведомление
    alert(`"${title}" добавлен в список избранного!`);
}

/**
 * Удаляет товар из массива корзины.
 * @param {number} id Уникальный ID товара.
 */
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

/**
 * Обновляет счетчик корзины, список товаров и общую сумму.
 */
function updateCartUI() {
    // 1. Обновить счетчик товаров
    document.getElementById('cart-count').innerText = cart.length;

    // 2. Обновить список товаров в модальном окне
    const container = document.getElementById('cart-items-container');
    container.innerHTML = ''; // Очищаем текущий список

    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Вы пока ничего не выбрали. Добавьте гараж!</p>';
    } else {
        cart.forEach(item => {
            totalPrice += item.price;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
<img src="${item.image}" alt="photo">
<div class="cart-item-info">
    <div class="cart-item-title">${item.title}</div>
    <div class="cart-item-price">${item.price.toLocaleString('ru-RU')} ₽</div>
</div>
<button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
            `;
            container.appendChild(itemElement);
        });
    }

    // 3. Обновить общую сумму
    document.getElementById('cart-total-price').innerText = totalPrice.toLocaleString('ru-RU') + ' ₽';
}

/**
 * Открывает модальное окно корзины.
 */
function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
}

/**
 * Закрывает модальное окно корзины.
 */
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Добавляем обработчик для закрытия корзины по клику вне окна
document.addEventListener('click', function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
