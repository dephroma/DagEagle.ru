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







        