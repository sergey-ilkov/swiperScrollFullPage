if (window.innerWidth > 700) {
    initPcSlider()
} else {
    // включение только горизонтальных слайдеров width < 700
    initMobileSlider();
}



function initPcSlider() {
    const landingSlider = new Swiper('.slider-vertical', {
        // Optional parameters
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        speed: 1000,
        mousewheel: true,
        allowTouchMove: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                freeMode: false,
            }
        },
        on: {
            slideChange: function (swiper) {
                let activeIndex = swiper.realIndex;
                showAnimation(activeIndex, 'vertical');

                if (activeIndex == 2 && experienceSlider.realIndex == experienceSlider.slides.length - 1) {
                    landingSlider.disable();
                    showAnimation(experienceSlider.slides.length - 1, 'horizontal-1');
                }

                if (activeIndex == 3) {
                    showAnimation(0, 'horizontal-1');
                }
                if (activeIndex == 2 && experienceSlider.realIndex == 0) {
                    landingSlider.disable();
                }

                if (activeIndex == 4 && certificateSlider.realIndex == certificateSlider.slides.length - 1) {
                    landingSlider.disable();
                    showAnimation(certificateSlider.slides.length - 1, 'horizontal-2');
                }

                if (activeIndex == 5) {
                    showAnimation(0, 'horizontal-2');
                }
                if (activeIndex == 4 && certificateSlider.realIndex == 0) {
                    landingSlider.disable();
                }
            },
            slideChangeTransitionEnd: function (swiper) {
                let activeIndex = swiper.realIndex;
                if (activeIndex == 2 && experienceSlider.realIndex == experienceSlider.slides.length - 1) {
                    startOneDownSlider();
                    landingSlider.disable();
                }


                if (activeIndex == 2 && experienceSlider.realIndex == 0) {
                    landingSlider.disable();
                    startOneUpSlider();
                }
                if (activeIndex == 4 && certificateSlider.realIndex == certificateSlider.slides.length - 1) {
                    startOneDownSlider();
                    landingSlider.disable();
                }
                if (activeIndex == 4 && certificateSlider.realIndex == 0) {
                    landingSlider.disable();
                    startOneUpSlider();
                }
            }

        },


    });



    const experienceSlider = new Swiper('.slider-horizontal-1', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        speed: 1000,
        mousewheel: true,
        allowTouchMove: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                freeMode: false,
            }
        },

        on: {
            slideChange: function (swiper) {
                let activeIndex = swiper.realIndex
                showAnimation(activeIndex, 'horizontal-1');
            },

            slideChangeTransitionEnd: function (swiper) {
                let activeIndex = swiper.realIndex;

                if (activeIndex == swiper.slides.length - 1) {
                    startOneDownSlider();

                }
                if (activeIndex == 0) {
                    startOneUpSlider();
                }
            }
        },
    })


    const certificateSlider = new Swiper('.slider-horizontal-2', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        speed: 1000,
        mousewheel: true,
        allowTouchMove: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                freeMode: false,
            }
        },

        on: {
            slideChange: function (swiper) {
                let activeIndex = swiper.realIndex
                showAnimation(activeIndex, 'horizontal-2');


            },

            slideChangeTransitionEnd: function (swiper) {
                let activeIndex = swiper.realIndex;

                if (activeIndex == swiper.slides.length - 1) {
                    startOneDownSlider();

                }
                if (activeIndex == 0) {
                    startOneUpSlider();
                }
            }
        },
    })


    function startOneUpSlider() {
        window.addEventListener('wheel', function (evt) {
            if (evt.deltaY < 0 && window.scrollY === 0) {
                landingSlider.enable();
            }
        }, { once: true });
    }

    function startOneDownSlider() {
        window.addEventListener('wheel', function (evt) {
            if (evt.deltaY > 0 && window.scrollY === 0) {
                landingSlider.enable();
            }
        }, { once: true });
    }




    const showAnimation = (index, slider) => {
        if (slider === 'vertical') {
            const sections = document.querySelectorAll('.anim-section-vertical');
            startAnimation(sections, index);
        }
        if (slider === 'horizontal-1') {
            const sections = document.querySelectorAll('.anim-section-horizontal-1');
            startAnimation(sections, index);
        }
        if (slider === 'horizontal-2') {
            const sections = document.querySelectorAll('.anim-section-horizontal-2');
            startAnimation(sections, index);
        }

    }

    function startAnimation(items, index) {

        items.forEach((section, i) => {
            if (i === index) {
                section.querySelector('.text').classList.add('show');
            } else {
                section.querySelector('.text').classList.remove('show');
            }
        })
    }

    window.onload = () => {
        showAnimation(0, 'vertical');
    }


}
function initMobileSlider() {
    const experienceSliderMobile = new Swiper('.slider-horizontal-1', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        speed: 1000,
        breakpoints: {
            320: {
                slidesPerView: 1,

            }
        },


    })
    const certificateSliderMobile = new Swiper('.slider-horizontal-2', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        speed: 1000,
        breakpoints: {
            320: {
                slidesPerView: 1,

            }
        },


    })

    // для анимации на планшетах и мобильном

    const sectionsVertical = document.querySelectorAll('.anim-section-vertical');
    const sectionsHorisontalOne = document.querySelectorAll('.anim-section-horizontal-1');
    const sectionsHorisontalTwo = document.querySelectorAll('.anim-section-horizontal-2');


    const itemsAnimation = [...sectionsVertical, ...sectionsHorisontalOne, ...sectionsHorisontalTwo];

    window.addEventListener('scroll', (e) => {
        setTimeout(() => {
            scrollAnimation();
        }, 300);
    })

    function scrollAnimation() {
        itemsAnimation.forEach(item => {
            const w_top = window.scrollY; // Количество пикселей на которое была прокручена страница
            const w_height = window.innerHeight; // Высота окна браузера

            const e_top = item.getBoundingClientRect().top; // Расстояние от блока до верха всего документа
            const e_bottom = item.getBoundingClientRect().bottom;
            const e_height = item.offsetHeight; // Полная высота блока

            const animStart = 4; // регулировка запуска анимации расстояние от блока

            let animItemPoints = w_height - e_height / animStart;

            if (e_height > w_height) {
                animItemPoints = w_height - w_height / animStart;
            }
            if (e_top < w_height / 2 + w_height / 3 && e_top > 0 && !item.classList.contains('active')) {
                item.classList.add('active');
            }

            if (e_top === 0) {
                item.classList.add('active');
            }

        });
    }
    scrollAnimation();


}

