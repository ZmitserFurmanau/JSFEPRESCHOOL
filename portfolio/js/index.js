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
            setTimeout(() => portfolioImages.forEach((img, i) => img.src =`./assets/img/${season}/${i + 1}.jpg`), 500);
            setTimeout(() => portfolioImages.forEach(img => img.classList.remove('smoothChanges')), 750);
        }
    }
});

    /*Images preload*/

    const preloadImages = () => {
        const seasons = [];
        portfolioButtons.forEach(item => seasons.push(item.dataset.season));
        seasons.forEach((season) => {
            for (let i = 0; i < 6; i++) {
                const img = new Image();
                img.src = `./assets/img/${season}/${i + 1}.jpg`;
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


/*Video*/

const video = document.querySelector('.section-video__video');
const mainPlayButton = document.querySelector(".section-video__main-play");
let currentTime = 0;
export function handleClickOnVideo(){
    if (video.paused){
        video.play();
        video.controls = true;
        mainPlayButton.hidden = true;
        video.addEventListener("pause", handlePauseVideo)
        video.addEventListener("play", handlePlayVideo)
        video.addEventListener("ended", handleEndedVideo)
    }
    function handlePauseVideo(){
        mainPlayButton.hidden = false;
    }
    function handlePlayVideo(){
        mainPlayButton.hidden = true;
    }
    function handleEndedVideo(){
        video.controls = false;
        mainPlayButton.hidden = false;
        video.load()
        video.removeEventListener("pause", handlePauseVideo)
        video.removeEventListener("play", handlePlayVideo)
        video.removeEventListener("ended", handleEndedVideo)
    }
}

document.addEventListener("click", handlerClick)
function handlerClick(event){
    const target = event.target;
    if(target.classList.contains("section-video__main-play")){
        handleClickOnVideo();
    }
}

console.log(` 
Score: 60 / 60 \n
1. Вёрстка +10 \n
    [x] вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5  \n
    [x] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \n 
2. Кнопка Play/Pause на панели управления +10 \n
    [x] при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5 \n
    [x] внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5 \n
3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10 \n
4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10 \n
5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10 \n
6. Кнопка Play/Pause в центре видео +10
    [x] есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5 \n
    [x] когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5 \n
`);