//проверяет локальное хранилище на наличие userэлемента

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userData'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}