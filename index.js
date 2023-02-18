const alphabet = {
  Ё: 'YO',
  Й: 'I',
  Ц: 'TS',
  У: 'U',
  К: 'K',
  Е: 'E',
  Н: 'N',
  Г: 'G',
  Ш: 'SH',
  Щ: 'SCH',
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
  Ж: 'ZH',
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
  Ч: 'CH',
  С: 'S',
  М: 'M',
  И: 'I',
  Т: 'T',
  Ь: "'",
  Б: 'B',
  Ю: 'YU',
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

  let library = document.querySelector('table');
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
