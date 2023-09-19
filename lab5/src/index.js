// Поміняйте місцями тексти, позначені «2» та «6».
(() => {
  const contentNav = document.querySelector('.content__nav');
  const footerSocials = document.querySelector('.footer__socials-container');

  const contentNavClone = contentNav.cloneNode(true);
  const footerSocialsClone = footerSocials.cloneNode(true);

  contentNav.replaceWith(footerSocialsClone);
  footerSocials.replaceWith(contentNavClone);
})();

// Напишіть функцію, яка обчислює площу ромба,
// беручи необхідні значення із відповідних змінних у
// скрипті, і виводить отриманий результат в кінці
// контенту в блоці «5».
(() => {
  const form = document.querySelector('.form-area');
  const sideInput = document.querySelector('#side');
  const angleInput = document.querySelector('#angle');
  const resultContainer = document.querySelector('.form__result p');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const side = +sideInput.value;
    const angle = +angleInput.value;

    const result =
      (side * side * Math.round(Math.sin((angle / 180) * Math.PI) * 100000)) /
      100000;
    resultContainer.innerText = `Result: ${result}`;
  });
})();

// Напишіть скрипт, який визначає мінімальне і
// максимальне числа із 10 значень, беручи необхідні
// значення із відповідної форми в блоці «5», а
// отриманий результат виводить за допомогою
// діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері
// користувачу за допомогою діалогового вікна виводиться інформація,
// збережена в cookies, із питанням про необхідність видалити дані із cookies, і не
// виводиться згадана вище форма;
// б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка
// оновлюється з початковим станом із наявною формою для введення даних;
// в) при відмові виводиться наступне діалогове вікно із інформуванням
// користувача про наявність cookies і потребу перезавантажити веб-сторінку.
(() => {
  const form = document.querySelector('.form-numbers');
  const result = document.querySelector('.form-numbers__result');
  const numberInputs = [...document.querySelectorAll('.form-numbers input')];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const values = numberInputs.map((input) => +input.value);
    console.log(numberInputs);
    console.log(values);
    const min = Math.min(...values);
    const max = Math.max(...values);
    alert(`Minimum value: ${min}\nMaximum value: ${max}`);

    document.cookie = `min=${min}`;
    document.cookie = `max=${max}`;

    localStorage.setItem('showForm', true);
    result.innerText =
      'Values are saved as cookies, reload page to see the functionality';
    result.setAttribute(
      'style',
      `${result.getAttribute('style')} display: block;`
    );
  });

  if (localStorage.getItem('showForm') === 'true') {
    window.addEventListener('load', handleCookies);
  }

  function handleCookies() {
    form.remove();

    setTimeout(() => {
      const min = document.cookie
        .split('; ')
        .find((row) => row.startsWith('min='))
        ?.split('=')[1];
      const max = document.cookie
        .split('; ')
        .find((row) => row.startsWith('max='))
        ?.split('=')[1];

      if (
        window.confirm(
          `Info from cookies:\nMinimum value: ${min}\nMaximum value: ${max}\nClear cookies?`
        )
      ) {
        document.cookie = `min=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        document.cookie = `max=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        localStorage.removeItem('showForm');
        location.reload();
      } else {
        window.alert(
          'Your cookies are already set, to be able to use form, please reload the page'
        );
      }
    });
  }
})();

// Напишіть скрипт, який при настанні події focus змінює колір рамки усіх
// номерних блоків (1..6) на вказаний користувачем і зберігає відповідне значення
// кольору в localStorage броузера так, щоб при наступному відкриванні веб-
// сторінки значення кольору рамок номерних блоків встановлювалось із
// збереженого значення в localStorage.
import 'vanilla-colorful';
(() => {
  const updateBorder = (color) => {
    document
      .querySelector('html')
      .setAttribute('style', `--border: 2px solid ${color}`);
  };

  // Document loaded, set color from localStorage
  const color = localStorage.getItem('color');
  if (color) {
    updateBorder(color);
  }

  const focusableElements = Array.from(
    document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );

  focusableElements.forEach((element) => {
    element.addEventListener('focus', () => {
      const color = localStorage.getItem('color');
      if (color) {
        updateBorder(color);
      }
    });
  });

  const picker = document.querySelector('hex-color-picker');
  const form = document.querySelector('.form-color');
  const result = document.querySelector('.form-color__result');

  function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pickedColor = picker.color;
    result.setAttribute('style', 'display: block;');
    result.innerHTML = `You have chosen <span style="display: inline-block; background-color: ${pickedColor}; color: #${invertHex(
      pickedColor.slice(1)
    )}">${pickedColor}</span> color`;

    localStorage.setItem('color', pickedColor);
  });
})();

