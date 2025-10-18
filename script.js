const items = document.querySelectorAll('.item');
const nextBtn = document.querySelector('.arrow-right');
const prevBtn = document.querySelector('.arrow-left');
const indicators = document.querySelectorAll('.indicators ul li');
const number = document.querySelector('.numbers');
const section = document.querySelector('section');

let activeIndex = 0;
const total = items.length;
let isAnimating = false;
let autoSlide;

function updateSlider(newIndex, direction) {
    if (newIndex === activeIndex || isAnimating) return;
    isAnimating = true;

    const currentItem = items[activeIndex];
    const nextItem = items[newIndex];

    // DIREÇÃO CORRIGIDA 👇
    const enterClass = direction === 'next' ? 'enter-left' : 'enter-right';
    const exitClass  = direction === 'next' ? 'exit-right' : 'exit-left';

    // aplica classes
    currentItem.classList.add(exitClass);
    nextItem.classList.add(enterClass, 'active');

    // atualiza contador e indicadores
    number.textContent = `0${newIndex + 1}`;
    indicators.forEach((dot, i) => dot.classList.toggle('active', i === newIndex));

    // remove classes após a animação
    setTimeout(() => {
        currentItem.classList.remove('active', exitClass);
        nextItem.classList.remove(enterClass);
        activeIndex = newIndex;
        isAnimating = false;
    }, 1000);
}

function nextSlide() {
    let newIndex = activeIndex + 1;
    if (newIndex >= total) newIndex = 0;
    updateSlider(newIndex, 'next');
}

function prevSlide() {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) newIndex = total - 1;
    updateSlider(newIndex, 'prev');
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// autoplay
function startAuto() {
    autoSlide = setInterval(nextSlide, 6000);
}
function stopAuto() {
    clearInterval(autoSlide);
}

section.addEventListener('mouseenter', stopAuto);
section.addEventListener('mouseleave', startAuto);

startAuto();
