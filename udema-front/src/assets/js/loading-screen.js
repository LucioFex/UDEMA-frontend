// Remove loading screen when app is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('app-root');
    const loading = document.querySelector('.app-loading');

    const observer = new MutationObserver((mutations) => {
    if (app.children.length > 1) {
        loading.classList.add('fade-out');
        setTimeout(() => {
        loading.remove();
        }, 500);
        observer.disconnect();
    }
    });

    observer.observe(app, {
    childList: true
    });
});