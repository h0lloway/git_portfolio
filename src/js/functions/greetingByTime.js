export function initGreetingByTime(selector = '#hi') {
    const el = document.querySelector(selector);
    if (!el) return;

    const hour = new Date().getHours();
    let greet = '';

    if (hour < 6) {
        greet = 'Доброй ночи!';
    } else if (hour < 12) {
        greet = 'Доброе утро!';
    } else if (hour < 17) {
        greet = 'Добрый день!';
    } else {
        greet = 'Добрый вечер!';
    }

    el.innerText = greet;
}
