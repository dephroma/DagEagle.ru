document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const cards = document.querySelectorAll('.review-card');
  const cardCount = cards.length;
  
  if (cardCount === 0) return;
  
  const cardWidth = cards[0].offsetWidth + 30; // включая gap
  let currentIndex = 0;
  let autoScrollInterval;
  
  // Клонируем первые несколько карточек в конец для бесшовной прокрутки
  for (let i = 0; i < 3; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }
  
  function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Когда доходим до клонов, мгновенно переходим к началу
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
  
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  
  // Инициализация
  updateCarousel();
  startAutoScroll();
  
  // Управление кнопками
  nextBtn.addEventListener('click', () => {
    stopAutoScroll();
    currentIndex++;
    updateCarousel();
    startAutoScroll();
  });
  
  prevBtn.addEventListener('click', () => {
    stopAutoScroll();
    currentIndex = currentIndex <= 0 ? cardCount - 1 : currentIndex - 1;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    startAutoScroll();
  });
  
  // Пауза при наведении
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  
  // Пересчёт при изменении размера окна
  window.addEventListener('resize', () => {
    const newCardWidth = cards[0].offsetWidth + 30;
    if (Math.abs(cardWidth - newCardWidth) > 5) {
      cardWidth = newCardWidth;
      updateCarousel();
    }
  });
});

document.getElementById('tourBookingForm').addEventListener('submit', function(e) {e.preventDefault();
  
  // Собираем данные формы
  const formData = {
    name: document.getElementById('name').value,
    guests: document.getElementById('guests').value,
    date: document.getElementById('date').value,
    tour: document.getElementById('tour').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value
  };

  // Отправка через Formspree (бесплатный сервис)
  fetch('https://formspree.io/f/rromann192@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (response.ok) {
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      document.getElementById('tourBookingForm').reset();
    } else {
      throw new Error('Ошибка отправки');
    }
  })

  
  .catch(error => {
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    console.error('Error:', error);
  });
});


        const navContainer = document.querySelector('.nav-container');
document.querySelector('.scroll-left').addEventListener('click', () => {
  navContainer.scrollBy({left: -100, behavior: 'smooth'});
});
document.querySelector('.scroll-right').addEventListener('click', () => {
  navContainer.scrollBy({left: 100, behavior: 'smooth'});
});

// Маска для телефона
document.getElementById('phone').addEventListener('input', function(e) {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

        // Подсветка активного раздела
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
});

window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-image');
    const scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

document.addEventListener('DOMContentLoaded', function() {
    const parallax = document.querySelector('.parallax-image');
    const parallaxSection = document.querySelector('.parallax-booking');
    
    if (!parallax) return;
    
    function updateParallax() {
        const rect = parallaxSection.getBoundingClientRect();
        const scrollPosition = window.pageYOffset;
        const elementPosition = rect.top + scrollPosition;
        const distance = scrollPosition - elementPosition;
        
        // Параллакс-эффект только когда элемент видим
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            parallax.style.transform = `translate3d(0, ${distance * 0.3}px, 0)`;
        }
    }
    
    // Запускаем только на мобильных
    if (window.innerWidth <= 768) {
        window.addEventListener('scroll', updateParallax);
        window.addEventListener('resize', updateParallax);
        updateParallax(); // Инициализация
    }
});  





document.getElementById('telegramForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const formMessage = document.getElementById('form-message');
  
  // Показываем индикатор загрузки
  submitText.style.display = 'none';
  submitSpinner.style.display = 'inline';
  submitBtn.disabled = true;
  formMessage.textContent = '';
  formMessage.style.display = 'none';

  try {
    // Формируем текст сообщения
    const formData = new FormData(form);
    let messageText = '📌 <b>Новая заявка на тур</b>\n\n';
    
    // Собираем данные из формы
    const formFields = {
      'Имя': formData.get('name'),
      'Телефон': formData.get('phone'),
      'Тур': formData.get('tour') || 'Не указан',
      'Количество человек': formData.get('people') || '1',
      'Дата': formData.get('date') || 'Не указана',
      'Комментарий': formData.get('message') || 'Нет комментария'
    };
    
    // Формируем сообщение
    for (const [key, value] of Object.entries(formFields)) {
      messageText += `🔹 <b>${key}:</b> ${value}\n`;
    }

    // Важные константы (замените на свои!)
    const BOT_TOKEN = '8002070265:AAHDrrfBOgix9tiJlpzF6Xk55UOSeZvZfE0'; // Например: '123456789:ABCdefGHIJKlmNoPQRsTUVwxyZ'
    const CHAT_ID = '344059739'; // Например: '123456789' или '-1001234567890' для групп

    // Отправляем в Telegram
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID, // Используем константу вместо formData.get('chat_id')
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (data.ok) {
      // Показываем модальное окно благодарности
      showThankYouModal();
      form.reset();
    } else {
      throw new Error(data.description || 'Ошибка отправки');
    }
  } catch (error) {
    formMessage.textContent = '❌ Ошибка отправки. Пожалуйста, свяжитесь с нами через Telegram или по телефону.';
    formMessage.style.color = 'red';
    console.error('Ошибка:', error);
  } finally {
    formMessage.style.display = 'block';
    submitText.style.display = 'inline';
    submitSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// Функция для показа модального окна
function showThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  modal.style.display = 'block';
  
  // Закрытие при клике на крестик
  document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
  
  // Закрытие при клике на кнопку
  document.querySelector('.modal-close-btn').onclick = () => modal.style.display = 'none';
  
  // Закрытие при клике вне окна
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
  
  // Автозакрытие через 5 секунд
  setTimeout(() => {
    modal.style.display = 'none';
  }, 5000);
}