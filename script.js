document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.tour-section, .tour-header, .tour-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    window.addEventListener('load', () => {
        document.querySelector('.hero').style.opacity = '1';
        
        // Установка начального состояния для анимируемых элементов
        const elements = document.querySelectorAll('.tour-section, .tour-header, .tour-content');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
        });
        
        // Запуск анимации при скролле
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Проверка при загрузке
    });

});