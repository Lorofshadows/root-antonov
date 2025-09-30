// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Ждем полной инициализации
tg.ready();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;

// Элементы DOM
const userNameElement = document.getElementById('userName');
const userIdElement = document.getElementById('userId');
const userAvatarElement = document.getElementById('userAvatar');
const loadingElement = document.getElementById('loading');

function displayUserInfo() {
    if (user) {
        // Отображаем имя пользователя
        let displayName = '';
        if (user.first_name) {
            displayName = user.first_name;
            if (user.last_name) {
                displayName += ' ' + user.last_name;
            }
        } else if (user.username) {
            displayName = user.username;
        } else {
            displayName = 'Пользователь';
        }
        
        userNameElement.textContent = displayName;
        
        // Отображаем ID пользователя
        if (user.id) {
            userIdElement.textContent = `ID: ${user.id}`;
        }
        
        // Отображаем аватар
        if (user.photo_url) {
            userAvatarElement.src = user.photo_url;
            userAvatarElement.alt = `Аватар ${displayName}`;
        } else {
            // Заглушка если аватар не доступен
            userAvatarElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiM2NjdlZWEiLz4KPHBhdGggZD0iTTYwIDM1QzQ4LjQgMzUgMzkgNDQuNCAzOSA1NkMzOSA2Ny42IDQ4LjQgNzcgNjAgNzdDNzEuNiA3NyA4MSA2Ny42IDgxIDU2QzgxIDQ0LjQgNzEuNiAzNSA2MCAzNVpNNjAgODVDNDguNCA4NSAzOSA5NC40IDM5IDEwNkMzOSAxMTcuNiA0OC40IDEyNyA2MCAxMjdDNzEuNiAxMjcgODEgMTE3LjYgODEgMTA2QzgxIDk0LjQgNzEuNiA4NSA2MCA4NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
        }
        
        // Скрываем индикатор загрузки
        loadingElement.classList.add('hidden');
        
    } else {
        // Если данные пользователя недоступны
        userNameElement.textContent = 'Данные недоступны';
        userIdElement.textContent = 'Откройте через Telegram Mini App';
        loadingElement.classList.add('hidden');
    }
}

// Задержка для демонстрации загрузки (можно убрать)
setTimeout(displayUserInfo, 1000);

// Также обрабатываем ошибки
window.addEventListener('error', function() {
    userNameElement.textContent = 'Ошибка загрузки';
    userIdElement.textContent = 'Попробуйте обновить страницу';
    loadingElement.classList.add('hidden');
});