// Напишіть скрипт додавання зображень в блок «1»:
// а) необхідні елементи форми появляються у блоці «5» внаслідок виділення
// тексту в блоці «у» одразу після наявного в блоці «5» контенту;
// б) кількість зображень необмежена, використовуйте зображення з інтернету;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
// зображення зберігаються в localStorage броузера (структуровано на ваш
// розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;
// г) поруч розміщується кнопка, внаслідок натискання на яку всі нові зображення
// видаляються із localStorage броузера і припиняється їхнє відображення у блоці
// «1» без перезавантаження веб-сторінки.
(() => {
  const contentToHighlight = document.querySelector(
    '.footer__content-container h4'
  );
  const form = document.querySelector('.form-add-image');
  const urlInput = document.querySelector('#imageUrl');

  const saveImagesBtn = document.querySelector('.form-add-image__save-btn');
  const generateImageUrlBtn = document.querySelector('.generate-imageUrl');

  const errorMessageEl = document.querySelector('.form-add-image__error p');

  const activeImageList = document.querySelector('.aside__imageList');
  const savedImagesContainer = document.querySelector(
    '.content__aside-savedImagesList'
  );
  const savedImagesHeading = document.querySelector('.content__aside-heading');

  const spinner = document.querySelector('sl-spinner');

  let urls = [];

  function handleSelection() {
    const selection = document.getSelection();
    const selectedLength = Math.abs(
      selection.focusOffset - selection.anchorOffset
    );

    const selectionElement = selection?.focusNode?.parentElement;
    if (
      selectionElement === contentToHighlight &&
      selectedLength === contentToHighlight.innerText.length
    ) {
      form.classList.remove('hidden');
      document.removeEventListener('selectionchange', handleSelection);
    }
  }

  function createImageCard(url) {
    const card = document.createElement('div');
    card.classList.add('card');
    const image = document.createElement('img');
    image.setAttribute('src', url);
    card.appendChild(image);

    return card;
  }

  function renderSavedUrls() {
    if (savedImagesHeading.classList.contains('hidden')) {
      savedImagesHeading.classList.remove('hidden');
    }

    savedImagesContainer.innerHTML = '';
    urls.forEach((url) => {
      const card = createImageCard(url);
      savedImagesContainer.appendChild(card);
    });

    const clearStorageBtn = document.createElement('button');
    clearStorageBtn.classList.add('btn', 'btn--danger');
    clearStorageBtn.innerText = 'Clear Storage';
    savedImagesContainer.appendChild(clearStorageBtn);

    clearStorageBtn.addEventListener('click', () => {
      localStorage.removeItem('imageUrls');
      savedImagesContainer.innerHTML = '';

      savedImagesHeading.classList.add('hidden');
    });
  }

  if (
    localStorage.getItem('imageUrls') &&
    JSON.parse(localStorage.getItem('imageUrls')).length > 0
  ) {
    urls = JSON.parse(localStorage.getItem('imageUrls'));
    renderSavedUrls();
  }

  document.addEventListener('selectionchange', handleSelection);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      spinner.classList.remove('hidden');
      const res = await fetch(urlInput.value);
      spinner.classList.add('hidden');

      if (res.ok) {
        const card = createImageCard(urlInput.value);
        activeImageList.appendChild(card);

        urls.push(urlInput.value);

        if (saveImagesBtn.classList.contains('hidden')) {
          saveImagesBtn.classList.remove('hidden');
        }

        urlInput.value = '';
      } else {
        errorMessageEl.innerText = `Unable to fetch the image under '${urlInput.value}' url `;
        errorMessageEl.parentElement.classList.remove('hidden');

        spinner.classList.add('hidden');
      }
    } catch (err) {
      errorMessageEl.innerText = `Unable to fetch the image under '${urlInput.value}' url `;
      errorMessageEl.parentElement.classList.remove('hidden');
      spinner.classList.add('hidden');
    }
  });

  urlInput.addEventListener('input', (e) => {
    if (!errorMessageEl.parentElement.classList.contains('hidden')) {
      errorMessageEl.parentElement.classList.add('hidden');
    }
  });

  saveImagesBtn.addEventListener('click', () => {
    localStorage.setItem('imageUrls', JSON.stringify(urls));

    if (urls.length > 0) {
      renderSavedUrls();
    }
  });

  generateImageUrlBtn.addEventListener('click', () => {
    urlInput.value = `https://picsum.photos/seed/${Math.random()}/200/300`;
    errorMessageEl.parentElement.classList.add('hidden');
  });
})();
