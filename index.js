const alphabet = {
  Ё: 'Yo',
  Й: 'I',
  Ц: 'Ts',
  У: 'U',
  К: 'K',
  Е: 'E',
  Н: 'N',
  Г: 'G',
  Ш: 'Sh',
  Щ: 'Sch',
  З: 'Z',
  Х: 'H',
  Ъ: "'",
  ё: 'yo',
  й: 'i',
  ц: 'ts',
  у: 'u',
  к: 'k',
  е: 'e',
  н: 'n',
  г: 'g',
  ш: 'sh',
  щ: 'sch',
  з: 'z',
  х: 'h',
  ъ: "'",
  Ф: 'F',
  Ы: 'I',
  В: 'V',
  А: 'А',
  П: 'P',
  Р: 'R',
  О: 'O',
  Л: 'L',
  Д: 'D',
  Ж: 'Zh',
  Э: 'E',
  ф: 'f',
  ы: 'i',
  в: 'v',
  а: 'a',
  п: 'p',
  р: 'r',
  о: 'o',
  л: 'l',
  д: 'd',
  ж: 'zh',
  э: 'e',
  Я: 'Ya',
  Ч: 'Ch',
  С: 'S',
  М: 'M',
  И: 'I',
  Т: 'T',
  Ь: "'",
  Б: 'B',
  Ю: 'Yu',
  я: 'ya',
  ч: 'ch',
  с: 's',
  м: 'm',
  и: 'i',
  т: 't',
  ь: "'",
  б: 'b',
  ю: 'yu',
};

const translit = (str) =>
  str
    .split('')
    .map((letter) =>
      /[а-я]/i.test(letter) ? (letter = alphabet[letter]) : letter
    )
    .join('');

const mobileMedia = window.matchMedia('(max-width: 768px)');

if (mobileMedia.matches) {
  let deleteRow = document.querySelector('.translit');
  deleteRow.remove();

  let mobileTranslitRow = document.createElement('tr');
  mobileTranslitRow.className = 'tableRow2';
  let mobileTranslitTd = document.createElement('td');
  mobileTranslitTd.className = 'mobileTranslit data';
  let mobileTranslitSpan = document.createElement('span');
  mobileTranslitSpan.className = 'mobileTranslitWord';
  mobileTranslitSpan.innerText = 'Privet';

  mobileTranslitTd.appendChild(mobileTranslitSpan);
  mobileTranslitRow.appendChild(mobileTranslitTd);

  let library = document.querySelector('tbody');
  library.appendChild(mobileTranslitRow);

  let clearBtn = document.querySelector('.clear');
  let mobileClearBtn = clearBtn.cloneNode(true);
  let mobileClearBtn2 = clearBtn.cloneNode(true);

  let mobileNoTranslitTd = document.querySelector('.noTranslit');
  mobileNoTranslitTd.appendChild(mobileClearBtn);
  mobileTranslitTd.appendChild(mobileClearBtn2);

  let invisibleRow = document.createElement('tr');
  library.appendChild(invisibleRow);

  let addBtn = document.querySelector('.add');
  addBtn.addEventListener('click', function createNewRows() {
    let noTranslitWordInput = document.querySelector('.input').value;

    let noTranslitRow = document.querySelector('.tableRow');
    let newNoTranslitRow = noTranslitRow.cloneNode(true);
    newNoTranslitRow.className = 'tableRow1';

    let noTranslitWord = newNoTranslitRow.querySelector('.noTranslitWord');
    noTranslitWord.innerText = noTranslitWordInput;

    let translitRow = document.querySelector('.tableRow2');
    let newTranslitRow = mobileTranslitRow.cloneNode(true);
    newTranslitRow.className = 'tableRow2.1';

    invisibleRow.before(newTranslitRow);

    let translitWord = newTranslitRow.querySelector('.mobileTranslitWord');
    translitWord.innerText = translit(noTranslitWordInput);

    translitRow.before(newNoTranslitRow);

    if (noTranslitWordInput.length === 0) {
      library.removeChild(newNoTranslitRow);
      library.removeChild(newTranslitRow);
    }

    let clearBtn = newNoTranslitRow.querySelector('.clear');
    clearBtn.addEventListener('click', () => {
      newNoTranslitRow.remove();
      newTranslitRow.remove();
    });

    let clearBtn2 = newTranslitRow.querySelector('.clear');
    clearBtn2.addEventListener('click', () => {
      newNoTranslitRow.remove();
      newTranslitRow.remove();
    });

    let clearAllBtn = document.querySelector('.clearAll');
    clearAllBtn.addEventListener('click', () => {
      newNoTranslitRow.remove();
      newTranslitRow.remove();
      let mainInput = document.querySelector('.input');
      mainInput.value = '';
    });
  });
} else {
  const createNewRow = () => {
    let noTranslitWord = document.querySelector('.input').value;

    let row = document.querySelector('.tableRow');

    let newRow = row.cloneNode(true);

    let noTranslit = newRow.querySelector('.noTranslitWord');

    let translitWord = newRow.querySelector('.translitWord');

    if (noTranslitWord.length >= 7) {
      noTranslit.style.cursor = 'pointer';
      noTranslit.classList.add('splitWord');
      noTranslit.setAttribute('wordAll', noTranslitWord);

      translitWord.style.cursor = 'pointer';
      translitWord.classList.add('splitWord');
      translitWord.setAttribute('wordAll', translit(noTranslitWord));

      noTranslitWord = noTranslitWord.slice(0, 7) + '...';
    }

    noTranslit.innerText = noTranslitWord;
    translitWord.innerText = translit(noTranslitWord);

    let data = newRow.querySelectorAll('.data');
    for (let item of data) {
      item.style.borderTop = '1px solid black';
    }

    let library = document.querySelector('tbody');
    library.appendChild(newRow);

    if (noTranslitWord.length === 0) {
      library.removeChild(newRow);
    }

    let clearBtn = newRow.querySelector('.clear');
    clearBtn.addEventListener('click', () => {
      newRow.remove();
    });

    let clearAllBtn = document.querySelector('.clearAll');
    clearAllBtn.addEventListener('click', () => {
      newRow.remove();
      let mainInput = document.querySelector('.input');
      mainInput.value = '';
    });
  };

  let addBtn = document.querySelector('.add');
  addBtn.addEventListener('click', createNewRow);

  let mainInputEnter = document.querySelector('input');
  mainInputEnter.addEventListener('keydown', function (event) {
    let noTranslitWord = document.querySelector('input').value;
    if (event.key === 'Enter' && noTranslitWord.length > 0) {
      createNewRow();
    }
  });
}
