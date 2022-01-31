import i18Obj from './translate.js';


/*Save settings in local storage*/

let lang = 'en';
let theme = 'dark';

const setLocalStorage = () => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
        getTranslate(lang);
        if (lang === 'ru') {
            langLinks.forEach(item => item.classList.toggle('active'));
        } 
    }

    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
        if (theme === 'light') {
            themeElementsArr.forEach(changeClassTheme);
        }
    }
}
window.addEventListener('load', getLocalStorage);


/*Burger handler*/

const burgerIcon = document.querySelector('.burger');
const menu = document.querySelector('.adaptive-menu');
const navList = document.querySelector('.nav-list');

burgerIcon.addEventListener('click', () => {
    menu.classList.toggle('open');
});

navList.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav-link')) {
        menu.classList.remove('open');
    }
});


/*Change portfolio images*/

const portfolioButtons = document.querySelectorAll('.transparent-buttons');
const portfolioButtonsContainer = document.querySelector('.portfolio-buttons');
const portfolioImages = document.querySelectorAll('.portfolio-image');

const changeClassActive = (event, targetClass, activeClass, elements) => {
    if (event.target.classList.contains(targetClass)) {
        elements.forEach(item => item.classList.remove(activeClass));
        event.target.classList.add(activeClass);
    }
}

portfolioButtonsContainer.addEventListener('click', event => {
    const activeButton = event.target.classList.contains('gold-buttons');
    changeClassActive (event, 'transparent-buttons', 'gold-buttons', portfolioButtons);
    if (event.target.classList.contains('transparent-buttons')) {
        const season = event.target.dataset.season;
        if (!activeButton) {
            portfolioImages.forEach(img => img.classList.add('smoothChanges'));
            setTimeout(() => portfolioImages.forEach((img, index) => img.src =`./assets/img/${season}/${index + 1}.jpg`), 500);
            setTimeout(() => portfolioImages.forEach(img => img.classList.remove('smoothChanges')), 750);
        }
    }
});

    /*Images preload*/

    const preloadImages = () => {
        const seasons = [];
        portfolioButtons.forEach(item => seasons.push(item.dataset.season));
        seasons.forEach((season) => {
            for (let i = 1; i < 6; i++) {
                const img = new Image();
                img.src = `./assets/img/${season}/${i}.jpg`;
            }
        });
    }

    preloadImages();


/*Internationalization*/

const getTranslate = (lang) => {
    const dataI18n = document.querySelectorAll('[data-i18n]');
    dataI18n.forEach((item) => {
        if (item.placeholder) {
            item.value = '';
            item.placeholder = i18Obj[lang][item.dataset.i18n];
        }
        item.textContent = i18Obj[lang][item.dataset.i18n];
    });
}

const langSwitch = document.querySelector('.lang-switch');
const langLinks = document.querySelectorAll('.lang-link');

langSwitch.addEventListener('click', (event) => {
    changeClassActive (event, 'lang-link', 'active', langLinks);
    if (event.target.classList.contains('lang-link')) {
        lang = event.target.dataset.lang;
        getTranslate(lang);
    }
});


/*Theme change*/

const themeSwitch = document.querySelector('.theme-switch');
const body = document.querySelector('body');
const headerContainer = document.querySelector('.header-container');
const sectionTitles = document.querySelectorAll('.section-title');
const titleContainers = document.querySelectorAll('.title-container');

const themeElementsArr = [[body, themeSwitch, headerContainer], sectionTitles, titleContainers, portfolioButtons];

const changeClassTheme = (elements) => {
    elements.forEach((item) => {
        item.classList.toggle('light-theme');
    });
}

themeSwitch.addEventListener('click', () => {
    themeElementsArr.forEach(changeClassTheme);
    body.classList.contains('light-theme') ? theme = 'light' : theme = 'dark';
    return theme;
});

console.log(` Score: 85 / 85 \n
1. Смена изображений в секции portfolio +25 \n
    [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20  \n
    [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5 \n 
2. Перевод страницы на два языка +25 \n
    [x] при клике по надписи ru англоязычная страница переводится на русский язык +10 \n
    [x] при клике по надписи en русскоязычная страница переводится на английский язык +10 \n
    [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5 \n
3. Переключение светлой и тёмной темы +25 \n
    [x] На страницу добавлен переключатель при клике по которому: \n
      - тёмная тема приложения сменяется светлой +10 \n
      - светлая тема приложения сменяется тёмной +10 \n
      - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5 \n
4. Дополнительный функционал: \n
    [x] выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5 \n
    [x] сложные эффекты для кнопок при наведении и/или клике +5 \n
`);