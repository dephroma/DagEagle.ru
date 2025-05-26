document.addEventListener('DOMContentLoaded', function() {
  // ========== Карусель отзывов ==========
  const initCarousel = () => {
    const track = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const cards = document.querySelectorAll('.review-card');
    
    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;
    
    const cardCount = cards.length;
    const cardWidth = cards[0].offsetWidth + 30;
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Клонируем первые несколько карточек
    for (let i = 0; i < Math.min(3, cardCount); i++) {
      track.appendChild(cards[i].cloneNode(true));
    }
    
    function updateCarousel() {
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      if (currentIndex >= cardCount) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = 0;
          track.style.transform = `translateX(0)`;
        }, 500);
      }
    }
    
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        currentIndex++;
        updateCarousel();
      }, 3000);
    }
    
    // Инициализация
    updateCarousel();
    startAutoScroll();
    
    // Управление кнопками
    nextBtn.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      currentIndex++;
      updateCarousel();
      startAutoScroll();
    });
    
    prevBtn.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      currentIndex = currentIndex <= 0 ? cardCount - 1 : currentIndex - 1;
      updateCarousel();
      startAutoScroll();
    });
    
    track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    track.addEventListener('mouseleave', startAutoScroll);
  };

  // ========== Навигация ==========
  const initNavigation = () => {
    const navContainer = document.querySelector('.nav-container');
    const scrollLeft = document.querySelector('.scroll-left');
    const scrollRight = document.querySelector('.scroll-right');
    
    if (navContainer && scrollLeft && scrollRight) {
      scrollLeft.addEventListener('click', () => {
        navContainer.scrollBy({left: -100, behavior: 'smooth'});
      });
      
      scrollRight.addEventListener('click', () => {
        navContainer.scrollBy({left: 100, behavior: 'smooth'});
      });
    }
    
    // Подсветка активного раздела
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      if (sections.length === 0 || navLinks.length === 0) return;
      
      let current = '';
      sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    });
    
    // Изменение фона навигации
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.style.backgroundColor = window.scrollY > 50 
          ? 'rgba(0, 0, 0, 0.9)' 
          : 'rgba(0, 0, 0, 0.7)';
      });
    }
  };



  // ========== Формы ==========
  const initForms = () => {
    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + 
          (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
      });
    }
    
    // Обработчик для telegramForm
    const telegramForm = document.getElementById('telegramForm');
    if (telegramForm) {
      telegramForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const BOT_TOKEN = '8002070265:AAHDrrfBOgix9tiJlpzF6Xk55UOSeZvZfE0';
        const CHAT_ID = '344059739';
        
        const formData = {
          name: this.querySelector('[name="name"]').value,
          phone: this.querySelector('[name="phone"]').value,
          tour: this.querySelector('[name="tour"]').value || 'Не указан',
          people: this.querySelector('[name="people"]').value || '1',
          date: this.querySelector('[name="date"]').value || 'Не указана'
        };
        
        const messageText = `📌 <b>Новая заявка</b>\n\n` +
          Object.entries(formData).map(([key, value]) => 
            `🔹 <b>${key}:</b> ${value}`
          ).join('\n');
        
        try {
          const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: messageText,
              parse_mode: 'HTML'
            })
          });
          
          const result = await response.json();
          if (result.ok) {
            alert('✅ Заявка отправлена!');
            this.reset();
          } else {
            throw new Error(result.description || 'Ошибка Telegram API');
          }
        } catch (error) {
          console.error('Ошибка:', error);
          alert(`❌ Ошибка: ${error.message}`);
        }
      });
    }

    
    
    // Удалите дублирующийся обработчик для tourBookingForm
    // или используйте только один из них
  };

  // Инициализация всех компонентов
  initCarousel();
  initNavigation();
  initForms();

  




  
  
});

