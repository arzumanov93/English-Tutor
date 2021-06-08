'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Fixed nav

    const navWrapper = document.querySelector('#nav__wrapper'),
          about = document.querySelector('#about'),
          header = document.querySelector('#header'),
          heightAbout = about.clientHeight,
          heightHeader = header.clientHeight;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > heightAbout + 100) {
            navWrapper.classList.add('fixed');

        } else {
            navWrapper.classList.remove('fixed');

        }
    });
    
    // Smooth scroll

    const navLinks = document.querySelectorAll('.nav__link[data-scroll]');

    navLinks.forEach(item => {
        item.addEventListener('click', onMenuLinkClick); 
    });

    function onMenuLinkClick(e) {
        e.preventDefault();
        const navLink = e.target;

        if(navLink.dataset.scroll && document.querySelector(navLink.dataset.scroll)) {
            const gotoBlock = document.querySelector(navLink.dataset.scroll);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.nav__wrapper').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
        }
    }

    // Methods

    const method = document.querySelectorAll('.methods__item'),
          tabsParent = document.querySelector('.methods__tabs'),
          tabs = document.querySelectorAll('.methods__tabs-link');

    function hideMethod() {
        method.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('methods__tabs-link-active');
        });
    }

    function showMethod(i = 0) {
        method[i].classList.add('show', 'fade');
        method[i].classList.remove('hide');
        tabs[i].classList.add('methods__tabs-link-active');
    }

    hideMethod();
    showMethod();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('methods__tabs-link')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideMethod();
                    showMethod(i);
                }
            });
        }
    });

    //Timer
/*
    const deadline = '2021-08-31';

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000*60*60*24)),
              hours = Math.floor((t / (1000*60*60))%24),
              minutes = Math.floor((t / (1000*60))%60),
              seconds = Math.floor((t / 1000)%60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    setClock('.timer', deadline);

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

            setClock('.timer__item', deadline);
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
*/

    // Slider

    const slides = document.querySelectorAll('.slide'),
          slidesWrapper = document.querySelector('.slider__wrapper'),
          slidesField = document.querySelector('.slider__inner'),
          prev = document.querySelector('.slider__prev'),
          next = document.querySelector('.slider__next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all .5s linear';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length-2) * (slides.length-1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length-2) * (slides.length-1);
        } else {
            offset -= +width.slice(0, width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    // Modal

    const modal = document.querySelector('.modal'),
          modalOpen = document.querySelectorAll('#open'),
          modalClose = document.querySelector('#close');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalOpen.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    modalClose.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    });






});